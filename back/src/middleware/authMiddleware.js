import { decodeToken } from "../utils/auth.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No se proporcionó un token",
    });
  }

  try {
    const decoded = decodeToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "No tienes permisos para realizar esta acción",
    });
  }
  next();
};

export const isAdminOrSelf = (req, res, next) => {
  if (
    req.user.role !== "admin" &&
    req.user.id !== parseInt(req.params.id, 10)
  ) {
    return res.status(403).json({
      success: false,
      message: "No tienes permisos para realizar esta acción",
    });
  }
  next();
};
