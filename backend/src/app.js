import express from "express";
import cors from "cors";
import router from "./routes/router.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Tracker API running ✅");
});

app.use("/api", router);

export default app;
