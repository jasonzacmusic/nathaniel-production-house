import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Marketplace Constants
export const MARKETPLACE_CATEGORIES = [
  { value: "guitars", label: "Guitars" },
  { value: "bass", label: "Bass Guitars" },
  { value: "keyboards", label: "Keyboards & Pianos" },
  { value: "drums", label: "Drums & Percussion" },
  { value: "indian_classical", label: "Indian Classical" },
  { value: "pro_audio", label: "Pro Audio & Studio" },
  { value: "amplifiers", label: "Amplifiers" },
  { value: "dj", label: "DJ Equipment" },
  { value: "accessories", label: "Accessories" },
] as const;

export const LISTING_CONDITIONS = [
  { value: "mint", label: "Mint / Like New", description: "No visible wear, essentially unused" },
  { value: "excellent", label: "Excellent", description: "Minor cosmetic marks, fully functional" },
  { value: "good", label: "Good", description: "Normal wear, fully functional" },
  { value: "fair", label: "Fair", description: "Visible wear or minor issues" },
  { value: "poor", label: "Poor", description: "Significant wear, may need repair" },
] as const;

export const INDIAN_CITIES = [
  "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata", "Goa", "Other"
] as const;

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  displayName: text("display_name"),
  phone: text("phone"),
  city: text("city"),
  bio: text("bio"),
  isBanned: boolean("is_banned").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Studio Images
export const studioImages = pgTable("studio_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  caption: text("caption"),
  displayOrder: integer("display_order").default(0),
  feature: text("feature"),
});

export const insertStudioImageSchema = createInsertSchema(studioImages).omit({ id: true });
export type InsertStudioImage = z.infer<typeof insertStudioImageSchema>;
export type StudioImage = typeof studioImages.$inferSelect;

// YouTube Videos
export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  youtubeId: text("youtube_id").notNull(),
  category: text("category").notNull(), // studio_work, piano_tutorial, obs_guide, guitar_tutorial
  thumbnail: text("thumbnail"),
});

export const insertVideoSchema = createInsertSchema(videos).omit({ id: true });
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;

// Gear for Sale
export const gearListings = pgTable("gear_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // keyboards, guitars, drums, pro_audio
  description: text("description"),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  imageUrl: text("image_url"),
  amazonLink: text("amazon_link"),
  bajaaoLink: text("bajaao_link"),
  soundGlitzLink: text("sound_glitz_link"),
  sellerId: varchar("seller_id"),
  isSold: boolean("is_sold").default(false),
});

export const insertGearListingSchema = createInsertSchema(gearListings).omit({ id: true });
export type InsertGearListing = z.infer<typeof insertGearListingSchema>;
export type GearListing = typeof gearListings.$inferSelect;

// Affiliate Partners
export const affiliatePartners = pgTable("affiliate_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  type: text("type").notNull(), // software, hardware
  description: text("description"),
  commission: text("commission"),
  dealLink: text("deal_link"),
});

export const insertAffiliatePartnerSchema = createInsertSchema(affiliatePartners).omit({ id: true });
export type InsertAffiliatePartner = z.infer<typeof insertAffiliatePartnerSchema>;
export type AffiliatePartner = typeof affiliatePartners.$inferSelect;

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Site Configuration
export const siteConfig = pgTable("site_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const insertSiteConfigSchema = createInsertSchema(siteConfig).omit({ id: true });
export type InsertSiteConfig = z.infer<typeof insertSiteConfigSchema>;
export type SiteConfig = typeof siteConfig.$inferSelect;

// Instrument Recommendations (admin-editable)
export const instrumentRecommendations = pgTable("instrument_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(), // piano, guitar, accessories
  name: text("name").notNull(),
  model: text("model").notNull(),
  priceRange: text("price_range"),
  amazonLink: text("amazon_link"),
  bajaaoLink: text("bajaao_link"),
  description: text("description"),
  features: text("features"),
  recommendation: text("recommendation"), // budget, intermediate, professional
  displayOrder: integer("display_order").default(0),
});

export const insertInstrumentRecommendationSchema = createInsertSchema(instrumentRecommendations).omit({ id: true });
export type InsertInstrumentRecommendation = z.infer<typeof insertInstrumentRecommendationSchema>;
export type InstrumentRecommendation = typeof instrumentRecommendations.$inferSelect;

// OBS Guide Content (admin-editable)
export const obsGuideContent = pgTable("obs_guide_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull(), // intro, setup, zoom_tips, obs_settings
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0),
});

export const insertObsGuideContentSchema = createInsertSchema(obsGuideContent).omit({ id: true });
export type InsertObsGuideContent = z.infer<typeof insertObsGuideContentSchema>;
export type ObsGuideContent = typeof obsGuideContent.$inferSelect;

// Page Settings (for admin show/hide functionality)
export const pageSettings = pgTable("page_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: text("page_id").notNull().unique(), // matches the page id in siteConfig
  visible: boolean("visible").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPageSettingSchema = createInsertSchema(pageSettings).omit({ id: true, updatedAt: true });
export type InsertPageSetting = z.infer<typeof insertPageSettingSchema>;
export type PageSetting = typeof pageSettings.$inferSelect;

// Shareable Links (for admin to share specific pages with students)
export const shareableLinks = pgTable("shareable_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(), // short unique code for the link
  targetPage: text("target_page").notNull(), // the page path to redirect to
  label: text("label"), // optional description for admin reference
  expiresAt: timestamp("expires_at"), // optional expiration
  createdAt: timestamp("created_at").defaultNow(),
  accessCount: integer("access_count").default(0),
});

export const insertShareableLinkSchema = createInsertSchema(shareableLinks).omit({ id: true, createdAt: true, accessCount: true });
export type InsertShareableLink = z.infer<typeof insertShareableLinkSchema>;
export type ShareableLink = typeof shareableLinks.$inferSelect;

// Marketplace Listings (peer-to-peer)
export const marketplaceListings = pgTable("marketplace_listings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  condition: text("condition").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  imageUrls: text("image_urls"), // JSON array stored as text
  city: text("city").notNull(),
  status: text("status").notNull().default("pending"), // pending, active, sold, removed, rejected
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export const registerUserSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  city: z.string().min(1, "City is required"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;

// Form data types for frontend
export interface BookingFormData {
  type: 'learn' | 'record' | 'rehearse' | 'collaborate';
  name: string;
  email: string;
  phone: string;
  // Learn Music fields
  instrument?: string;
  level?: string;
  // Record Music fields
  projectType?: string;
  duration?: string;
  // Rehearse fields
  bandSize?: string;
  hours?: string;
  // Collaborate fields
  collaborationType?: string;
  genre?: string;
  message?: string;
}
