import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware.js";
import { authController } from "../container/Container.js";

const router = Router();

router.post(
  "/register",
  validate([
    { field: "email", required: true, type: "string" },
    { field: "password", required: true, type: "string" },
    { field: "name", required: true, type: "string" },
  ]),
  (req, res) => authController.register(req, res)
);

router.post(
  "/login",
  validate([
    { field: "email", required: true, type: "string" },
    { field: "password", required: true, type: "string" },
  ]),
  (req, res) => authController.login(req, res)
);

router.post("/logout", (req, res) => authController.logout(req, res));
router.get("/verify", (req, res) => authController.verifyToken(req, res));

export default router;
