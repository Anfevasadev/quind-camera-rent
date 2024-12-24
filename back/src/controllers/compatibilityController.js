import Camera from "../models/camera.js";
import Film from "../models/film.js";

export const createCompatibility = async (req, res) => {
  const { cameraId, filmId } = req.body;

  try {
    const camera = await Camera.findByPk(cameraId);
    const film = await Film.findByPk(filmId);

    if (!camera || !film) {
      return res.status(404).json({ message: "Camera or Film not found" });
    }

    await camera.addFilm(film);
    return res
      .status(201)
      .json({ message: "Compatibility created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating compatibility", error });
  }
};

export const getCompatibilities = async (req, res) => {
  try {
    const compatibilities = await Camera.findAll({
      include: {
        model: Film,
        as: "films",
      },
    });
    return res.status(200).json(compatibilities);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching compatibilities", error });
  }
};

export const getCompatibilityByCamera = async (req, res) => {
  const { cameraId } = req.params;

  try {
    const camera = await Camera.findByPk(cameraId, {
      include: {
        model: Film,
        as: "films",
      },
    });

    if (!camera) {
      return res.status(404).json({ message: "Camera not found" });
    }

    return res.status(200).json(camera);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching compatibility", error });
  }
};

export const getCompatibilityByFilm = async (req, res) => {
  const { filmId } = req.params;

  try {
    const film = await Film.findByPk(filmId, {
      include: {
        model: Camera,
        as: "cameras",
      },
    });

    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    return res.status(200).json(film);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching compatibility", error });
  }
};

export const deleteCompatibility = async (req, res) => {
  const { cameraId, filmId } = req.body;

  try {
    const camera = await Camera.findByPk(cameraId);
    const film = await Film.findByPk(filmId);

    if (!camera || !film) {
      return res.status(404).json({ message: "Camera or Film not found" });
    }

    await camera.removeFilm(film);
    return res
      .status(200)
      .json({ message: "Compatibility deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting compatibility", error });
  }
};
