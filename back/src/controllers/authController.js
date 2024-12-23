import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../utils/auth.js";

// export const register = async (req, res) => {
//   const { name, email, password, role = "user" } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password_hash: hashedPassword,
//       role,
//       banned_until: null,
//       rented_camera_reference: null,
//     });

//     const token = generateToken(newUser);

//     res.status(201).json({
//       success: true,
//       message: "Usuario creado exitosamente",
//       data: {
//         id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//         token,
//       },
//     });
//   } catch (error) {
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(400).json({
//         success: false,
//         message: "El email ya está registrado",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Error al crear usuario",
//       error: error.message,
//     });
//   }
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};
