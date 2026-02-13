import { Router } from "express";
import { userController } from "../container/Container.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas protegidas
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);
router.put("/change-password", authMiddleware, userController.changePassword);
router.delete("/profile", authMiddleware, userController.deleteProfile);

export default router;
