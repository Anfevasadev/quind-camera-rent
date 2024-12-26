import Film from '../models/film.js';
import Brand from '../models/brand.js';
import Item from '../models/item.js';

export const createFilm = async (req, res) => {
  const { name, iso, format, brand_id } = req.body;

  try {
    const newFilm = await Film.create({ name, iso, format, brand_id });
    const filmWithBrand = await Film.findByPk(newFilm.id, {
      include: Brand,
    });
    res.status(201).json({
      success: true,
      message: 'Película creada exitosamente',
      data: filmWithBrand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear película',
      error: error.message,
    });
  }
};

export const getFilms = async (req, res) => {
  try {
    const films = await Film.findAll({
      include: Brand,
    });
    const filmsWithAvailability = await Promise.all(films.map(async (film) => {
      const availableItem = await Item.findOne({
        where: {
          film_id: film.id,
          state: 'available',
        },
      });
      return {
        ...film.toJSON(),
        available: !!availableItem,
      };
    }));
    res.status(200).json({
      success: true,
      data: filmsWithAvailability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener películas',
      error: error.message,
    });
  }
};

export const getFilmById = async (req, res) => {
  const { id } = req.params;

  try {
    const film = await Film.findByPk(id, {
      include: Brand,
    });

    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: film,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener película',
      error: error.message,
    });
  }
};

export const updateFilm = async (req, res) => {
  const { id } = req.params;
  const { name, iso, format, brand_id } = req.body;

  try {
    const film = await Film.findByPk(id);

    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada',
      });
    }

    await film.update({ name, iso, format, brand_id });

    const updatedFilm = await Film.findByPk(id, {
      include: Brand,
    });

    res.status(200).json({
      success: true,
      message: 'Película actualizada exitosamente',
      data: updatedFilm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar película',
      error: error.message,
    });
  }
};

export const deleteFilm = async (req, res) => {
  const { id } = req.params;

  try {
    const film = await Film.findByPk(id);

    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Película no encontrada',
      });
    }

    await film.destroy();

    res.status(200).json({
      success: true,
      message: 'Película eliminada exitosamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar película',
      error: error.message,
    });
  }
};