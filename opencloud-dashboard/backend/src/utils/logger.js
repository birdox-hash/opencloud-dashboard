import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const logFile = path.join(logDir, "server.log");

function write(level, message, meta = {}) {
  const entry = { time: new Date().toISOString(), level, message, ...meta };
  fs.appendFileSync(logFile, JSON.stringify(entry) + "\n");
  console.log(`[${level.toUpperCase()}] ${message}`, meta);
}

export const logger = {
  info: (msg, meta) => write("info", msg, meta),
  warn: (msg, meta) => write("warn", msg, meta),
  error: (msg, meta) => write("error", msg, meta)
};