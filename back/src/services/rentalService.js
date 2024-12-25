import Rental from "../models/rental.js";
import Item from "../models/item.js";
import User from "../models/user.js";
import { Op } from "sequelize";

export const rentItem = async (userId, itemReference) => {
  const item = await Item.findByPk(itemReference);

  if (!item) {
    throw new Error("Item no encontrado");
  }

  if (item.state !== "available") {
    throw new Error("Item no disponible");
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const bannedUntil = new Date(user.banned_until);

  if (user.banned_until && bannedUntil > new Date()) {
    throw new Error("Usuario está baneado hasta " + user.banned_until);
  }

  if (item.type === "camera" && user.rented_camera_reference) {
    throw new Error("El cliente ya tiene una cámara alquilada");
  }

  // TODO: el cliente puede alquilar más de un item a la vez pero no más de una cámara
  const existingRental = await Rental.findOne({
    where: {
      customer_id: userId,
      due_date: {
        [Op.gt]: new Date(),
      },
      is_returned: false,
    },
  });

  if (existingRental) {
    throw new Error("El cliente ya tiene un item alquilado");
  }

  const rentalDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(rentalDate.getDate() + 7);

  const rental = await Rental.create({
    customer_id: userId,
    item_reference: itemReference,
    rental_date: rentalDate,
    due_date: dueDate,
  });

  await item.update({ state: "rented" });

  if (item.type === "camera") {
    await user.update({ rented_camera_reference: itemReference });
  }

  return rental;
};

export const returnItem = async (userId, itemReference) => {
  const rental = await Rental.findOne({
    where: {
      customer_id: userId,
      item_reference: itemReference,
      is_returned: false,
    },
  });

  if (!rental) {
    throw new Error("Alquiler no encontrado");
  }

  const returnDate = new Date();
  const rentalDueDate = new Date(rental.due_date);
  const lateDays = Math.max(
    0,
    Math.ceil((returnDate - rentalDueDate) / (1000 * 60 * 60 * 24))
  );

  await rental.update({
    returned_date: returnDate,
    is_returned: true,
    late_days: lateDays,
  });

  const item = await Item.findByPk(itemReference);
  await item.update({ state: "available" });

  const user = await User.findByPk(userId);

  if (item.type === "camera") {
    await user.update({ rented_camera_reference: null });
  }

  if (lateDays > 0) {
    const bannedUntil = new Date();
    bannedUntil.setMonth(bannedUntil.getMonth() + lateDays);
    await user.update({ banned_until: bannedUntil });
  }

  return rental;
};

export const updateRentals = async () => {
  try {
    const rentals = await Rental.findAll({
      where: {
        due_date: {
          [Op.lt]: new Date(),
        },
        is_returned: false,
      },
      include: [Item, User],
    });

    for (const rental of rentals) {
      const dueDate = new Date(rental.due_date);
      const lateDays = Math.max(
        0,
        Math.ceil((new Date() - dueDate) / (1000 * 60 * 60 * 24))
      );

      await rental.update({ late_days: lateDays });

      if (lateDays > 0) {
        const user = rental.User;
        const bannedUntil = new Date();
        bannedUntil.setMonth(bannedUntil.getMonth() + lateDays);
        await user.update({ banned_until: bannedUntil });
      }

      const item = rental.Item;
      await item.update({ state: lateDays > 0 ? "delayed" : "available" });
    }

    console.log("Actualización de alquileres completada.");
  } catch (error) {
    console.error("Error al actualizar alquileres:", error);
  }
};
