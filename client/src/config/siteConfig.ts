/**
 * Site Configuration
 *
 * ADMIN: Edit this file to control which pages are visible on the site.
 * Set `visible: false` to hide a page from navigation and routing.
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

const siteConfig: SiteConfig = {
  pages: [
    // ============================================
    // MAIN PAGES - Set visible: false to hide
    // ============================================
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
      visible: false, // Hidden for now - not fully connected to backend
      quickLink: true,
      quickLinkIcon: "shopping-bag",
    },
    {
      id: "partners",
      path: "/partners",
      label: "Partners",
      visible: false, // Hidden for now
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
  ],
  quickLinks: {
    enabled: true,
    showWhatsApp: true,
    showCall: true,
    whatsAppNumber: "917760456847",
    phoneNumber: "+917760456847",
  },
};

// Helper functions for easy access
export const getVisiblePages = () =>
  siteConfig.pages.filter(page => page.visible && !page.isAnchor && !page.isExternal);

export const getVisibleNavLinks = () =>
  siteConfig.pages.filter(page => page.visible);

export const getQuickLinkPages = () =>
  siteConfig.pages.filter(page => page.visible && page.quickLink);

export const isPageVisible = (pageId: string) => {
  const page = siteConfig.pages.find(p => p.id === pageId);
  return page?.visible ?? false;
};

export const getPageByPath = (path: string) =>
  siteConfig.pages.find(p => p.path === path);

export default siteConfig;
