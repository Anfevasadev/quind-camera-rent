import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import brandRoutes from './routes/brandRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/brands', brandRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

export default app;
