import Item from '../models/item.js';
import Camera from '../models/camera.js';
import Film from '../models/film.js';

export const createItem = async (req, res) => {
  const { reference, type, state, camera_id, film_id } = req.body;

  try {
    const newItem = await Item.create({ reference, type, state, camera_id, film_id });
    const itemWithDetails = await Item.findByPk(newItem.reference, {
      include: [
        { model: Camera, as: 'camera' },
        { model: Film, as: 'film' },
      ],
    });
    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: itemWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear item',
      error: error.message,
    });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        { model: Camera, as: 'camera' },
        { model: Film, as: 'film' },
      ],
    });
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener items',
      error: error.message,
    });
  }
};

export const getItemByReference = async (req, res) => {
  const { reference } = req.params;

  try {
    const item = await Item.findByPk(reference, {
      include: [
        { model: Camera, as: 'camera' },
        { model: Film, as: 'film' },
      ],
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener item',
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  const { reference } = req.params;
  const { type, state, camera_id, film_id } = req.body;

  try {
    const item = await Item.findByPk(reference);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    await item.update({ type, state, camera_id, film_id });

    const updatedItem = await Item.findByPk(reference, {
      include: [
        { model: Camera, as: 'camera' },
        { model: Film, as: 'film' },
      ],
    });

    res.status(200).json({
      success: true,
      message: 'Item actualizado exitosamente',
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar item',
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  const { reference } = req.params;

  try {
    const item = await Item.findByPk(reference);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    await item.destroy();

    res.status(200).json({
      success: true,
      message: 'Item eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar item',
      error: error.message,
    });
  }
};