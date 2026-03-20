import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import {
  insertStudioImageSchema,
  insertVideoSchema,
  insertGearListingSchema,
  insertAffiliatePartnerSchema,
  insertContactMessageSchema,
  insertInstrumentRecommendationSchema,
  insertObsGuideContentSchema,
  insertShareableLinkSchema,
  insertMarketplaceListingSchema,
  registerUserSchema,
  loginSchema,
  insertZoomSlotSchema,
  insertZoomRequestSchema,
} from "../shared/schema.js";
import { z } from "zod";
import { randomUUID, createHash } from "crypto";

const adminTokens = new Map<string, { username: string; expires: number }>();
const userTokens = new Map<string, { userId: string; expires: number }>();

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

function requireUserAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Login required" });
  }
  const token = authHeader.substring(7);
  const session = userTokens.get(token);
  if (!session || session.expires < Date.now()) {
    userTokens.delete(token);
    return res.status(401).json({ error: "Session expired, please login again" });
  }
  (req as any).userId = session.userId;
  next();
}

function optionalUserAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const session = userTokens.get(token);
    if (session && session.expires >= Date.now()) {
      (req as any).userId = session.userId;
    }
  }
  next();
}

function computeGearHealthScore(listing: any): { score: number; label: string } | null {
  const c = listing.gearHealthCosmeticScore;
  const e = listing.gearHealthElectronicsWorking;
  const a = listing.gearHealthOriginalAccessories;
  const b = listing.gearHealthOriginalBox;
  const w = listing.gearHealthWarrantyMonths;
  if (c == null && e == null && a == null && b == null && w == null) return null;
  let score = 0, weight = 0;
  if (c != null) { score += (c / 5) * 30; weight += 30; }
  if (e != null) { score += (e ? 25 : 0); weight += 25; }
  if (a != null) { score += (a ? 15 : 0); weight += 15; }
  if (b != null) { score += (b ? 10 : 0); weight += 10; }
  if (w != null) { score += Math.min(w / 12, 1) * 20; weight += 20; }
  const normalized = weight > 0 ? Math.round((score / weight) * 100) : 0;
  const label = normalized >= 80 ? "Excellent" : normalized >= 60 ? "Good" : normalized >= 40 ? "Fair" : "Needs Attention";
  return { score: normalized, label };
}

function computePriceIndicator(price: number, newMarketPrice: number | null, condition: string): { label: string; savingsPercent: number } | null {
  if (!newMarketPrice || newMarketPrice <= 0) return null;
  const savingsPercent = Math.round(((newMarketPrice - price) / newMarketPrice) * 100);
  const thresholds: Record<string, [number, number]> = {
    mint: [15, 30], excellent: [20, 40], good: [30, 50], fair: [40, 60], poor: [50, 70],
  };
  const [fairMin, greatMin] = thresholds[condition] || [30, 50];
  const label = savingsPercent >= greatMin ? "Great Deal" : savingsPercent >= fairMin ? "Fair Price" : "Above Market";
  return { label, savingsPercent };
}

