import express from "express";
import { validateUser } from "../middleware/validationMiddleware.js";
import { register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", validateUser, register);

export default router;