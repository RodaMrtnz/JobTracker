import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware.js";
import { companiesController } from "../container/Container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// POST - Create a new company
router.post(
  "/",
  authMiddleware,
  validate([
    { field: "name", required: true, type: "string" },
    { field: "industry", required: true, type: "string" },
  ]),
  (req, res) => companiesController.create(req, res)
);

// GET - Get all companies
router.get("/", (req, res) => companiesController.getAll(req, res));

// GET - Get a company by ID
router.get("/:id", (req, res) => companiesController.getById(req, res));

// PUT - Update a company by ID
router.put(
  "/:id",
  authMiddleware,
  validate([
    { field: "name", required: false, type: "string" },
    { field: "industry", required: false, type: "string" },
  ]),
  (req, res) => companiesController.updateById(req, res)
);

export default router;
