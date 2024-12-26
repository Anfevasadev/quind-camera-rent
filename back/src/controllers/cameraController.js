import Camera from '../models/camera.js';
import Brand from '../models/brand.js';
import Item from '../models/item.js';

export const createCamera = async (req, res) => {
  const { model, has_flash, brand_id } = req.body;

  try {
    const newCamera = await Camera.create({ model, has_flash, brand_id });
    const cameraWithBrand = await Camera.findByPk(newCamera.id, {
      include: Brand,
    });
    res.status(201).json({
      success: true,
      message: 'Cámara creada exitosamente',
      data: cameraWithBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear cámara',
      error: error.message,
    });
  }
};

export const getCameras = async (req, res) => {
  try {
    const cameras = await Camera.findAll({
      include: Brand,
    });
    const camerasWithAvailability = await Promise.all(cameras.map(async (camera) => {
      const availableItem = await Item.findOne({
        where: {
          camera_id: camera.id,
          state: 'available',
        },
      });
      return {
        ...camera.toJSON(),
        available: !!availableItem,
      };
    }));
    res.status(200).json({
      success: true,
      data: camerasWithAvailability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cámaras',
      error: error.message,
    });
  }
};

export const getCameraById = async (req, res) => {
  const { id } = req.params;

  try {
    const camera = await Camera.findByPk(id, {
      include: Brand,
    });

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: 'Cámara no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: camera,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cámara',
      error: error.message,
    });
  }
};

export const updateCamera = async (req, res) => {
  const { id } = req.params;
  const { model, has_flash, brand_id } = req.body;

  try {
    const camera = await Camera.findByPk(id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: 'Cámara no encontrada',
      });
    }

    await camera.update({ model, has_flash, brand_id });

    const updatedCamera = await Camera.findByPk(id, {
      include: Brand,
    });

    res.status(200).json({
      success: true,
      message: 'Cámara actualizada exitosamente',
      data: updatedCamera,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar cámara',
      error: error.message,
    });
  }
};

export const deleteCamera = async (req, res) => {
  const { id } = req.params;

  try {
    const camera = await Camera.findByPk(id);

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: 'Cámara no encontrada',
      });
    }

    await camera.destroy();

    res.status(200).json({
      success: true,
      message: 'Cámara eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar cámara',
      error: error.message,
    });
  }
};