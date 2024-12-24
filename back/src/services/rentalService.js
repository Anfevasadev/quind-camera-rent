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

  const existingRental = await Rental.findOne({
    where: {
      customer_id: userId,
      return_date: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (existingRental) {
    throw new Error("El cliente ya tiene un item alquilado");
  }

  const rentalDate = new Date();
  const returnDate = new Date();
  returnDate.setDate(rentalDate.getDate() + 7);

  const rental = await Rental.create({
    customer_id: userId,
    item_reference: itemReference,
    rental_date: rentalDate,
    return_date: returnDate,
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
      return_date: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!rental) {
    throw new Error("Alquiler no encontrado");
  }

  const returnDate = new Date();
  const rentalReturnDate = new Date(rental.return_date);
  const lateDays = Math.max(
    0,
    Math.ceil((returnDate - rentalReturnDate) / (1000 * 60 * 60 * 24))
  );

  await rental.update({ return_date: returnDate, late_days: lateDays });

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
