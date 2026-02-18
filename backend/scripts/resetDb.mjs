import fs from "fs";
import { sequelize, DB_STORAGE_PATH } from "../src/config/db.js";

async function resetDb() {
  try {
    await sequelize.close();

    if (fs.existsSync(DB_STORAGE_PATH)) {
      fs.unlinkSync(DB_STORAGE_PATH);
      console.log("Database file deleted:", DB_STORAGE_PATH);
    } else {
      console.log("Database file not found:", DB_STORAGE_PATH);
    }

    console.log("Database reset complete.");
  } catch (error) {
    console.error("Database reset failed:", error.message);
    console.error("Tip: stop backend first (Ctrl + C) and run again.");
    process.exit(1);
  }
}

resetDb();
