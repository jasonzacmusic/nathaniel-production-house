import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { SiSpotify, SiYoutube, SiInstagram, SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/logo-full.png" alt="Nathaniel School of Music" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Professional recording studio services and comprehensive tech resources for music students.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://youtube.com/@nathanielschoolofmusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
              <a 
                href="https://spotify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-spotify"
              >
                <SiSpotify className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/nathanielschoolofmusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/nathanielschoolofmusic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/instruments" className="text-muted-foreground hover:text-foreground transition-colors">
                  Buy Instruments
                </Link>
              </li>
              <li>
                <Link href="/obs-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  OBS Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Gear Marketplace
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                  Affiliate Partners
                </Link>
              </li>
              <li>
                <a 
                  href="https://nathanielschool.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Main Website <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Langford Town</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>123 Langford Road, Langford Town, Bangalore - 560025</span>
              </div>
              <div className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+919876543210" className="hover:text-foreground transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sahakar Nagar</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>456 Main Road, Sahakar Nagar, Bangalore - 560092</span>
              </div>
              <div className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+919876543211" className="hover:text-foreground transition-colors">
                  +91 98765 43211
                </a>
              </div>
              <div className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@nathanielschool.com" className="hover:text-foreground transition-colors">
                  info@nathanielschool.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nathaniel School of Music. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
