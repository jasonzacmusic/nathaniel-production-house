import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/instruments", label: "Buy Instruments" },
  { href: "/obs-guide", label: "OBS Guide" },
  { href: "/marketplace", label: "Gear Market" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo-icon.png" 
            alt="Nathaniel" 
            className="h-10 w-auto"
            data-testid="img-logo"
          />
          <div className="hidden sm:block">
            <span className="text-lg font-semibold tracking-tight">Nathaniel</span>
            <span className="block text-xs text-muted-foreground">Production House</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Button variant="outline" size="sm" data-testid="button-whatsapp">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </a>
          <a href="tel:+919876543210" className="hidden sm:flex">
            <Button size="sm" data-testid="button-call">
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </Button>
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                    <Button
                      variant={location === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <div className="border-t border-border my-4" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </a>
                <a href="tel:+919876543210">
                  <Button className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
