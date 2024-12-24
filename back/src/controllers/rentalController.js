import { rentItem, returnItem } from '../services/rentalService.js';

export const rentItemController = async (req, res) => {
  const userId = req.user.id;
  const { itemReference } = req.body;

  try {
    const rental = await rentItem(userId, itemReference);
    res.status(201).json({
      success: true,
      message: 'Item alquilado exitosamente',
      data: rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al alquilar item',
      error: error.message,
    });
  }
};

export const returnItemController = async (req, res) => {
  const userId = req.user.id;
  const { itemReference } = req.body;

  try {
    const rental = await returnItem(userId, itemReference);
    res.status(200).json({
      success: true,
      message: 'Item devuelto exitosamente',
      data: rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al devolver item',
      error: error.message,
    });
  }
};