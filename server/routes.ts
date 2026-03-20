import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertStudioImageSchema,
  insertVideoSchema,
  insertGearListingSchema,
  insertAffiliatePartnerSchema,
  insertContactMessageSchema,
  insertInstrumentRecommendationSchema,
  insertObsGuideContentSchema,
  insertShareableLinkSchema
} from "../shared/schema";
import { z } from "zod";
import { randomUUID, createHash } from "crypto";

const adminTokens = new Map<string, { username: string; expires: number }>();

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function generateToken(): string {
  return randomUUID() + "-" + Date.now().toString(36);
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization required" });
  }
  
  const token = authHeader.substring(7);
  const session = adminTokens.get(token);
  
  if (!session || session.expires < Date.now()) {
    adminTokens.delete(token);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Studio Images
  app.get("/api/studio-images", async (req, res) => {
    try {
      const images = await storage.getStudioImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch studio images" });
    }
  });

  app.post("/api/studio-images", async (req, res) => {
    try {
      const data = insertStudioImageSchema.parse(req.body);
      const image = await storage.createStudioImage(data);
      res.status(201).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create studio image" });
    }
  });

  app.patch("/api/studio-images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertStudioImageSchema.partial().parse(req.body);
      const image = await storage.updateStudioImage(id, data);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update studio image" });
    }
  });

  app.delete("/api/studio-images/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteStudioImage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete studio image" });
    }
  });

  // Videos
  app.get("/api/videos", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const videos = await storage.getVideos(category);
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const data = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(data);
      res.status(201).json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  app.patch("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertVideoSchema.partial().parse(req.body);
      const video = await storage.updateVideo(id, data);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update video" });
    }
  });

  app.delete("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteVideo(id);
      if (!deleted) {
        return res.status(404).json({ error: "Video not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  // Gear Listings
  app.get("/api/gear", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      const listings = await storage.getGearListings({ category, search });
      res.json(listings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gear listings" });
    }
  });

  app.get("/api/gear/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const listing = await storage.getGearListing(id);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gear listing" });
    }
  });

  app.post("/api/gear", async (req, res) => {
    try {
      const data = insertGearListingSchema.parse(req.body);
      const listing = await storage.createGearListing(data);
      res.status(201).json(listing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create gear listing" });
    }
  });

  app.patch("/api/gear/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertGearListingSchema.partial().parse(req.body);
      const listing = await storage.updateGearListing(id, data);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update gear listing" });
    }
  });

  app.delete("/api/gear/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteGearListing(id);
      if (!deleted) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gear listing" });
    }
  });

  // Affiliate Partners
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAffiliatePartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  app.post("/api/partners", async (req, res) => {
    try {
      const data = insertAffiliatePartnerSchema.parse(req.body);
      const partner = await storage.createAffiliatePartner(data);
      res.status(201).json(partner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create partner" });
    }
  });

  app.patch("/api/partners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertAffiliatePartnerSchema.partial().parse(req.body);
      const partner = await storage.updateAffiliatePartner(id, data);
      if (!partner) {
        return res.status(404).json({ error: "Partner not found" });
      }
      res.json(partner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update partner" });
    }
  });

  app.delete("/api/partners/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteAffiliatePartner(id);
      if (!deleted) {
        return res.status(404).json({ error: "Partner not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete partner" });
    }
  });

  // Contact Messages
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Site Config
  app.get("/api/config", async (req, res) => {
    try {
      const config = await storage.getSiteConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch config" });
    }
  });

  app.put("/api/config/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      if (typeof value !== "string") {
        return res.status(400).json({ error: "Value must be a string" });
      }
      const config = await storage.updateConfig(key, value);
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: "Failed to update config" });
    }
  });

  // Booking Inquiry (Hero Form)
  app.post("/api/inquiries", async (req, res) => {
    try {
      const { type, name, email, phone, ...details } = req.body;
      
      // Store as contact message with type info
      const message = await storage.createContactMessage({
        name,
        email,
        phone,
        message: `Inquiry Type: ${type}\n\nDetails: ${JSON.stringify(details, null, 2)}`,
      });
      
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  // Admin Login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password || !user.isAdmin) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      
      const token = generateToken();
      const expires = Date.now() + 24 * 60 * 60 * 1000;
      adminTokens.set(token, { username: user.username, expires });
      
      res.json({ success: true, token, user: { username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });

  app.get("/api/admin/verify", requireAdminAuth, (req, res) => {
    res.json({ valid: true });
  });

  app.post("/api/admin/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      adminTokens.delete(authHeader.substring(7));
    }
    res.json({ success: true });
  });

  // Instrument Recommendations
  app.get("/api/instruments/recommendations", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const recommendations = await storage.getInstrumentRecommendations(category);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  });

  app.post("/api/instruments/recommendations", requireAdminAuth, async (req, res) => {
    try {
      const data = insertInstrumentRecommendationSchema.parse(req.body);
      const recommendation = await storage.createInstrumentRecommendation(data);
      res.status(201).json(recommendation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create recommendation" });
    }
  });

  app.patch("/api/instruments/recommendations/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const data = insertInstrumentRecommendationSchema.partial().parse(req.body);
      const recommendation = await storage.updateInstrumentRecommendation(id, data);
      if (!recommendation) {
        return res.status(404).json({ error: "Recommendation not found" });
      }
      res.json(recommendation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update recommendation" });
    }
  });

  app.delete("/api/instruments/recommendations/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const deleted = await storage.deleteInstrumentRecommendation(id);
      if (!deleted) {
        return res.status(404).json({ error: "Recommendation not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete recommendation" });
    }
  });

  // OBS Guide Content
  app.get("/api/obs-guide/content", async (req, res) => {
    try {
      const section = req.query.section as string | undefined;
      const content = await storage.getObsGuideContent(section);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch OBS guide content" });
    }
  });

  app.post("/api/obs-guide/content", requireAdminAuth, async (req, res) => {
    try {
      const data = insertObsGuideContentSchema.parse(req.body);
      const content = await storage.createObsGuideContent(data);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create content" });
    }
  });

  // Page Settings (public endpoint to get visibility)
  app.get("/api/page-settings", async (req, res) => {
    try {
      const settings = await storage.getPageSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page settings" });
    }
  });

  // Admin: Update page visibility
  app.patch("/api/page-settings/:pageId", requireAdminAuth, async (req, res) => {
    try {
      const pageId = req.params.pageId as string;
      const { visible } = req.body;
      if (typeof visible !== "boolean") {
        return res.status(400).json({ error: "visible must be a boolean" });
      }
      const setting = await storage.updatePageSetting(pageId, visible);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update page setting" });
    }
  });

  // Shareable Links
  app.get("/api/share-links", requireAdminAuth, async (req, res) => {
    try {
      const links = await storage.getShareableLinks();
      res.json(links);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shareable links" });
    }
  });

  app.post("/api/share-links", requireAdminAuth, async (req, res) => {
    try {
      const code = req.body.code || randomUUID().substring(0, 8);
      const data = insertShareableLinkSchema.parse({ ...req.body, code });
      const link = await storage.createShareableLink(data);
      res.status(201).json(link);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create shareable link" });
    }
  });

  app.delete("/api/share-links/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const deleted = await storage.deleteShareableLink(id);
      if (!deleted) {
        return res.status(404).json({ error: "Link not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete shareable link" });
    }
  });

  // Public: Resolve shareable link and redirect
  app.get("/s/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const link = await storage.getShareableLinkByCode(code);
      
      if (!link) {
        return res.redirect("/?error=invalid-link");
      }
      
      // Check expiration
      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        return res.redirect("/?error=expired-link");
      }
      
      // Increment access count
      await storage.incrementShareableLinkAccess(code);
      
      // Redirect to target page
      res.redirect(link.targetPage);
    } catch (error) {
      res.redirect("/");
    }
  });

  return httpServer;
}
