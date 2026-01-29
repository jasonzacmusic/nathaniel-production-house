import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Percent, Gift, Star, Sparkles } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: "software" | "hardware";
  description: string;
  commission: string;
  logoPlaceholder: string;
  dealLink: string;
  featured?: boolean;
}

const partners: Partner[] = [
  {
    id: "1",
    name: "Pianoteq (Modartt)",
    type: "software",
    description: "Award-winning physically modeled virtual piano. The most realistic piano VST available. Used in our studio and classes.",
    commission: "25% Off",
    logoPlaceholder: "PT",
    dealLink: "https://modartt.com/pianoteq",
    featured: true,
  },
  {
    id: "2",
    name: "Slate Digital",
    type: "software",
    description: "Industry-standard mixing plugins including Virtual Mix Rack, FG-X, and more. Everything you need for professional mixes.",
    commission: "30% Off",
    logoPlaceholder: "SD",
    dealLink: "https://slatedigital.com",
    featured: true,
  },
  {
    id: "3",
    name: "Native Instruments",
    type: "software",
    description: "Komplete bundle with Kontakt, Massive X, and thousands of sounds. The ultimate production toolkit.",
    commission: "20% Off",
    logoPlaceholder: "NI",
    dealLink: "https://native-instruments.com",
  },
  {
    id: "4",
    name: "Waves Audio",
    type: "software",
    description: "Legendary audio plugins used on countless hit records. Compressors, EQs, and creative effects.",
    commission: "50% Off",
    logoPlaceholder: "WV",
    dealLink: "https://waves.com",
  },
  {
    id: "5",
    name: "Focusrite",
    type: "hardware",
    description: "Premium audio interfaces for home studios. Scarlett series is the industry standard for beginners.",
    commission: "15% Off",
    logoPlaceholder: "FR",
    dealLink: "https://focusrite.com",
  },
  {
    id: "6",
    name: "Audio-Technica",
    type: "hardware",
    description: "Professional microphones and headphones. AT2020 and ATH-M50x are studio essentials.",
    commission: "10% Off",
    logoPlaceholder: "AT",
    dealLink: "https://audio-technica.com",
  },
  {
    id: "7",
    name: "Presonus",
    type: "hardware",
    description: "Studio One DAW and audio interfaces. Great value for beginners with room to grow.",
    commission: "20% Off",
    logoPlaceholder: "PS",
    dealLink: "https://presonus.com",
  },
  {
    id: "8",
    name: "iZotope",
    type: "software",
    description: "Mastering and audio repair tools. Ozone and RX are industry standards for polish and cleanup.",
    commission: "30% Off",
    logoPlaceholder: "IZ",
    dealLink: "https://izotope.com",
  },
  {
    id: "9",
    name: "Reaper",
    type: "software",
    description: "Powerful, affordable DAW for recording and mixing. Full version for just $60.",
    commission: "Free Trial",
    logoPlaceholder: "RP",
    dealLink: "https://reaper.fm",
  },
  {
    id: "10",
    name: "Rogue Amoeba",
    type: "software",
    description: "Loopback and SoundSource for Mac audio routing. Essential for streaming and online lessons.",
    commission: "10% Off",
    logoPlaceholder: "RA",
    dealLink: "https://rogueamoeba.com",
  },
];

export default function Partners() {
  const softwarePartners = partners.filter((p) => p.type === "software");
  const hardwarePartners = partners.filter((p) => p.type === "hardware");
  const featuredPartners = partners.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Affiliate Partners - Software & Hardware Deals"
        description="Exclusive discounts from leading music software and hardware companies. Special student pricing on Pianoteq, Slate Digital, Native Instruments, Focusrite and more."
        path="/partners"
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Partner Deals</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Affiliate <span className="gradient-text">Partners</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Exclusive discounts from leading software and hardware companies. 
                As a Nathaniel student, you get special pricing on professional tools.
              </p>
            </div>

            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Featured Partners</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPartners.map((partner) => (
                  <Card 
                    key={partner.id} 
                    className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover-elevate"
                    data-testid={`partner-featured-${partner.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-2xl font-bold text-primary">{partner.logoPlaceholder}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-semibold">{partner.name}</h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant={partner.type === "software" ? "default" : "secondary"}>
                                  {partner.type === "software" ? "Software" : "Hardware"}
                                </Badge>
                                <Badge className="bg-green-600">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Featured
                                </Badge>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-lg px-3 py-1 bg-primary/10 border-primary/30">
                              <Percent className="h-4 w-4 mr-1" />
                              {partner.commission}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">{partner.description}</p>
                          <a href={partner.dealLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                            <Button data-testid={`button-claim-featured-${partner.id}`}>
                              <Gift className="h-4 w-4 mr-2" />
                              Claim Deal
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Software Partners</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {softwarePartners.filter(p => !p.featured).map((partner) => (
                  <Card key={partner.id} className="hover-elevate" data-testid={`partner-software-${partner.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-primary">{partner.logoPlaceholder}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{partner.name}</h3>
                          <Badge variant="outline" className="mt-1">{partner.type}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{partner.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          <Percent className="h-3 w-3 mr-1" />
                          {partner.commission}
                        </Badge>
                        <a href={partner.dealLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" data-testid={`button-claim-${partner.id}`}>
                            Claim Deal
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Hardware Partners</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hardwarePartners.map((partner) => (
                  <Card key={partner.id} className="hover-elevate" data-testid={`partner-hardware-${partner.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold">{partner.logoPlaceholder}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{partner.name}</h3>
                          <Badge variant="secondary" className="mt-1">{partner.type}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{partner.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          <Percent className="h-3 w-3 mr-1" />
                          {partner.commission}
                        </Badge>
                        <a href={partner.dealLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" data-testid={`button-claim-${partner.id}`}>
                            Claim Deal
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Want to Partner with Us?</h3>
                <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                  If you're a software or hardware company looking to reach music students and professionals, 
                  we'd love to hear from you. We have over 500 active students and growing.
                </p>
                <Button size="lg" data-testid="button-become-partner">
                  Become a Partner
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
