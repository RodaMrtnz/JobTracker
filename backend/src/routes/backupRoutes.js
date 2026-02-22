import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { backupController } from "../container/Container.js";

const router = Router();

// GET /backup
router.get("/", authMiddleware, (req, res, next) => backupController.download(req, res, next));

export default router;
