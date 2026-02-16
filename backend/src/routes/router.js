import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import applicationsRoutes from "./applicationsRoutes.js";
import companiesRoutes from "./companiesRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/applications", applicationsRoutes);
router.use("/companies", companiesRoutes);

export default router;