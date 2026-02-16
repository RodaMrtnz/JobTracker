import { validate } from "../middlewares/validateMiddleware.js";
import { Router } from "express";
import { applicationController } from "../container/Container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const statusEnum = ["rejected", "accepted", "applied", "interviewing", "offer"];
const router = Router();

// POST - Crear una nueva aplicación
router.post(
  "/",
  authMiddleware,
  validate([
    { field: "companyId", required: true, type: "number" },
    { field: "position", required: true, type: "string" },
    { field: "technology", required: true, type: "string" },
    { field: "description", required: true, type: "string" },
    { field: "jobLink", required: true, type: "string" },
    { field: "statusName", required: true, type: "string", enum: statusEnum },
  ]),
  (req, res) => applicationController.create(req, res)
);

// GET - Obtener todas las aplicaciones del usuario
router.get("/", authMiddleware, (req, res) => applicationController.getAll(req, res));

// GET - Obtener una aplicación por ID
router.get("/:id", authMiddleware, (req, res) => applicationController.getById(req, res));

// PUT - Actualizar una aplicación por ID
router.put(
  "/:id",
  authMiddleware,
  validate([
    { field: "companyId", required: false, type: "number" },
    { field: "position", required: false, type: "string" },
    { field: "technology", required: false, type: "string" },
    { field: "description", required: false, type: "string" },
    { field: "jobLink", required: false, type: "string" },
    { field: "statusName", required: false, type: "string", enum: statusEnum },
  ]),
  (req, res) => applicationController.updateById(req, res)
);

export default router;
