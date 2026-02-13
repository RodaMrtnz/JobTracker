import { Sequelize } from "sequelize";
import path from "path";

const storagePath = path.resolve("src/data/jobtracker.db");

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
});
