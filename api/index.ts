import express from "express";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;

async function ensureInit() {
  if (!initialized) {
    // Dynamic import to avoid module resolution issues at compile time
    const { registerRoutes } = await import("../server/routes.js");
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
    initialized = true;
  }
}

export default async function handler(req: any, res: any) {
  try {
    await ensureInit();
    app(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
}
