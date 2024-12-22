import express from "express";
import { register } from "../controllers/authController.js";
import { validateUser } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateUser, register);

export default router;
