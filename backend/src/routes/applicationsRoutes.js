import { validate } from "../middlewares/validateMiddleware.js";
import { Router } from "express";
import { applicationController } from "../container/Container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const statusEnum = ["rejected", "accepted", "applied", "interviewing", "offer"];
const router = Router();

// POST - Create a new application
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

// GET - Get all applications for the user
router.get("/", authMiddleware, (req, res) => applicationController.getAll(req, res));

// GET - Get an application by ID
router.get("/:id", authMiddleware, (req, res) => applicationController.getById(req, res));

// PUT - Update an application by ID
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
