import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertStudioImageSchema, 
  insertVideoSchema, 
  insertGearListingSchema, 
  insertAffiliatePartnerSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import { z } from "zod";

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

  return httpServer;
}
