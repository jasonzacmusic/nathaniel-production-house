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
  type InsertZoomRequest
} from "../shared/schema.js";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Studio Images
  getStudioImages(): Promise<StudioImage[]>;
  getStudioImage(id: string): Promise<StudioImage | undefined>;
  createStudioImage(image: InsertStudioImage): Promise<StudioImage>;
  updateStudioImage(id: string, image: Partial<InsertStudioImage>): Promise<StudioImage | undefined>;
  deleteStudioImage(id: string): Promise<boolean>;
  
  // Videos
  getVideos(category?: string): Promise<Video[]>;
  getVideo(id: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined>;
  deleteVideo(id: string): Promise<boolean>;
  
  // Gear Listings
  getGearListings(filters?: { category?: string; search?: string }): Promise<GearListing[]>;
  getGearListing(id: string): Promise<GearListing | undefined>;
  createGearListing(listing: InsertGearListing): Promise<GearListing>;
  updateGearListing(id: string, listing: Partial<InsertGearListing>): Promise<GearListing | undefined>;
  deleteGearListing(id: string): Promise<boolean>;
  
  // Affiliate Partners
  getAffiliatePartners(): Promise<AffiliatePartner[]>;
  getAffiliatePartner(id: string): Promise<AffiliatePartner | undefined>;
  createAffiliatePartner(partner: InsertAffiliatePartner): Promise<AffiliatePartner>;
  updateAffiliatePartner(id: string, partner: Partial<InsertAffiliatePartner>): Promise<AffiliatePartner | undefined>;
  deleteAffiliatePartner(id: string): Promise<boolean>;
  
  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Site Config
  getSiteConfig(): Promise<SiteConfig[]>;
  getConfigByKey(key: string): Promise<SiteConfig | undefined>;
  updateConfig(key: string, value: string): Promise<SiteConfig>;
  
  // Instrument Recommendations
  getInstrumentRecommendations(category?: string): Promise<InstrumentRecommendation[]>;
  createInstrumentRecommendation(rec: InsertInstrumentRecommendation): Promise<InstrumentRecommendation>;
  updateInstrumentRecommendation(id: string, rec: Partial<InsertInstrumentRecommendation>): Promise<InstrumentRecommendation | undefined>;
  deleteInstrumentRecommendation(id: string): Promise<boolean>;
  
  // OBS Guide Content
  getObsGuideContent(section?: string): Promise<ObsGuideContent[]>;
  createObsGuideContent(content: InsertObsGuideContent): Promise<ObsGuideContent>;
  updateObsGuideContent(id: string, content: Partial<InsertObsGuideContent>): Promise<ObsGuideContent | undefined>;
  deleteObsGuideContent(id: string): Promise<boolean>;
  
  // Page Settings
  getPageSettings(): Promise<PageSetting[]>;
  getPageSetting(pageId: string): Promise<PageSetting | undefined>;
  updatePageSetting(pageId: string, visible: boolean): Promise<PageSetting>;
  
  // Shareable Links
  getShareableLinks(): Promise<ShareableLink[]>;
  getShareableLinkByCode(code: string): Promise<ShareableLink | undefined>;
  createShareableLink(link: InsertShareableLink): Promise<ShareableLink>;
  deleteShareableLink(id: string): Promise<boolean>;
  incrementShareableLinkAccess(code: string): Promise<void>;

  // Marketplace Users
  getUserByPhone(phone: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, data: Partial<{displayName: string; phone: string; city: string; bio: string}>): Promise<User | undefined>;
  banUser(id: string, banned: boolean): Promise<User | undefined>;

  // Marketplace Listings
  getMarketplaceListings(filters: {
    category?: string;
    condition?: string;
    city?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    sort?: string;
    status?: string;
  }): Promise<MarketplaceListing[]>;
  getMarketplaceListing(id: string): Promise<MarketplaceListing | undefined>;
  getListingsBySeller(sellerId: string): Promise<MarketplaceListing[]>;
  getPendingListings(): Promise<MarketplaceListing[]>;
  createMarketplaceListing(listing: InsertMarketplaceListing & { sellerId: string; city: string }): Promise<MarketplaceListing>;
  updateMarketplaceListing(id: string, data: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing | undefined>;
  updateListingStatus(id: string, status: string): Promise<MarketplaceListing | undefined>;
  deleteMarketplaceListing(id: string): Promise<boolean>;
  incrementListingViewCount(id: string): Promise<void>;
  getMarketplaceStats(): Promise<{ totalListings: number; pendingListings: number; activeListings: number; soldListings: number; totalUsers: number; bannedUsers: number }>;

  // Zoom Verification Slots
  getAvailableZoomSlots(): Promise<ZoomVerificationSlot[]>;
  getAllZoomSlots(): Promise<ZoomVerificationSlot[]>;
  createZoomSlot(slot: InsertZoomSlot): Promise<ZoomVerificationSlot>;
  deleteZoomSlot(id: string): Promise<boolean>;
  markSlotUnavailable(id: string): Promise<void>;

  // Zoom Verification Requests
  getZoomRequestsForListing(listingId: string): Promise<ZoomVerificationRequest[]>;
  getZoomRequestsByBuyer(buyerId: string): Promise<ZoomVerificationRequest[]>;
  getPendingZoomRequests(): Promise<ZoomVerificationRequest[]>;
  createZoomRequest(request: InsertZoomRequest & { buyerId: string }): Promise<ZoomVerificationRequest>;
  updateZoomRequestStatus(id: string, status: string, zoomLink?: string, adminNotes?: string): Promise<ZoomVerificationRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private studioImages: Map<string, StudioImage>;
  private videos: Map<string, Video>;
  private gearListings: Map<string, GearListing>;
  private affiliatePartners: Map<string, AffiliatePartner>;
  private contactMessages: Map<string, ContactMessage>;
  private siteConfig: Map<string, SiteConfig>;
  private instrumentRecommendations: Map<string, InstrumentRecommendation>;
  private obsGuideContent: Map<string, ObsGuideContent>;
  private pageSettings: Map<string, PageSetting>;
  private shareableLinks: Map<string, ShareableLink>;
  private marketplaceListings: Map<string, MarketplaceListing>;
  private zoomSlots: Map<string, ZoomVerificationSlot>;
  private zoomRequests: Map<string, ZoomVerificationRequest>;

  constructor() {
    this.users = new Map();
    this.studioImages = new Map();
    this.videos = new Map();
    this.gearListings = new Map();
    this.affiliatePartners = new Map();
    this.contactMessages = new Map();
    this.siteConfig = new Map();
    this.instrumentRecommendations = new Map();
    this.obsGuideContent = new Map();
    this.pageSettings = new Map();
    this.shareableLinks = new Map();
    this.marketplaceListings = new Map();
    this.zoomSlots = new Map();
    this.zoomRequests = new Map();

    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample studio images
    const sampleImages: StudioImage[] = [
      { id: "1", url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800", caption: "Main Control Room", displayOrder: 1, feature: "SSL Console & Genelec Monitors" },
      { id: "2", url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800", caption: "Live Recording Room", displayOrder: 2, feature: "Acoustic Treatment & Isolation Booth" },
      { id: "3", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", caption: "Vocal Booth", displayOrder: 3, feature: "Neumann U87 & Reflection Filter" },
    ];
    sampleImages.forEach(img => this.studioImages.set(img.id, img));

    // Sample videos
    const sampleVideos: Video[] = [
      { id: "1", title: "How to Buy Your First Digital Piano", youtubeId: "ov8mojWB-j0", category: "piano_tutorial", thumbnail: null },
      { id: "2", title: "Acoustic vs Digital Piano Comparison", youtubeId: "uiDMZcwmnxk", category: "piano_tutorial", thumbnail: null },
      { id: "3", title: "Online Music Lessons Part 1", youtubeId: "ugY4dTJiwxM", category: "obs_guide", thumbnail: null },
      { id: "4", title: "Best Zoom Settings Part 2", youtubeId: "2O0CqcfJb9I", category: "obs_guide", thumbnail: null },
      { id: "5", title: "OBS Complete Guide Part 3", youtubeId: "xuCCAYiXqE4", category: "obs_guide", thumbnail: null },
    ];
    sampleVideos.forEach(vid => this.videos.set(vid.id, vid));

    // Sample gear listings
    const sampleGear: GearListing[] = [
      { id: "1", name: "Yamaha PSR-E373", category: "keyboards", description: "Excellent condition, barely used", price: 9500, originalPrice: 11000, imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400", amazonLink: "https://amazon.in", bajaaoLink: "https://bajaao.com", soundGlitzLink: "https://soundglitz.com", sellerId: null, isSold: false },
      { id: "2", name: "Fender CD-60S Acoustic", category: "guitars", description: "Great beginner guitar", price: 12000, originalPrice: 18000, imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400", amazonLink: "https://amazon.in", bajaaoLink: "https://bajaao.com", soundGlitzLink: "https://soundglitz.com", sellerId: null, isSold: false },
      { id: "3", name: "Audio-Technica AT2020", category: "pro_audio", description: "Condenser microphone with shock mount", price: 6500, originalPrice: 9000, imageUrl: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400", amazonLink: "https://amazon.in", bajaaoLink: "https://bajaao.com", soundGlitzLink: "https://soundglitz.com", sellerId: null, isSold: false },
    ];
    sampleGear.forEach(gear => this.gearListings.set(gear.id, gear));

    // Sample affiliate partners
    const samplePartners: AffiliatePartner[] = [
      { id: "1", name: "Pianoteq (Modartt)", logoUrl: null, type: "software", description: "Award-winning physically modeled virtual piano", commission: "25% Off", dealLink: "https://modartt.com/pianoteq" },
      { id: "2", name: "Slate Digital", logoUrl: null, type: "software", description: "Industry-standard mixing plugins", commission: "30% Off", dealLink: "https://slatedigital.com" },
      { id: "3", name: "Focusrite", logoUrl: null, type: "hardware", description: "Premium audio interfaces for home studios", commission: "15% Off", dealLink: "https://focusrite.com" },
    ];
    samplePartners.forEach(partner => this.affiliatePartners.set(partner.id, partner));

    // Site config
    const defaultConfig: SiteConfig[] = [
      { id: "1", key: "phone_langford", value: "+91 98765 43210" },
      { id: "2", key: "phone_sahakar", value: "+91 98765 43211" },
      { id: "3", key: "email", value: "info@nathanielschool.com" },
      { id: "4", key: "whatsapp", value: "https://wa.me/919876543210" },
    ];
    defaultConfig.forEach(config => this.siteConfig.set(config.key, config));
    
    // Default admin user
    this.users.set("admin", {
      id: "admin",
      username: "admin",
      email: "admin@nathanielschool.com",
      password: "nph2024admin",
      isAdmin: true,
      displayName: "Admin",
      phone: null,
      city: null,
      bio: null,
      isBanned: false,
      createdAt: new Date(),
    });

    // Sample marketplace seller
    const sampleSeller: User = {
      id: "seller1",
      username: "rahul_music",
      email: "rahul@example.com",
      password: "seller123",
      isAdmin: false,
      displayName: "Rahul Sharma",
      phone: "9876543210",
      city: "Bangalore",
      bio: "Musician and gear enthusiast based in Bangalore",
      isBanned: false,
      createdAt: new Date("2025-01-15"),
    };
    this.users.set(sampleSeller.id, sampleSeller);

    // Sample marketplace listings
    const sampleMarketplaceListings: MarketplaceListing[] = [
      {
        id: "ml1",
        sellerId: "seller1",
        title: "Yamaha PSR-E373 Keyboard",
        category: "keyboards",
        condition: "excellent",
        price: 9500,
        description: "Barely used Yamaha PSR-E373. Comes with power adapter and music stand. Great for beginners and intermediate players.",
        imageUrls: JSON.stringify(["https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600"]),
        city: "Bangalore",
        status: "active",
        viewCount: 24,
        createdAt: new Date("2025-11-10"),
        updatedAt: new Date("2025-11-10"),
        videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        imageLabels: null,
        newMarketPrice: 11000,
        amazonProductLink: "https://amazon.in/dp/B08XYZ",
        bajaaoProductLink: null,
        gearHealthCosmeticScore: 4,
        gearHealthElectronicsWorking: true,
        gearHealthOriginalAccessories: true,
        gearHealthOriginalBox: false,
        gearHealthWarrantyMonths: 6,
      },
      {
        id: "ml2",
        sellerId: "seller1",
        title: "Fender CD-60S Acoustic Guitar",
        category: "guitars",
        condition: "good",
        price: 12000,
        description: "Solid spruce top acoustic guitar. Some minor pick marks on the body but plays and sounds great. Includes gig bag.",
        imageUrls: JSON.stringify(["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600"]),
        city: "Bangalore",
        status: "active",
        viewCount: 42,
        createdAt: new Date("2025-10-20"),
        updatedAt: new Date("2025-10-20"),
        videoUrl: null,
        imageLabels: null,
        newMarketPrice: 18000,
        amazonProductLink: null,
        bajaaoProductLink: null,
        gearHealthCosmeticScore: 3,
        gearHealthElectronicsWorking: null,
        gearHealthOriginalAccessories: false,
        gearHealthOriginalBox: false,
        gearHealthWarrantyMonths: null,
      },
      {
        id: "ml3",
        sellerId: "seller1",
        title: "Harmonium - 3 Reed, 9 Stopper",
        category: "indian_classical",
        condition: "fair",
        price: 7500,
        description: "Traditional Indian harmonium in working condition. 3 reeds with 9 stoppers. Suitable for practice and light performances.",
        imageUrls: JSON.stringify(["https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600"]),
        city: "Mumbai",
        status: "active",
        viewCount: 18,
        createdAt: new Date("2025-09-15"),
        updatedAt: new Date("2025-09-15"),
        videoUrl: null,
        imageLabels: null,
        newMarketPrice: null,
        amazonProductLink: null,
        bajaaoProductLink: null,
        gearHealthCosmeticScore: null,
        gearHealthElectronicsWorking: null,
        gearHealthOriginalAccessories: null,
        gearHealthOriginalBox: null,
        gearHealthWarrantyMonths: null,
      },
      {
        id: "ml4",
        sellerId: "seller1",
        title: "Focusrite Scarlett 2i2 (3rd Gen)",
        category: "pro_audio",
        condition: "mint",
        price: 8500,
        description: "Like new Focusrite Scarlett 2i2 3rd generation USB audio interface. Used only a handful of times. Comes with original box and USB-C cable.",
        imageUrls: JSON.stringify(["https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600"]),
        city: "Bangalore",
        status: "active",
        viewCount: 56,
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2025-12-01"),
        videoUrl: null,
        imageLabels: null,
        newMarketPrice: 12000,
        amazonProductLink: null,
        bajaaoProductLink: null,
        gearHealthCosmeticScore: 5,
        gearHealthElectronicsWorking: true,
        gearHealthOriginalAccessories: true,
        gearHealthOriginalBox: true,
        gearHealthWarrantyMonths: 10,
      },
      {
        id: "ml5",
        sellerId: "seller1",
        title: "Roland TD-1DMK Electronic Drums",
        category: "drums",
        condition: "good",
        price: 28000,
        description: "Roland TD-1DMK e-drum kit with mesh heads. Great for apartment practice. Includes throne, sticks, and headphones.",
        imageUrls: JSON.stringify(["https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600"]),
        city: "Chennai",
        status: "active",
        viewCount: 33,
        createdAt: new Date("2025-11-25"),
        updatedAt: new Date("2025-11-25"),
        videoUrl: null,
        imageLabels: null,
        newMarketPrice: null,
        amazonProductLink: null,
        bajaaoProductLink: null,
        gearHealthCosmeticScore: null,
        gearHealthElectronicsWorking: null,
        gearHealthOriginalAccessories: null,
        gearHealthOriginalBox: null,
        gearHealthWarrantyMonths: null,
      },
      {
        id: "ml6",
        sellerId: "seller1",
        title: "Shure SM58 Dynamic Microphone",
        category: "accessories",
        condition: "excellent",
        price: 5500,
        description: "Industry standard vocal microphone. Practically indestructible. Includes mic clip and carry pouch.",
        imageUrls: JSON.stringify(["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600"]),
        city: "Bangalore",
        status: "pending",
        viewCount: 0,
        createdAt: new Date("2025-12-05"),
        updatedAt: new Date("2025-12-05"),
        videoUrl: null,
        imageLabels: null,
        newMarketPrice: null,
        amazonProductLink: null,
        bajaaoProductLink: null,
        gearHealthCosmeticScore: null,
        gearHealthElectronicsWorking: null,
        gearHealthOriginalAccessories: null,
        gearHealthOriginalBox: null,
        gearHealthWarrantyMonths: null,
      },
    ];
    sampleMarketplaceListings.forEach(listing => this.marketplaceListings.set(listing.id, listing));

    // Sample zoom verification slots
    const sampleSlots: ZoomVerificationSlot[] = [
      { id: "slot1", date: "2026-03-22", timeSlot: "10:00 AM - 10:30 AM", zoomAccount: "music@nathanielschool.com", zoomLink: null, isAvailable: true, createdAt: new Date() },
      { id: "slot2", date: "2026-03-22", timeSlot: "11:00 AM - 11:30 AM", zoomAccount: "tech@nathanielschool.com", zoomLink: null, isAvailable: true, createdAt: new Date() },
      { id: "slot3", date: "2026-03-23", timeSlot: "2:00 PM - 2:30 PM", zoomAccount: "music@nathanielschool.com", zoomLink: null, isAvailable: true, createdAt: new Date() },
      { id: "slot4", date: "2026-03-24", timeSlot: "10:00 AM - 10:30 AM", zoomAccount: "tech@nathanielschool.com", zoomLink: null, isAvailable: true, createdAt: new Date() },
    ];
    sampleSlots.forEach(s => this.zoomSlots.set(s.id, s));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      isAdmin: false,
      displayName: (insertUser as any).displayName ?? null,
      phone: (insertUser as any).phone ?? null,
      city: (insertUser as any).city ?? null,
      bio: (insertUser as any).bio ?? null,
      isBanned: false,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Studio Images
  async getStudioImages(): Promise<StudioImage[]> {
    return Array.from(this.studioImages.values()).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async getStudioImage(id: string): Promise<StudioImage | undefined> {
    return this.studioImages.get(id);
  }

  async createStudioImage(image: InsertStudioImage): Promise<StudioImage> {
    const id = randomUUID();
    const newImage = { ...image, id } as StudioImage;
    this.studioImages.set(id, newImage);
    return newImage;
  }

  async updateStudioImage(id: string, image: Partial<InsertStudioImage>): Promise<StudioImage | undefined> {
    const existing = this.studioImages.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...image };
    this.studioImages.set(id, updated);
    return updated;
  }

  async deleteStudioImage(id: string): Promise<boolean> {
    return this.studioImages.delete(id);
  }

  // Videos
  async getVideos(category?: string): Promise<Video[]> {
    const videos = Array.from(this.videos.values());
    if (category) {
      return videos.filter(v => v.category === category);
    }
    return videos;
  }

  async getVideo(id: string): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const id = randomUUID();
    const newVideo = { ...video, id } as Video;
    this.videos.set(id, newVideo);
    return newVideo;
  }

  async updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video | undefined> {
    const existing = this.videos.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...video };
    this.videos.set(id, updated);
    return updated;
  }

  async deleteVideo(id: string): Promise<boolean> {
    return this.videos.delete(id);
  }

  // Gear Listings
  async getGearListings(filters?: { category?: string; search?: string }): Promise<GearListing[]> {
    let listings = Array.from(this.gearListings.values()).filter(g => !g.isSold);
    
    if (filters?.category && filters.category !== "all") {
      listings = listings.filter(g => g.category === filters.category);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      listings = listings.filter(g => 
        g.name.toLowerCase().includes(searchLower) || 
        g.description?.toLowerCase().includes(searchLower)
      );
    }
    
    return listings;
  }

  async getGearListing(id: string): Promise<GearListing | undefined> {
    return this.gearListings.get(id);
  }

  async createGearListing(listing: InsertGearListing): Promise<GearListing> {
    const id = randomUUID();
    const newListing = { ...listing, id } as GearListing;
    this.gearListings.set(id, newListing);
    return newListing;
  }

  async updateGearListing(id: string, listing: Partial<InsertGearListing>): Promise<GearListing | undefined> {
    const existing = this.gearListings.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...listing };
    this.gearListings.set(id, updated);
    return updated;
  }

  async deleteGearListing(id: string): Promise<boolean> {
    return this.gearListings.delete(id);
  }

  // Affiliate Partners
  async getAffiliatePartners(): Promise<AffiliatePartner[]> {
    return Array.from(this.affiliatePartners.values());
  }

  async getAffiliatePartner(id: string): Promise<AffiliatePartner | undefined> {
    return this.affiliatePartners.get(id);
  }

  async createAffiliatePartner(partner: InsertAffiliatePartner): Promise<AffiliatePartner> {
    const id = randomUUID();
    const newPartner = { ...partner, id } as AffiliatePartner;
    this.affiliatePartners.set(id, newPartner);
    return newPartner;
  }

  async updateAffiliatePartner(id: string, partner: Partial<InsertAffiliatePartner>): Promise<AffiliatePartner | undefined> {
    const existing = this.affiliatePartners.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...partner };
    this.affiliatePartners.set(id, updated);
    return updated;
  }

  async deleteAffiliatePartner(id: string): Promise<boolean> {
    return this.affiliatePartners.delete(id);
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const newMessage = { ...message, id, createdAt: new Date() } as ContactMessage;
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  // Site Config
  async getSiteConfig(): Promise<SiteConfig[]> {
    return Array.from(this.siteConfig.values());
  }

  async getConfigByKey(key: string): Promise<SiteConfig | undefined> {
    return this.siteConfig.get(key);
  }

  async updateConfig(key: string, value: string): Promise<SiteConfig> {
    const existing = this.siteConfig.get(key);
    if (existing) {
      const updated = { ...existing, value };
      this.siteConfig.set(key, updated);
      return updated;
    }
    const id = randomUUID();
    const newConfig: SiteConfig = { id, key, value };
    this.siteConfig.set(key, newConfig);
    return newConfig;
  }

  // Instrument Recommendations
  async getInstrumentRecommendations(category?: string): Promise<InstrumentRecommendation[]> {
    const recs = Array.from(this.instrumentRecommendations.values());
    if (category) {
      return recs.filter(r => r.category === category).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
    return recs.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async createInstrumentRecommendation(rec: InsertInstrumentRecommendation): Promise<InstrumentRecommendation> {
    const id = randomUUID();
    const newRec = { ...rec, id } as InstrumentRecommendation;
    this.instrumentRecommendations.set(id, newRec);
    return newRec;
  }

  async updateInstrumentRecommendation(id: string, rec: Partial<InsertInstrumentRecommendation>): Promise<InstrumentRecommendation | undefined> {
    const existing = this.instrumentRecommendations.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...rec };
    this.instrumentRecommendations.set(id, updated);
    return updated;
  }

  async deleteInstrumentRecommendation(id: string): Promise<boolean> {
    return this.instrumentRecommendations.delete(id);
  }

  // OBS Guide Content
  async getObsGuideContent(section?: string): Promise<ObsGuideContent[]> {
    const content = Array.from(this.obsGuideContent.values());
    if (section) {
      return content.filter(c => c.section === section).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
    return content.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async createObsGuideContent(content: InsertObsGuideContent): Promise<ObsGuideContent> {
    const id = randomUUID();
    const newContent = { ...content, id } as ObsGuideContent;
    this.obsGuideContent.set(id, newContent);
    return newContent;
  }

  async updateObsGuideContent(id: string, content: Partial<InsertObsGuideContent>): Promise<ObsGuideContent | undefined> {
    const existing = this.obsGuideContent.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...content };
    this.obsGuideContent.set(id, updated);
    return updated;
  }

  async deleteObsGuideContent(id: string): Promise<boolean> {
    return this.obsGuideContent.delete(id);
  }
  
  // Page Settings
  async getPageSettings(): Promise<PageSetting[]> {
    return Array.from(this.pageSettings.values());
  }
  
  async getPageSetting(pageId: string): Promise<PageSetting | undefined> {
    return this.pageSettings.get(pageId);
  }
  
  async updatePageSetting(pageId: string, visible: boolean): Promise<PageSetting> {
    const existing = this.pageSettings.get(pageId);
    if (existing) {
      const updated: PageSetting = { ...existing, visible, updatedAt: new Date() };
      this.pageSettings.set(pageId, updated);
      return updated;
    }
    const newSetting: PageSetting = {
      id: randomUUID(),
      pageId,
      visible,
      updatedAt: new Date()
    };
    this.pageSettings.set(pageId, newSetting);
    return newSetting;
  }
  
  // Shareable Links
  async getShareableLinks(): Promise<ShareableLink[]> {
    return Array.from(this.shareableLinks.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }
  
  async getShareableLinkByCode(code: string): Promise<ShareableLink | undefined> {
    return Array.from(this.shareableLinks.values()).find(link => link.code === code);
  }
  
  async createShareableLink(link: InsertShareableLink): Promise<ShareableLink> {
    const id = randomUUID();
    const newLink = {
      ...link,
      id,
      createdAt: new Date(),
      accessCount: 0
    } as ShareableLink;
    this.shareableLinks.set(id, newLink);
    return newLink;
  }
  
  async deleteShareableLink(id: string): Promise<boolean> {
    return this.shareableLinks.delete(id);
  }
  
  async incrementShareableLinkAccess(code: string): Promise<void> {
    const link = Array.from(this.shareableLinks.values()).find(l => l.code === code);
    if (link) {
      link.accessCount = (link.accessCount || 0) + 1;
      this.shareableLinks.set(link.id, link);
    }
  }

  // Marketplace Users
  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.phone === phone);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => !user.isAdmin);
  }

  async updateUser(id: string, data: Partial<{displayName: string; phone: string; city: string; bio: string}>): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    this.users.set(id, updated);
    return updated;
  }

  async banUser(id: string, banned: boolean): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, isBanned: banned };
    this.users.set(id, updated);
    return updated;
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
    let listings = Array.from(this.marketplaceListings.values());

    // Default to active listings unless status filter is provided
    const statusFilter = filters.status || "active";
    listings = listings.filter(l => l.status === statusFilter);

    if (filters.category) {
      listings = listings.filter(l => l.category === filters.category);
    }
    if (filters.condition) {
      listings = listings.filter(l => l.condition === filters.condition);
    }
    if (filters.city) {
      listings = listings.filter(l => l.city === filters.city);
    }
    if (filters.priceMin !== undefined) {
      listings = listings.filter(l => l.price >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      listings = listings.filter(l => l.price <= filters.priceMax!);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      listings = listings.filter(l =>
        l.title.toLowerCase().includes(searchLower) ||
        l.description?.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    const sort = filters.sort || "newest";
    if (sort === "price_low") {
      listings.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high") {
      listings.sort((a, b) => b.price - a.price);
    } else {
      // newest
      listings.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return listings;
  }

  async getMarketplaceListing(id: string): Promise<MarketplaceListing | undefined> {
    return this.marketplaceListings.get(id);
  }

  async getListingsBySeller(sellerId: string): Promise<MarketplaceListing[]> {
    return Array.from(this.marketplaceListings.values()).filter(l => l.sellerId === sellerId);
  }

  async getPendingListings(): Promise<MarketplaceListing[]> {
    return Array.from(this.marketplaceListings.values()).filter(l => l.status === "pending");
  }

  async createMarketplaceListing(listing: InsertMarketplaceListing & { sellerId: string; city: string }): Promise<MarketplaceListing> {
    const id = randomUUID();
    const now = new Date();
    const newListing: MarketplaceListing = {
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
    };
    this.marketplaceListings.set(id, newListing);
    return newListing;
  }

  async updateMarketplaceListing(id: string, data: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing | undefined> {
    const existing = this.marketplaceListings.get(id);
    if (!existing) return undefined;
    const updated: MarketplaceListing = { ...existing, ...data, updatedAt: new Date() };
    this.marketplaceListings.set(id, updated);
    return updated;
  }

  async updateListingStatus(id: string, status: string): Promise<MarketplaceListing | undefined> {
    const existing = this.marketplaceListings.get(id);
    if (!existing) return undefined;
    const updated: MarketplaceListing = { ...existing, status, updatedAt: new Date() };
    this.marketplaceListings.set(id, updated);
    return updated;
  }

  async deleteMarketplaceListing(id: string): Promise<boolean> {
    return this.marketplaceListings.delete(id);
  }

  async incrementListingViewCount(id: string): Promise<void> {
    const existing = this.marketplaceListings.get(id);
    if (existing) {
      existing.viewCount = (existing.viewCount || 0) + 1;
      this.marketplaceListings.set(id, existing);
    }
  }

  async getMarketplaceStats(): Promise<{ totalListings: number; pendingListings: number; activeListings: number; soldListings: number; totalUsers: number; bannedUsers: number }> {
    const allListings = Array.from(this.marketplaceListings.values());
    const allUsers = Array.from(this.users.values()).filter(u => !u.isAdmin);
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
    return Array.from(this.zoomSlots.values()).filter(s => s.isAvailable);
  }

  async getAllZoomSlots(): Promise<ZoomVerificationSlot[]> {
    return Array.from(this.zoomSlots.values());
  }

  async createZoomSlot(slot: InsertZoomSlot): Promise<ZoomVerificationSlot> {
    const id = randomUUID();
    const newSlot: ZoomVerificationSlot = {
      id,
      date: slot.date,
      timeSlot: slot.timeSlot,
      zoomAccount: slot.zoomAccount,
      zoomLink: slot.zoomLink ?? null,
      isAvailable: slot.isAvailable ?? true,
      createdAt: new Date(),
    };
    this.zoomSlots.set(id, newSlot);
    return newSlot;
  }

  async deleteZoomSlot(id: string): Promise<boolean> {
    return this.zoomSlots.delete(id);
  }

  async markSlotUnavailable(id: string): Promise<void> {
    const slot = this.zoomSlots.get(id);
    if (slot) {
      slot.isAvailable = false;
      this.zoomSlots.set(id, slot);
    }
  }

  // Zoom Verification Requests
  async getZoomRequestsForListing(listingId: string): Promise<ZoomVerificationRequest[]> {
    return Array.from(this.zoomRequests.values()).filter(r => r.listingId === listingId);
  }

  async getZoomRequestsByBuyer(buyerId: string): Promise<ZoomVerificationRequest[]> {
    return Array.from(this.zoomRequests.values()).filter(r => r.buyerId === buyerId);
  }

  async getPendingZoomRequests(): Promise<ZoomVerificationRequest[]> {
    return Array.from(this.zoomRequests.values()).filter(r => r.status === "requested");
  }

  async createZoomRequest(request: InsertZoomRequest & { buyerId: string }): Promise<ZoomVerificationRequest> {
    const id = randomUUID();
    const now = new Date();
    const newRequest: ZoomVerificationRequest = {
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
    };
    this.zoomRequests.set(id, newRequest);
    return newRequest;
  }

  async updateZoomRequestStatus(id: string, status: string, zoomLink?: string, adminNotes?: string): Promise<ZoomVerificationRequest | undefined> {
    const existing = this.zoomRequests.get(id);
    if (!existing) return undefined;
    const updated: ZoomVerificationRequest = {
      ...existing,
      status,
      zoomLink: zoomLink ?? existing.zoomLink,
      adminNotes: adminNotes ?? existing.adminNotes,
      updatedAt: new Date(),
    };
    this.zoomRequests.set(id, updated);
    return updated;
  }
}

// Use DatabaseStorage when DATABASE_URL is available, otherwise fall back to MemStorage
import { dbStorage } from "./dbStorage.js";

export const storage: IStorage = process.env.DATABASE_URL ? dbStorage : new MemStorage();
