import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import cameraRoutes from './routes/cameraRoutes.js';
import filmRoutes from './routes/filmRoutes.js';
import compatibilityRoutes from './routes/compatibilityRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cameras', cameraRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/compatibility', compatibilityRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

export default app;
