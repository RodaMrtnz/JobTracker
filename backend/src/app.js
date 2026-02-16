import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import backupRoutes from "./routes/backupRoutes.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js"; 
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Job Tracker API running ✅");
});

app.use("/backup", backupRoutes);
app.use("/api", router);

app.use(errorMiddleware);

export default app;
