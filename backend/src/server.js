import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./config/db.js";
import Status from "./models/Status.js";
import "./models/assosiations.js";

const PORT = process.env.PORT || 4000;
const SHOULD_ALTER_DB = process.env.DB_ALTER === "true";

async function seedStatuses() {
  const defaultStatuses = [
    { name: "rejected", color: "red" },
    { name: "accepted", color: "green" },
    { name: "applied", color: "blue" },
    { name: "interviewing", color: "yellow" },
    { name: "offer", color: "white" },
  ];

  await Status.bulkCreate(defaultStatuses, { ignoreDuplicates: true });
}

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(SHOULD_ALTER_DB ? { alter: true } : undefined);
    await seedStatuses();
    console.log("DB connected");

    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

start();
