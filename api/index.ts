import express from "express";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;

async function ensureInit() {
  if (!initialized) {
    const { registerRoutes } = await import("../server/routes.js");
    const httpServer = createServer(app);
    await registerRoutes(httpServer, app);
    initialized = true;
  }
}

export default async function handler(req: any, res: any) {
  await ensureInit();
  app(req, res);
}
