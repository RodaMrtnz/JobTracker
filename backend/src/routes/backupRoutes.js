import { Router } from "express";
import BackupService from "../services/BackupService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// GET /backup
router.get("/", authMiddleware, (req, res, next) => {
  try {
    const dbPath = BackupService.getDbFilePath();

    // Nombre con fecha para que quede lindo
    const filename = `jobtracker-backup-${new Date().toISOString().slice(0, 10)}.db`;

    // Descarga el archivo
    return res.download(dbPath, filename);
  } catch (err) {
    next(err);
  }
});

export default router;
