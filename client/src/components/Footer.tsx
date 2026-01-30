import { Link } from "wouter";
import { MapPin, Phone, Mail, ExternalLink, Mic2, Headphones, Disc3, Music } from "lucide-react";
import { SiSpotify, SiYoutube, SiInstagram, SiFacebook } from "react-icons/si";
import { isPageVisible } from "@/config/siteConfig";

const services = [
  { label: "Recording", href: "#services" },
  { label: "Mixing", href: "#services" },
  { label: "Mastering", href: "#services" },
  { label: "Production", href: "#services" },
  { label: "Arrangement", href: "#services" },
  { label: "Video & Artwork", href: "#services" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/logo-full.png" alt="Nathaniel Production House" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              State-of-the-art, fully digital recording facility. Full service music production
              including recording, editing, mixing, mastering, and arrangement.
            </p>
            <div className="flex gap-3">
              <a
                href="https://youtube.com/@nathanielschoolofmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                data-testid="link-youtube"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                data-testid="link-spotify"
              >
                <SiSpotify className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/nathanielschoolofmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/nathanielschoolofmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {isPageVisible("midi-visualizer") && (
                <li>
                  <Link href="/midi-visualizer" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                    MIDI Visualizer <span className="text-xs text-primary">(New)</span>
                  </Link>
                </li>
              )}
              {isPageVisible("instruments") && (
                <li>
                  <Link href="/instruments" className="text-muted-foreground hover:text-foreground transition-colors">
                    Instrument Guides
                  </Link>
                </li>
              )}
              {isPageVisible("obs-guide") && (
                <li>
                  <Link href="/obs-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                    OBS Setup Guide
                  </Link>
                </li>
              )}
              {isPageVisible("marketplace") && (
                <li>
                  <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                    Gear Marketplace
                  </Link>
                </li>
              )}
              {isPageVisible("partners") && (
                <li>
                  <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                    Partner Deals
                  </Link>
                </li>
              )}
              <li>
                <a
                  href="https://nathanielschool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Music School <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p>Langford Town, Bangalore 560025</p>
                  <p>Sahakar Nagar, Bangalore 560092</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+917760456847" className="hover:text-foreground transition-colors">
                  +91 77604 56847
                </a>
              </div>
              <div className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:music@nathanielschool.com" className="hover:text-foreground transition-colors">
                  music@nathanielschool.com
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Certifications</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">AVID Certified</span>
                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">Pro Tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Nathaniel Production House. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
