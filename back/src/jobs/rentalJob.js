import cron from "node-cron";
import { updateRentals } from "../services/rentalService.js";
import dotenv from "dotenv";

dotenv.config();

const cronSchedule = process.env.CRON_SCHEDULE || "0 0 * * *"; // Valor por defecto: ejecución diaria a medianoche

// Programar el cron-job para que se ejecute según el cronograma definido en la variable de entorno
cron.schedule(cronSchedule, updateRentals);

export default updateRentals;