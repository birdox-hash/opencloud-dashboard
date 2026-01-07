import fs from "fs";
import { exec } from "child_process";
import { logger } from "../utils/logger.js";

const configPath = new URL("../../config/apps.json", import.meta.url);

export function listApps(req, res) {
  logger.info("Apps: list requested");
  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    const apps = JSON.parse(raw);
    res.json(apps);
  } catch (err) {
    logger.error("Apps: failed to load apps.json", { message: err.message });
    res.status(500).json({ error: "Failed to load apps list" });
  }
}

export function installApp(req, res) {
  const { id } = req.params;
  logger.info("Apps: install requested", { id });

  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    const apps = JSON.parse(raw);
    const app = apps.find(a => a.id === id);

    if (!app) {
      logger.warn("Apps: install blocked (not allowed)", { id });
      return res.status(404).json({ error: "App not allowed" });
    }

    exec(app.installCommand, (err, stdout, stderr) => {
      if (err) {
        logger.error("Apps: install failed", { id, error: err.message, stderr });
        return res.status(500).json({ error: "Install failed" });
      }
      logger.info("Apps: install completed", { id });
      res.json({ status: "ok", output: stdout });
    });
  } catch (err) {
    logger.error("Apps: install crashed", { id, message: err.message });
    res.status(500).json({ error: "Installer error" });
  }
};