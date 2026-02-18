import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DB_STORAGE_PATH = path.resolve(__dirname, "../data/jobtracker.db");

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_STORAGE_PATH,
  logging: false,
});
