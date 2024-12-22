import { body, validationResult } from 'express-validator';

export const validateUser = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ max: 50 })
        .withMessage('El nombre no puede exceder 50 caracteres'),
    
    body('email')
        .isString()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('El email no es válido')
        .isLength({ max: 50 })
        .withMessage('El email no puede exceder 50 caracteres'),
    
    body('password')
        .isString()
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 8, max: 50 })
        .withMessage('La contraseña debe tener entre 8 y 50 caracteres'),
    
    body('role')
        .optional()
        .isIn(['admin', 'user'])
        .withMessage('El rol debe ser admin o user'),
    
    body('banned_until')
        .optional()
        .isISO8601()
        .withMessage('La fecha de baneo debe ser válida'),
    
    body('rented_camera_reference')
        .optional()
        .isString()
        .isLength({ max: 50 })
        .withMessage('La referencia no puede exceder 50 caracteres'),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];