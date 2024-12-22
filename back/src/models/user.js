import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    banned_until: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rented_camera_reference: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

try {
  await sequelize.sync();
  console.log("Modelo de usuario sincronizado con la base de datos.");
} catch (error) {
  console.error("Error al sincronizar el modelo:", error);
}

export default User;
