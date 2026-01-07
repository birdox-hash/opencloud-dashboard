import express from "express";
import cors from "cors";
import { listApps, installApp } from "./routes/apps.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/apps", listApps);
app.post("/api/apps/:id/install", installApp);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));