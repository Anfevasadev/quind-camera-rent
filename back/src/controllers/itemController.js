import Item from '../models/item.js';
import Brand from '../models/brand.js';

export const createItem = async (req, res) => {
  const { reference, type, state, brand_id } = req.body;

  try {
    const newItem = await Item.create({ reference, type, state, brand_id });
    const itemWithBrand = await Item.findByPk(newItem.reference, {
      include: Brand,
    });
    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: itemWithBrand,
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
      include: Brand,
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
      include: Brand,
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
  const { type, state, brand_id } = req.body;

  try {
    const item = await Item.findByPk(reference);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado',
      });
    }

    await item.update({ type, state, brand_id });

    const updatedItem = await Item.findByPk(reference, {
      include: Brand,
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