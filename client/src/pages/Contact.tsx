import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ExternalLink
} from "lucide-react";

const locations = [
  {
    name: "Langford Town",
    address: "Langford Town, Bangalore, Karnataka 560025, India",
    phone: "+91 77604 56847",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0123456789!2d77.5945!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuMiJF!5e0!3m2!1sen!2sin!4v1234567890123",
  },
  {
    name: "Sahakar Nagar",
    address: "Sahakar Nagar, Bangalore, Karnataka 560092, India",
    phone: "+91 77604 56847",
    hours: "Mon-Sat: 9:00 AM - 8:00 PM",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0123456789!2d77.5945!3d13.0616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzQxLjgiTiA3N8KwMzUnNDAuMiJF!5e0!3m2!1sen!2sin!4v1234567890123",
  },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "lessons", label: "Music Lessons" },
  { value: "recording", label: "Recording Studio" },
  { value: "gear", label: "Gear Marketplace" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Technical Support" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Contact Us - Nathaniel School of Music Bangalore"
        description="Get in touch with Nathaniel School of Music. Locations in Langford Town and Sahakar Nagar, Bangalore. Contact us for music lessons, recording studio bookings, and inquiries."
        path="/contact"
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Get in Touch</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Contact <span className="gradient-text">Us</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions about lessons, recording, or our services?
                We'd love to hear from you. Reach out through any of the channels below.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-primary" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Your name" required data-testid="input-contact-name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" required data-testid="input-contact-email" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+91" data-testid="input-contact-phone" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiry-type">Inquiry Type</Label>
                          <Select data-testid="select-inquiry-type">
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" required data-testid="input-contact-subject" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          className="min-h-[150px] resize-none"
                          required
                          data-testid="input-contact-message"
                        />
                      </div>

                      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting} data-testid="button-send-message">
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Quick Contact
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="https://wa.me/917760456847"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button variant="outline" className="w-full justify-start" data-testid="button-whatsapp-contact">
                          <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
                          WhatsApp Us
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </Button>
                      </a>
                      <a href="tel:+917760456847" className="block">
                        <Button variant="outline" className="w-full justify-start" data-testid="button-call-contact">
                          <Phone className="h-4 w-4 mr-2 text-primary" />
                          +91 77604 56847
                        </Button>
                      </a>
                      <a href="mailto:music@nathanielschool.com" className="block">
                        <Button variant="outline" className="w-full justify-start" data-testid="button-email-contact">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          music@nathanielschool.com
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Business Hours</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Monday - Saturday<br />
                      9:00 AM - 8:00 PM
                    </p>
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours on business days.
                      For urgent inquiries, please call or WhatsApp us directly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">Our Locations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`location-${index}`}>
                  <div className="aspect-video bg-muted">
                    <iframe
                      src={location.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${location.name} Location`}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{location.name}</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{location.address}</span>
                      </div>
                      <div className="flex gap-3">
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-foreground transition-colors">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{location.hours}</span>
                      </div>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block"
                    >
                      <Button variant="outline">
                        Get Directions
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
