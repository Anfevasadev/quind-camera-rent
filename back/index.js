import app from "./src/app.js";
import syncDatabase from "./src/config/sync.js";
import "./src/jobs/rentalJob.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await syncDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};

startServer();