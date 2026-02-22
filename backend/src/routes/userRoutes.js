import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware.js";
import { userController } from "../container/Container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas protegidas
router.get("/profile", authMiddleware, (req, res) => userController.getProfile(req, res));

router.put(
  "/profile",
  authMiddleware,
  validate([
    { field: "name", required: true, type: "string" },
  ]),
  (req, res) => userController.updateProfile(req, res)
);

router.put(
  "/change-password",
  authMiddleware,
  validate([
    { field: "oldPassword", required: true, type: "string" },
    { field: "newPassword", required: true, type: "string" },
    { field: "confirmPassword", required: true, type: "string" },
  ]),
  (req, res) => userController.changePassword(req, res)
);

router.delete(
  "/profile",
  authMiddleware,
  validate([
    { field: "password", required: true, type: "string" },
  ]),
  (req, res) => userController.deleteProfile(req, res)
);

export default router;
