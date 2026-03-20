import { eq, and, or, ilike, gte, lte, desc, asc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "./db.js";
import {
  type User,
  type InsertUser,
  type StudioImage,
  type InsertStudioImage,
  type Video,
  type InsertVideo,
  type GearListing,
  type InsertGearListing,
  type AffiliatePartner,
  type InsertAffiliatePartner,
  type ContactMessage,
  type InsertContactMessage,
  type SiteConfig,
  type InsertSiteConfig,
  type InstrumentRecommendation,
  type InsertInstrumentRecommendation,
  type ObsGuideContent,
  type InsertObsGuideContent,
  type PageSetting,
  type InsertPageSetting,
  type ShareableLink,
  type InsertShareableLink,
  type MarketplaceListing,
  type InsertMarketplaceListing,
  type ZoomVerificationSlot,
  type InsertZoomSlot,
  type ZoomVerificationRequest,
  type InsertZoomRequest,
  users,
  studioImages,
  videos,
  gearListings,
  affiliatePartners,
  contactMessages,
  siteConfig,
  instrumentRecommendations,
  obsGuideContent,
  pageSettings,
  shareableLinks,
  marketplaceListings,
  zoomVerificationSlots,
  zoomVerificationRequests,
} from "../shared/schema.js";
import type { IStorage } from "./storage.js";

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.username, username));
    return result;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.email, email));
    return result;
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = randomUUID();
    const [result] = await db.insert(users).values({
      id,
      username: user.username,
      email: user.email,
      password: user.password,
      displayName: (user as any).displayName || null,
      phone: (user as any).phone || null,
      city: (user as any).city || null,
      bio: null,
      isAdmin: false,
      isBanned: false,
    }).returning();
    return result;
  }

  // Studio Images
  async getStudioImages(): Promise<StudioImage[]> {
    return await db.select().from(studioImages).orderBy(asc(studioImages.displayOrder));
  }

  async getStudioImage(id: string): Promise<StudioImage | undefined> {
    const [result] = await db.select().from(studioImages).where(eq(studioImages.id, id));
    return result;
  }

  async createStudioImage(image: InsertStudioImage): Promise<StudioImage> {
    const id = randomUUID();
    const [result] = await db.insert(studioImages).values({ id, ...image }).returning();
    return result;
  }

  async updateStudioImage(id: string, image: Partial<InsertStudioImage>): Promise<StudioImage | undefined> {
    const [result] = await db.update(studioImages).set(image).where(eq(studioImages.id, id)).returning();
    return result;
  }

  async deleteStudioImage(id: string): Promise<boolean> {
    const result = await db.delete(studioImages).where(eq(studioImages.id, id)).returning();
    return result.length > 0;
  }

  // Videos
  async getVideos(category?: string): Promise<Video[]> {
    if (category) {
      return await db.select().from(videos).where(eq(videos.category, category));
    }
    return await db.select().from(videos);
  }

  async getVideo(id: string): Promise<Video | undefined> {
    const [result] = await db.select().from(videos).where(eq(videos.id, id));
    return result;
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const id = randomUUID();
    const [result] = await db.insert(videos).values({ id, ...video }).returning();
    return result;
  }

  async updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined> {
    const [result] = await db.update(videos).set(video).where(eq(videos.id, id)).returning();
    return result;
  }

  async deleteVideo(id: string): Promise<boolean> {
    const result = await db.delete(videos).where(eq(videos.id, id)).returning();
    return result.length > 0;
  }

  // Gear Listings
  async getGearListings(filters?: { category?: string; search?: string }): Promise<GearListing[]> {
    const conditions = [];
    if (filters?.category && filters.category !== "all") {
      conditions.push(eq(gearListings.category, filters.category));
    }
    if (filters?.search) {
      conditions.push(
        or(
          ilike(gearListings.name, `%${filters.search}%`),
          ilike(gearListings.description, `%${filters.search}%`)
        )
      );
    }
    conditions.push(eq(gearListings.isSold, false));
    return await db.select().from(gearListings).where(and(...conditions));
  }

  async getGearListing(id: string): Promise<GearListing | undefined> {
    const [result] = await db.select().from(gearListings).where(eq(gearListings.id, id));
    return result;
  }

  async createGearListing(listing: InsertGearListing): Promise<GearListing> {
    const id = randomUUID();
    const [result] = await db.insert(gearListings).values({ id, ...listing }).returning();
    return result;
  }

  async updateGearListing(id: string, listing: Partial<InsertGearListing>): Promise<GearListing | undefined> {
    const [result] = await db.update(gearListings).set(listing).where(eq(gearListings.id, id)).returning();
    return result;
  }

  async deleteGearListing(id: string): Promise<boolean> {
    const result = await db.delete(gearListings).where(eq(gearListings.id, id)).returning();
    return result.length > 0;
  }

  // Affiliate Partners
  async getAffiliatePartners(): Promise<AffiliatePartner[]> {
    return await db.select().from(affiliatePartners);
  }

  async getAffiliatePartner(id: string): Promise<AffiliatePartner | undefined> {
    const [result] = await db.select().from(affiliatePartners).where(eq(affiliatePartners.id, id));
    return result;
  }

  async createAffiliatePartner(partner: InsertAffiliatePartner): Promise<AffiliatePartner> {
    const id = randomUUID();
    const [result] = await db.insert(affiliatePartners).values({ id, ...partner }).returning();
    return result;
  }

  async updateAffiliatePartner(id: string, partner: Partial<InsertAffiliatePartner>): Promise<AffiliatePartner | undefined> {
    const [result] = await db.update(affiliatePartners).set(partner).where(eq(affiliatePartners.id, id)).returning();
    return result;
  }

  async deleteAffiliatePartner(id: string): Promise<boolean> {
    const result = await db.delete(affiliatePartners).where(eq(affiliatePartners.id, id)).returning();
    return result.length > 0;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const [result] = await db.insert(contactMessages).values({ id, ...message, createdAt: new Date() }).returning();
    return result;
  }

  // Site Config
  async getSiteConfig(): Promise<SiteConfig[]> {
    return await db.select().from(siteConfig);
  }

  async getConfigByKey(key: string): Promise<SiteConfig | undefined> {
    const [result] = await db.select().from(siteConfig).where(eq(siteConfig.key, key));
    return result;
  }

  async updateConfig(key: string, value: string): Promise<SiteConfig> {
    const existing = await this.getConfigByKey(key);
    if (existing) {
      const [result] = await db.update(siteConfig).set({ value }).where(eq(siteConfig.key, key)).returning();
      return result;
    }
    const id = randomUUID();
    const [result] = await db.insert(siteConfig).values({ id, key, value }).returning();
    return result;
  }

  // Instrument Recommendations
  async getInstrumentRecommendations(category?: string): Promise<InstrumentRecommendation[]> {
    if (category) {
      return await db.select().from(instrumentRecommendations)
        .where(eq(instrumentRecommendations.category, category))
        .orderBy(asc(instrumentRecommendations.displayOrder));
    }
    return await db.select().from(instrumentRecommendations).orderBy(asc(instrumentRecommendations.displayOrder));
  }

  async createInstrumentRecommendation(rec: InsertInstrumentRecommendation): Promise<InstrumentRecommendation> {
    const id = randomUUID();
    const [result] = await db.insert(instrumentRecommendations).values({ id, ...rec }).returning();
    return result;
  }

  async updateInstrumentRecommendation(id: string, rec: Partial<InsertInstrumentRecommendation>): Promise<InstrumentRecommendation | undefined> {
    const [result] = await db.update(instrumentRecommendations).set(rec).where(eq(instrumentRecommendations.id, id)).returning();
    return result;
  }

  async deleteInstrumentRecommendation(id: string): Promise<boolean> {
    const result = await db.delete(instrumentRecommendations).where(eq(instrumentRecommendations.id, id)).returning();
    return result.length > 0;
  }

  // OBS Guide Content
  async getObsGuideContent(section?: string): Promise<ObsGuideContent[]> {
    if (section) {
      return await db.select().from(obsGuideContent)
        .where(eq(obsGuideContent.section, section))
        .orderBy(asc(obsGuideContent.displayOrder));
    }
    return await db.select().from(obsGuideContent).orderBy(asc(obsGuideContent.displayOrder));
  }

  async createObsGuideContent(content: InsertObsGuideContent): Promise<ObsGuideContent> {
    const id = randomUUID();
    const [result] = await db.insert(obsGuideContent).values({ id, ...content }).returning();
    return result;
  }

  async updateObsGuideContent(id: string, content: Partial<InsertObsGuideContent>): Promise<ObsGuideContent | undefined> {
    const [result] = await db.update(obsGuideContent).set(content).where(eq(obsGuideContent.id, id)).returning();
    return result;
  }

  async deleteObsGuideContent(id: string): Promise<boolean> {
    const result = await db.delete(obsGuideContent).where(eq(obsGuideContent.id, id)).returning();
    return result.length > 0;
  }

  // Page Settings
  async getPageSettings(): Promise<PageSetting[]> {
    return await db.select().from(pageSettings);
  }

  async getPageSetting(pageId: string): Promise<PageSetting | undefined> {
    const [result] = await db.select().from(pageSettings).where(eq(pageSettings.pageId, pageId));
    return result;
  }

  async updatePageSetting(pageId: string, visible: boolean): Promise<PageSetting> {
    const existing = await this.getPageSetting(pageId);
    if (existing) {
      const [result] = await db.update(pageSettings)
        .set({ visible, updatedAt: new Date() })
        .where(eq(pageSettings.pageId, pageId))
        .returning();
      return result;
    }
    const id = randomUUID();
    const [result] = await db.insert(pageSettings).values({
      id,
      pageId,
      visible,
      updatedAt: new Date(),
    }).returning();
    return result;
  }

  // Shareable Links
  async getShareableLinks(): Promise<ShareableLink[]> {
    return await db.select().from(shareableLinks).orderBy(desc(shareableLinks.createdAt));
  }

  async getShareableLinkByCode(code: string): Promise<ShareableLink | undefined> {
    const [result] = await db.select().from(shareableLinks).where(eq(shareableLinks.code, code));
    return result;
  }

  async createShareableLink(link: InsertShareableLink): Promise<ShareableLink> {
    const id = randomUUID();
    const [result] = await db.insert(shareableLinks).values({
      id,
      ...link,
      createdAt: new Date(),
      accessCount: 0,
    }).returning();
    return result;
  }

  async deleteShareableLink(id: string): Promise<boolean> {
    const result = await db.delete(shareableLinks).where(eq(shareableLinks.id, id)).returning();
    return result.length > 0;
  }

  async incrementShareableLinkAccess(code: string): Promise<void> {
    await db.update(shareableLinks)
      .set({ accessCount: sql`${shareableLinks.accessCount} + 1` })
      .where(eq(shareableLinks.code, code));
  }

  // Marketplace Users
  async getUserByPhone(phone: string): Promise<User | undefined> {
    const [result] = await db.select().from(users).where(eq(users.phone, phone));
    return result;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isAdmin, false));
  }

  async updateUser(id: string, data: Partial<{ displayName: string; phone: string; city: string; bio: string }>): Promise<User | undefined> {
    const [result] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result;
  }

  async banUser(id: string, banned: boolean): Promise<User | undefined> {
    const [result] = await db.update(users).set({ isBanned: banned }).where(eq(users.id, id)).returning();
    return result;
  }

  // Marketplace Listings
  async getMarketplaceListings(filters: {
    category?: string;
    condition?: string;
    city?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    sort?: string;
    status?: string;
  }): Promise<MarketplaceListing[]> {
    const conditions = [];

    const statusFilter = filters.status || "active";
    conditions.push(eq(marketplaceListings.status, statusFilter));

    if (filters.category) {
      conditions.push(eq(marketplaceListings.category, filters.category));
    }
    if (filters.condition) {
      conditions.push(eq(marketplaceListings.condition, filters.condition));
    }
    if (filters.city) {
      conditions.push(eq(marketplaceListings.city, filters.city));
    }
    if (filters.priceMin !== undefined) {
      conditions.push(gte(marketplaceListings.price, filters.priceMin));
    }
    if (filters.priceMax !== undefined) {
      conditions.push(lte(marketplaceListings.price, filters.priceMax));
    }
    if (filters.search) {
      conditions.push(
        or(
          ilike(marketplaceListings.title, `%${filters.search}%`),
          ilike(marketplaceListings.description, `%${filters.search}%`)
        )
      );
    }

    const sort = filters.sort || "newest";
    let orderBy;
    if (sort === "price_low") {
      orderBy = asc(marketplaceListings.price);
    } else if (sort === "price_high") {
      orderBy = desc(marketplaceListings.price);
    } else {
      orderBy = desc(marketplaceListings.createdAt);
    }

    return await db.select().from(marketplaceListings).where(and(...conditions)).orderBy(orderBy);
  }

  async getMarketplaceListing(id: string): Promise<MarketplaceListing | undefined> {
    const [result] = await db.select().from(marketplaceListings).where(eq(marketplaceListings.id, id));
    return result;
  }

  async getListingsBySeller(sellerId: string): Promise<MarketplaceListing[]> {
    return await db.select().from(marketplaceListings).where(eq(marketplaceListings.sellerId, sellerId));
  }

  async getPendingListings(): Promise<MarketplaceListing[]> {
    return await db.select().from(marketplaceListings).where(eq(marketplaceListings.status, "pending"));
  }

  async createMarketplaceListing(listing: InsertMarketplaceListing & { sellerId: string; city: string }): Promise<MarketplaceListing> {
    const id = randomUUID();
    const now = new Date();
    const [result] = await db.insert(marketplaceListings).values({
      id,
      sellerId: listing.sellerId,
      title: listing.title,
      category: listing.category,
      condition: listing.condition,
      price: listing.price,
      description: listing.description ?? null,
      imageUrls: listing.imageUrls ?? null,
      city: listing.city,
      status: "pending",
      viewCount: 0,
      createdAt: now,
      updatedAt: now,
      videoUrl: listing.videoUrl ?? null,
      imageLabels: listing.imageLabels ?? null,
      newMarketPrice: listing.newMarketPrice ?? null,
      amazonProductLink: listing.amazonProductLink ?? null,
      bajaaoProductLink: listing.bajaaoProductLink ?? null,
      gearHealthCosmeticScore: listing.gearHealthCosmeticScore ?? null,
      gearHealthElectronicsWorking: listing.gearHealthElectronicsWorking ?? null,
      gearHealthOriginalAccessories: listing.gearHealthOriginalAccessories ?? null,
      gearHealthOriginalBox: listing.gearHealthOriginalBox ?? null,
      gearHealthWarrantyMonths: listing.gearHealthWarrantyMonths ?? null,
    }).returning();
    return result;
  }

  async updateMarketplaceListing(id: string, data: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing | undefined> {
    const [result] = await db.update(marketplaceListings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return result;
  }

  async updateListingStatus(id: string, status: string): Promise<MarketplaceListing | undefined> {
    const [result] = await db.update(marketplaceListings)
      .set({ status, updatedAt: new Date() })
      .where(eq(marketplaceListings.id, id))
      .returning();
    return result;
  }

  async deleteMarketplaceListing(id: string): Promise<boolean> {
    const result = await db.delete(marketplaceListings).where(eq(marketplaceListings.id, id)).returning();
    return result.length > 0;
  }

  async incrementListingViewCount(id: string): Promise<void> {
    await db.update(marketplaceListings)
      .set({ viewCount: sql`${marketplaceListings.viewCount} + 1` })
      .where(eq(marketplaceListings.id, id));
  }

  async getMarketplaceStats(): Promise<{
    totalListings: number;
    pendingListings: number;
    activeListings: number;
    soldListings: number;
    totalUsers: number;
    bannedUsers: number;
  }> {
    const allListings = await db.select().from(marketplaceListings);
    const allUsers = await db.select().from(users).where(eq(users.isAdmin, false));
    return {
      totalListings: allListings.length,
      pendingListings: allListings.filter(l => l.status === "pending").length,
      activeListings: allListings.filter(l => l.status === "active").length,
      soldListings: allListings.filter(l => l.status === "sold").length,
      totalUsers: allUsers.length,
      bannedUsers: allUsers.filter(u => u.isBanned).length,
    };
  }

  // Zoom Verification Slots
  async getAvailableZoomSlots(): Promise<ZoomVerificationSlot[]> {
    return await db.select().from(zoomVerificationSlots).where(eq(zoomVerificationSlots.isAvailable, true));
  }

  async getAllZoomSlots(): Promise<ZoomVerificationSlot[]> {
    return await db.select().from(zoomVerificationSlots);
  }

  async createZoomSlot(slot: InsertZoomSlot): Promise<ZoomVerificationSlot> {
    const id = randomUUID();
    const [result] = await db.insert(zoomVerificationSlots).values({
      id,
      date: slot.date,
      timeSlot: slot.timeSlot,
      zoomAccount: slot.zoomAccount,
      zoomLink: slot.zoomLink ?? null,
      isAvailable: slot.isAvailable ?? true,
      createdAt: new Date(),
    }).returning();
    return result;
  }

  async deleteZoomSlot(id: string): Promise<boolean> {
    const result = await db.delete(zoomVerificationSlots).where(eq(zoomVerificationSlots.id, id)).returning();
    return result.length > 0;
  }

  async markSlotUnavailable(id: string): Promise<void> {
    await db.update(zoomVerificationSlots)
      .set({ isAvailable: false })
      .where(eq(zoomVerificationSlots.id, id));
  }

  // Zoom Verification Requests
  async getZoomRequestsForListing(listingId: string): Promise<ZoomVerificationRequest[]> {
    return await db.select().from(zoomVerificationRequests).where(eq(zoomVerificationRequests.listingId, listingId));
  }

  async getZoomRequestsByBuyer(buyerId: string): Promise<ZoomVerificationRequest[]> {
    return await db.select().from(zoomVerificationRequests).where(eq(zoomVerificationRequests.buyerId, buyerId));
  }

  async getPendingZoomRequests(): Promise<ZoomVerificationRequest[]> {
    return await db.select().from(zoomVerificationRequests).where(eq(zoomVerificationRequests.status, "requested"));
  }

  async createZoomRequest(request: InsertZoomRequest & { buyerId: string }): Promise<ZoomVerificationRequest> {
    const id = randomUUID();
    const now = new Date();
    const [result] = await db.insert(zoomVerificationRequests).values({
      id,
      listingId: request.listingId,
      buyerId: request.buyerId,
      slotId: request.slotId,
      status: "requested",
      buyerNotes: request.buyerNotes ?? null,
      adminNotes: null,
      zoomLink: null,
      createdAt: now,
      updatedAt: now,
    }).returning();
    return result;
  }

  async updateZoomRequestStatus(id: string, status: string, zoomLink?: string, adminNotes?: string): Promise<ZoomVerificationRequest | undefined> {
    const existing = await db.select().from(zoomVerificationRequests).where(eq(zoomVerificationRequests.id, id));
    if (existing.length === 0) return undefined;

    const updateData: Record<string, any> = {
      status,
      updatedAt: new Date(),
    };
    if (zoomLink !== undefined) {
      updateData.zoomLink = zoomLink;
    }
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    const [result] = await db.update(zoomVerificationRequests)
      .set(updateData)
      .where(eq(zoomVerificationRequests.id, id))
      .returning();
    return result;
  }
}

export const dbStorage = new DatabaseStorage();
