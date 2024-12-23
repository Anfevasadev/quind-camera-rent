import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
  
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            role,
            banned_until: null,
            rented_camera_reference: null
        });
        
        const token = jwt.sign(
            { 
                id: newUser.id, 
                role: newUser.role 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '12h' }
        );
  
        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                token
            }
        });

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error al crear usuario',
            error: error.message
        });
    }
};