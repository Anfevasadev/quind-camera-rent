import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generateToken } from '../utils/auth.js';
import { formatUser } from '../utils/formatUser.js';

export const registerUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role,
      banned_until: null,
      rented_camera_reference: null,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: {
        ...formatUser(newUser),
        token,
      },
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      error: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const formattedUsers = users.map(formatUser);
    res.status(200).json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: formatUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, banned_until, rented_camera_reference } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password_hash;

    await user.update({
      name: name || user.name,
      email: email || user.email,
      password_hash: hashedPassword,
      role: role || user.role,
      banned_until: banned_until || user.banned_until,
      rented_camera_reference: rented_camera_reference || user.rented_camera_reference,
    });

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: formatUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message,
    });
  }
};