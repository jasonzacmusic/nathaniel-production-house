import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createServer } from "http";
import { registerRoutes } from "../server/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
let initialized = false;

async function ensureInit() {
  if (!initialized) {
    await registerRoutes(httpServer, app);
    initialized = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureInit();
  app(req as any, res as any);
}