function parseVideoUrl(url: string): { type: string; embedUrl: string } {
  if (!url) return { type: "unknown", embedUrl: url };
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}` };
  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) return { type: "gdrive", embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
  // Dropbox
  if (url.includes("dropbox.com")) return { type: "dropbox", embedUrl: url.replace("dl=0", "raw=1").replace("www.dropbox.com", "dl.dropboxusercontent.com") };
  return { type: "unknown", embedUrl: url };
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

  // =====================
  // USER AUTH ENDPOINTS
  // =====================

  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerUserSchema.parse(req.body);
      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(409).json({ error: "Email already registered" });
      }
      const existingPhone = await storage.getUserByPhone(data.phone);
      if (existingPhone) {
        return res.status(409).json({ error: "Phone number already registered" });
      }
      const user = await storage.createUser({
        username: data.email,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        phone: data.phone,
        city: data.city,
      } as any);
      const token = generateToken();
      userTokens.set(token, { userId: user.id, expires: Date.now() + 7 * 24 * 60 * 60 * 1000 });
      res.status(201).json({
        token,
        user: { id: user.id, displayName: user.displayName, email: user.email, phone: user.phone, city: user.city, bio: user.bio, createdAt: user.createdAt },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0]?.message || "Validation error" });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(data.email);
      if (!user || user.password !== data.password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      if (user.isBanned) {
        return res.status(403).json({ error: "Account suspended" });
      }
      const token = generateToken();
      userTokens.set(token, { userId: user.id, expires: Date.now() + 7 * 24 * 60 * 60 * 1000 });
      res.json({
        token,
        user: { id: user.id, displayName: user.displayName, email: user.email, phone: user.phone, city: user.city, bio: user.bio, createdAt: user.createdAt },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid input" });
      }
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      userTokens.delete(authHeader.substring(7));
    }
    res.json({ success: true });
  });

  app.get("/api/auth/me", requireUserAuth, async (req, res) => {
    try {
      const user = await storage.getUser((req as any).userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ id: user.id, displayName: user.displayName, email: user.email, phone: user.phone, city: user.city, bio: user.bio, createdAt: user.createdAt });
    } catch {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.patch("/api/auth/me", requireUserAuth, async (req, res) => {
    try {
      const { displayName, phone, city, bio } = req.body;
      const updated = await storage.updateUser((req as any).userId, { displayName, phone, city, bio });
      if (!updated) return res.status(404).json({ error: "User not found" });
      res.json({ id: updated.id, displayName: updated.displayName, email: updated.email, phone: updated.phone, city: updated.city, bio: updated.bio, createdAt: updated.createdAt });
    } catch {
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // =====================
  // MARKETPLACE ENDPOINTS
  // =====================

  // Browse active listings (public)
  app.get("/api/marketplace", async (req, res) => {
    try {
      const listings = await storage.getMarketplaceListings({
        category: req.query.category as string,
        condition: req.query.condition as string,
        city: req.query.city as string,
        priceMin: req.query.priceMin ? parseInt(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseInt(req.query.priceMax as string) : undefined,
        search: req.query.search as string,
        sort: req.query.sort as string,
        status: "active",
      });
      // Attach seller info to each listing
      const withSellers = await Promise.all(
        listings.map(async (listing) => {
          const seller = await storage.getUser(listing.sellerId);
          const gearHealth = computeGearHealthScore(listing);
          const priceIndicator = computePriceIndicator(listing.price, listing.newMarketPrice, listing.condition);
          return {
            ...listing,
            seller: seller ? { id: seller.id, displayName: seller.displayName, city: seller.city, createdAt: seller.createdAt } : null,
            hasVideo: !!listing.videoUrl,
            imageCount: listing.imageUrls ? JSON.parse(listing.imageUrls).length : 0,
            gearHealthScore: gearHealth?.score ?? null,
            gearHealthLabel: gearHealth?.label ?? null,
            priceIndicator: priceIndicator?.label ?? null,
            savingsPercent: priceIndicator?.savingsPercent ?? null,
          };
        })
      );
      res.json(withSellers);
    } catch {
      res.status(500).json({ error: "Failed to fetch listings" });
    }
  });

  // Single listing detail (public, increments view count)
  app.get("/api/marketplace/:id", async (req, res) => {
    try {
      const id = req.params.id as string;
      const listing = await storage.getMarketplaceListing(id);
      if (!listing || (listing.status !== "active" && listing.status !== "sold")) {
        return res.status(404).json({ error: "Listing not found" });
      }
      await storage.incrementListingViewCount(listing.id);
      const seller = await storage.getUser(listing.sellerId);
      const sellerListingCount = seller ? (await storage.getListingsBySeller(seller.id)).filter(l => l.status === "active").length : 0;
      const gearHealth = computeGearHealthScore(listing);
      const priceIndicator = computePriceIndicator(listing.price, listing.newMarketPrice, listing.condition);
      const videoEmbed = listing.videoUrl ? parseVideoUrl(listing.videoUrl) : null;
      res.json({
        ...listing,
        viewCount: (listing.viewCount || 0) + 1,
        seller: seller ? { id: seller.id, displayName: seller.displayName, phone: seller.phone, city: seller.city, createdAt: seller.createdAt, activeListings: sellerListingCount } : null,
        gearHealth,
        priceIndicator,
        videoEmbed,
      });
    } catch {
      res.status(500).json({ error: "Failed to fetch listing" });
    }
  });

  // Create listing (requires login)
  app.post("/api/marketplace", requireUserAuth, async (req, res) => {
    try {
      const userId = (req as any).userId;
      const user = await storage.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      if (user.isBanned) return res.status(403).json({ error: "Account suspended" });
      const data = insertMarketplaceListingSchema.parse(req.body);
      const listing = await storage.createMarketplaceListing({
        ...data,
        sellerId: userId,
        city: data.city || user.city || "Other",
      });
      res.status(201).json(listing);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0]?.message || "Validation error" });
      }
      res.status(500).json({ error: "Failed to create listing" });
    }
  });

  // Edit own listing
  app.patch("/api/marketplace/:id", requireUserAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const listing = await storage.getMarketplaceListing(id);
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      if (listing.sellerId !== (req as any).userId) return res.status(403).json({ error: "Not your listing" });
      const data = insertMarketplaceListingSchema.partial().parse(req.body);
      const updated = await storage.updateMarketplaceListing(id, data);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0]?.message || "Validation error" });
      }
      res.status(500).json({ error: "Failed to update listing" });
    }
  });

  // Mark as sold (owner only)
  app.patch("/api/marketplace/:id/sold", requireUserAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const listing = await storage.getMarketplaceListing(id);
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      if (listing.sellerId !== (req as any).userId) return res.status(403).json({ error: "Not your listing" });
      const updated = await storage.updateListingStatus(id, "sold");
      res.json(updated);
    } catch {
      res.status(500).json({ error: "Failed to mark as sold" });
    }
  });

  // Delete own listing
  app.delete("/api/marketplace/:id", requireUserAuth, async (req, res) => {
    try {
      const id = req.params.id as string;
      const listing = await storage.getMarketplaceListing(id);
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      if (listing.sellerId !== (req as any).userId) return res.status(403).json({ error: "Not your listing" });
      await storage.deleteMarketplaceListing(id);
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Failed to delete listing" });
    }
  });

  // My listings (all statuses)
  app.get("/api/marketplace-my-listings", requireUserAuth, async (req, res) => {
    try {
      const listings = await storage.getListingsBySeller((req as any).userId);
      res.json(listings.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }));
    } catch {
      res.status(500).json({ error: "Failed to fetch your listings" });
    }
  });

  // Seller public profile
  app.get("/api/sellers/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id as string);
      if (!user || user.isAdmin) return res.status(404).json({ error: "Seller not found" });
      const listings = (await storage.getListingsBySeller(user.id)).filter(l => l.status === "active");
      res.json({
        id: user.id,
        displayName: user.displayName,
        city: user.city,
        bio: user.bio,
        createdAt: user.createdAt,
        activeListings: listings.length,
        listings,
      });
    } catch {
      res.status(500).json({ error: "Failed to fetch seller profile" });
    }
  });

  // =====================
  // ADMIN: MARKETPLACE MANAGEMENT
  // =====================

  app.get("/api/admin/marketplace/stats", requireAdminAuth, async (_req, res) => {
    try {
      const stats = await storage.getMarketplaceStats();
      res.json(stats);
    } catch {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/marketplace/pending", requireAdminAuth, async (_req, res) => {
    try {
      const listings = await storage.getPendingListings();
      const withSellers = await Promise.all(
        listings.map(async (listing) => {
          const seller = await storage.getUser(listing.sellerId);
          return { ...listing, seller: seller ? { id: seller.id, displayName: seller.displayName, city: seller.city } : null };
        })
      );
      res.json(withSellers);
    } catch {
      res.status(500).json({ error: "Failed to fetch pending listings" });
    }
  });

  app.get("/api/admin/marketplace/all", requireAdminAuth, async (req, res) => {
    try {
      const listings = await storage.getMarketplaceListings({ status: req.query.status as string });
      const withSellers = await Promise.all(
        listings.map(async (listing) => {
          const seller = await storage.getUser(listing.sellerId);
          return { ...listing, seller: seller ? { id: seller.id, displayName: seller.displayName } : null };
        })
      );
      res.json(withSellers);
    } catch {
      res.status(500).json({ error: "Failed to fetch listings" });
    }
  });

  app.patch("/api/admin/marketplace/:id/approve", requireAdminAuth, async (req, res) => {
    try {
      const updated = await storage.updateListingStatus(req.params.id as string, "active");
      if (!updated) return res.status(404).json({ error: "Listing not found" });
      res.json(updated);
    } catch {
      res.status(500).json({ error: "Failed to approve listing" });
    }
  });

  app.patch("/api/admin/marketplace/:id/reject", requireAdminAuth, async (req, res) => {
    try {
      const updated = await storage.updateListingStatus(req.params.id as string, "rejected");
      if (!updated) return res.status(404).json({ error: "Listing not found" });
      res.json(updated);
    } catch {
      res.status(500).json({ error: "Failed to reject listing" });
    }
  });

  app.delete("/api/admin/marketplace/:id", requireAdminAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteMarketplaceListing(req.params.id as string);
      if (!deleted) return res.status(404).json({ error: "Listing not found" });
      res.status(204).send();
    } catch {
      res.status(500).json({ error: "Failed to remove listing" });
    }
  });

  app.get("/api/admin/users", requireAdminAuth, async (_req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(u => ({
        id: u.id, displayName: u.displayName, email: u.email, phone: u.phone, city: u.city, isBanned: u.isBanned, createdAt: u.createdAt,
      })));
    } catch {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.patch("/api/admin/users/:id/ban", requireAdminAuth, async (req, res) => {
    try {
      const { banned } = req.body;
      const updated = await storage.banUser(req.params.id as string, !!banned);
      if (!updated) return res.status(404).json({ error: "User not found" });
      res.json({ id: updated.id, displayName: updated.displayName, isBanned: updated.isBanned });
    } catch {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // =====================
  // ZOOM VERIFICATION
  // =====================

  // Public: available slots for a listing
  app.get("/api/marketplace/:id/zoom-slots", async (req, res) => {
    try {
      const slots = await storage.getAvailableZoomSlots();
      res.json(slots);
    } catch {
      res.status(500).json({ error: "Failed to fetch slots" });
    }
  });

  // User: request zoom verification
  app.post("/api/marketplace/:id/zoom-request", requireUserAuth, async (req, res) => {
    try {
      const listingId = req.params.id as string;
      const userId = (req as any).userId;
      const { slotId, buyerNotes } = req.body;
      if (!slotId) return res.status(400).json({ error: "Slot selection required" });
      const listing = await storage.getMarketplaceListing(listingId);
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      const request = await storage.createZoomRequest({ listingId, buyerId: userId, slotId, buyerNotes: buyerNotes || null });
      res.status(201).json(request);
    } catch {
      res.status(500).json({ error: "Failed to create request" });
    }
  });

  // User: my zoom requests
  app.get("/api/my-zoom-requests", requireUserAuth, async (req, res) => {
    try {
      const requests = await storage.getZoomRequestsByBuyer((req as any).userId);
      res.json(requests);
    } catch {
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  // Admin: manage zoom slots
  app.get("/api/admin/zoom-slots", requireAdminAuth, async (_req, res) => {
    try { res.json(await storage.getAllZoomSlots()); } catch { res.status(500).json({ error: "Failed" }); }
  });

  app.post("/api/admin/zoom-slots", requireAdminAuth, async (req, res) => {
    try {
      const data = insertZoomSlotSchema.parse(req.body);
      const slot = await storage.createZoomSlot(data);
      res.status(201).json(slot);
    } catch (error) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
      res.status(500).json({ error: "Failed to create slot" });
    }
  });

  app.delete("/api/admin/zoom-slots/:id", requireAdminAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteZoomSlot(req.params.id as string);
      if (!deleted) return res.status(404).json({ error: "Slot not found" });
      res.status(204).send();
    } catch { res.status(500).json({ error: "Failed" }); }
  });

  // Admin: zoom requests management
  app.get("/api/admin/zoom-requests", requireAdminAuth, async (_req, res) => {
    try {
      const requests = await storage.getPendingZoomRequests();
      const enriched = await Promise.all(requests.map(async (r) => {
        const listing = await storage.getMarketplaceListing(r.listingId);
        const buyer = await storage.getUser(r.buyerId);
        const slot = (await storage.getAllZoomSlots()).find(s => s.id === r.slotId);
        return { ...r, listing: listing ? { id: listing.id, title: listing.title } : null, buyer: buyer ? { displayName: buyer.displayName, phone: buyer.phone } : null, slot };
      }));
      res.json(enriched);
    } catch { res.status(500).json({ error: "Failed" }); }
  });

  app.patch("/api/admin/zoom-requests/:id/approve", requireAdminAuth, async (req, res) => {
    try {
      const { zoomLink } = req.body;
      const updated = await storage.updateZoomRequestStatus(req.params.id as string, "approved", zoomLink);
      if (!updated) return res.status(404).json({ error: "Not found" });
      // Mark the slot as unavailable
      await storage.markSlotUnavailable(updated.slotId);
      res.json(updated);
    } catch { res.status(500).json({ error: "Failed" }); }
  });

  app.patch("/api/admin/zoom-requests/:id/cancel", requireAdminAuth, async (req, res) => {
    try {
      const updated = await storage.updateZoomRequestStatus(req.params.id as string, "cancelled", undefined, req.body.adminNotes);
      if (!updated) return res.status(404).json({ error: "Not found" });
      res.json(updated);
    } catch { res.status(500).json({ error: "Failed" }); }
  });

  return httpServer;
}
