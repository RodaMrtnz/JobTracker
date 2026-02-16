import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware.js";
import { companiesController } from "../container/Container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// POST - Crear una nueva empresa
router.post(
  "/",
  authMiddleware,
  validate([
    { field: "name", required: true, type: "string" },
    { field: "industry", required: true, type: "string" },
    { field: "website", required: true, type: "string" },
  ]),
  (req, res) => companiesController.create(req, res)
);

// GET - Obtener todas las empresas
router.get("/", (req, res) => companiesController.getAll(req, res));

// GET - Obtener una empresa por ID
router.get("/:id", (req, res) => companiesController.getById(req, res));

// PUT - Actualizar una empresa por ID
router.put(
  "/:id",
  authMiddleware,
  validate([
    { field: "name", required: false, type: "string" },
    { field: "industry", required: false, type: "string" },
    { field: "website", required: false, type: "string" },
  ]),
  (req, res) => companiesController.updateById(req, res)
);

export default router;
