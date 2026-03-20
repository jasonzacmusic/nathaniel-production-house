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
  type InsertShareableLink
} from "../shared/schema";
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
      isAdmin: true
    });
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
    const user: User = { ...insertUser, id, isAdmin: false };
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
    const newImage: StudioImage = { ...image, id };
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
    const newVideo: Video = { ...video, id };
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
    const newListing: GearListing = { ...listing, id };
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
    const newPartner: AffiliatePartner = { ...partner, id };
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
    const newMessage: ContactMessage = { ...message, id, createdAt: new Date() };
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
    const newRec: InstrumentRecommendation = { ...rec, id };
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
    const newContent: ObsGuideContent = { ...content, id };
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
    const newLink: ShareableLink = {
      ...link,
      id,
      createdAt: new Date(),
      accessCount: 0
    };
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
}

export const storage = new MemStorage();
