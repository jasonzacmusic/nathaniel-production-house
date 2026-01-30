import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  X,
  Phone,
  MessageCircle,
  Music,
  Piano,
  Video,
  ShoppingBag,
  Mail,
  ChevronUp,
} from "lucide-react";
import siteConfig, { getQuickLinkPages, type PageConfig } from "@/config/siteConfig";

const iconMap: Record<string, React.ReactNode> = {
  music: <Music className="h-4 w-4" />,
  piano: <Piano className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  "shopping-bag": <ShoppingBag className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

export default function QuickLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { quickLinks } = siteConfig;

  if (!quickLinks.enabled) return null;

  const quickLinkPages = getQuickLinkPages();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
            <span className="text-sm font-medium">Quick Links</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-1 min-w-[180px]">
            {/* Page Links */}
            {quickLinkPages.map((page: PageConfig) => (
              <Link key={page.id} href={page.path}>
                <Button
                  variant={location === page.path ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  {page.quickLinkIcon && iconMap[page.quickLinkIcon]}
                  {page.label}
                  {page.badge && (
                    <Badge variant="default" className="ml-auto text-xs px-1.5 py-0">
                      {page.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}

            {/* Divider */}
            {(quickLinks.showWhatsApp || quickLinks.showCall) && (
              <div className="border-t border-border my-2" />
            )}

            {/* Contact Quick Actions */}
            {quickLinks.showWhatsApp && (
              <a
                href={`https://wa.me/${quickLinks.whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            )}

            {quickLinks.showCall && (
              <a href={`tel:${quickLinks.phoneNumber}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
            )}

            {/* Scroll to Top */}
            <div className="border-t border-border mt-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={scrollToTop}
              >
                <ChevronUp className="h-4 w-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        size="lg"
        className={`rounded-full h-14 w-14 shadow-lg transition-all duration-200 ${
          isOpen
            ? "bg-muted text-muted-foreground hover:bg-muted"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
      </Button>
    </div>
  );
}
