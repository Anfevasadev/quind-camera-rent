import Brand from '../models/brand.js';

export const createBrand = async (req, res) => {
  const { name, repair_service_address } = req.body;

  try {
    const newBrand = await Brand.create({ name, repair_service_address });
    res.status(201).json({
      success: true,
      message: 'Marca creada exitosamente',
      data: newBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear marca',
      error: error.message,
    });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener marcas',
      error: error.message,
    });
  }
};

export const getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marca no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener marca',
      error: error.message,
    });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, repair_service_address } = req.body;

  try {
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marca no encontrada',
      });
    }

    await brand.update({ name, repair_service_address });

    res.status(200).json({
      success: true,
      message: 'Marca actualizada exitosamente',
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar marca',
      error: error.message,
    });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Marca no encontrada',
      });
    }

    await brand.destroy();

    res.status(200).json({
      success: true,
      message: 'Marca eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar marca',
      error: error.message,
    });
  }
};