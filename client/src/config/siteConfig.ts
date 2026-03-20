/**
 * Site Configuration
 *
 * ADMIN: Page visibility is now controlled via the admin dashboard.
 * The API-based settings override these defaults when available.
 *
 * Quick Links appear as a floating button on the right side of the screen.
 * Set `quickLink: true` to include a page in the quick links menu.
 */

export interface PageConfig {
  id: string;
  path: string;
  label: string;
  visible: boolean;
  quickLink?: boolean;
  quickLinkIcon?: string;
  isAnchor?: boolean;
  isExternal?: boolean;
  externalUrl?: string;
  badge?: string;
}

export interface SiteConfig {
  pages: PageConfig[];
  quickLinks: {
    enabled: boolean;
    showWhatsApp: boolean;
    showCall: boolean;
    whatsAppNumber: string;
    phoneNumber: string;
  };
}

// Default page configurations (can be overridden by API)
const defaultPages: PageConfig[] = [
  {
    id: "home",
    path: "/",
    label: "Home",
    visible: true,
    quickLink: false,
  },
  {
    id: "services",
    path: "/#services",
    label: "Services",
    visible: true,
    isAnchor: true,
    quickLink: false,
  },
  {
    id: "clients",
    path: "/#clients",
    label: "Clients",
    visible: true,
    isAnchor: true,
    quickLink: false,
  },
  {
    id: "midi-visualizer",
    path: "/midi-visualizer",
    label: "MIDI Visualizer",
    visible: true,
    quickLink: true,
    quickLinkIcon: "music",
    badge: "New",
  },
  {
    id: "instruments",
    path: "/instruments",
    label: "Instruments",
    visible: true,
    quickLink: true,
    quickLinkIcon: "piano",
  },
  {
    id: "piano-guide",
    path: "/piano-guide",
    label: "Piano Guide",
    visible: true,
    quickLink: true,
    quickLinkIcon: "piano",
    badge: "New",
  },
  {
    id: "obs-guide",
    path: "/obs-guide",
    label: "OBS Guide",
    visible: true,
    quickLink: true,
    quickLinkIcon: "video",
  },
  {
    id: "marketplace",
    path: "/marketplace",
    label: "Marketplace",
    visible: true,
    quickLink: true,
    quickLinkIcon: "shopping-bag",
  },
  {
    id: "partners",
    path: "/partners",
    label: "Partners",
    visible: false,
    quickLink: false,
  },
  {
    id: "contact",
    path: "/contact",
    label: "Contact",
    visible: true,
    quickLink: true,
    quickLinkIcon: "mail",
  },
];

const siteConfig: SiteConfig = {
  pages: defaultPages,
  quickLinks: {
    enabled: true,
    showWhatsApp: true,
    showCall: true,
    whatsAppNumber: "917760456847",
    phoneNumber: "+917760456847",
  },
};

// Store for API-based page settings (overrides defaults)
let apiPageSettings: Map<string, boolean> = new Map();

// Initialize from API (call this on app load)
export async function loadPageSettings(): Promise<void> {
  try {
    const response = await fetch("/api/page-settings");
    if (response.ok) {
      const settings = await response.json();
      apiPageSettings = new Map(settings.map((s: { pageId: string; visible: boolean }) => [s.pageId, s.visible]));
    }
  } catch (error) {
    console.error("Failed to load page settings:", error);
  }
}

// Get effective visibility (API setting overrides default)
function getEffectiveVisibility(page: PageConfig): boolean {
  if (apiPageSettings.has(page.id)) {
    return apiPageSettings.get(page.id)!;
  }
  return page.visible;
}

// Helper functions for easy access
export const getVisiblePages = () =>
  siteConfig.pages.filter(page => getEffectiveVisibility(page) && !page.isAnchor && !page.isExternal);

export const getVisibleNavLinks = () =>
  siteConfig.pages.filter(page => getEffectiveVisibility(page));

export const getQuickLinkPages = () =>
  siteConfig.pages.filter(page => getEffectiveVisibility(page) && page.quickLink);

export const isPageVisible = (pageId: string): boolean => {
  const page = siteConfig.pages.find(p => p.id === pageId);
  if (!page) return false;
  return getEffectiveVisibility(page);
};

export const getPageByPath = (path: string) =>
  siteConfig.pages.find(p => p.path === path);

export const getAllPages = () => siteConfig.pages;

// For admin dashboard - get current visibility state
export const getPageVisibilityState = () => {
  return siteConfig.pages.map(page => ({
    ...page,
    visible: getEffectiveVisibility(page)
  }));
};

// Update local cache (call after admin updates)
export const updatePageVisibility = (pageId: string, visible: boolean) => {
  apiPageSettings.set(pageId, visible);
};

export default siteConfig;
