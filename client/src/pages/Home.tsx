import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StudioShowcase from "@/components/StudioShowcase";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Music, 
  Settings, 
  ShoppingBag, 
  Users,
  CheckCircle2,
  Zap,
  Star
} from "lucide-react";

const features = [
  {
    icon: Music,
    title: "Instrument Guides",
    description: "Comprehensive buying guides for pianos, guitars, and more. Make informed decisions.",
    href: "/instruments",
  },
  {
    icon: Settings,
    title: "OBS Setup Guide",
    description: "Learn to set up professional Zoom music classes with OBS. Step-by-step tutorials.",
    href: "/obs-guide",
  },
  {
    icon: ShoppingBag,
    title: "Gear Marketplace",
    description: "Buy and sell used musical instruments within our community. Great deals await.",
    href: "/marketplace",
  },
  {
    icon: Users,
    title: "Partner Deals",
    description: "Exclusive discounts from our affiliate partners on software and hardware.",
    href: "/partners",
  },
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Tracks Produced" },
  { value: "100%", label: "Satisfaction" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Piano Student",
    content: "The OBS setup guide completely transformed my online lessons. Now I can show multiple angles!",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "Session Musician",
    content: "The gear marketplace helped me find an amazing keyboard at half the price. Great community!",
    rating: 5,
  },
  {
    name: "Arun Menon",
    role: "Music Producer",
    content: "Recording at Nathaniel was an incredible experience. Professional setup, amazing acoustics.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Recording Studio & Tech Resources"
        description="Professional recording studio services including mixing, mastering, arrangement and production. Your one-stop tech resource for music education at Nathaniel School of Music, Bangalore."
        path="/"
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        <StudioShowcase />

        <section className="py-20 bg-card" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Resources</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to <span className="gradient-text">Succeed</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From buying your first instrument to setting up professional online classes, 
                we've got you covered with comprehensive guides and resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover-elevate" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <Link href={feature.href}>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Learn More 
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} data-testid={`stat-${index}`}>
                  <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background" id="why-us">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  The <span className="gradient-text">Trusted</span> Choice for Musicians
                </h2>
                <div className="space-y-4">
                  {[
                    "Professional-grade recording equipment",
                    "Experienced engineers and producers",
                    "Comprehensive tech support for students",
                    "Active community of musicians",
                    "Exclusive partner discounts",
                    "Free educational resources",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <Link href="/contact">
                    <Button size="lg" data-testid="button-contact-hero">
                      Get in Touch
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/instruments">
                    <Button variant="outline" size="lg" data-testid="button-explore-hero">
                      Explore Resources
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">Fast Turnaround</h4>
                    <p className="text-sm text-muted-foreground">Quick delivery on all projects</p>
                  </Card>
                  <Card className="p-4">
                    <Star className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">Top Quality</h4>
                    <p className="text-sm text-muted-foreground">Industry-standard output</p>
                  </Card>
                </div>
                <div className="space-y-4 mt-8">
                  <Card className="p-4">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">Expert Team</h4>
                    <p className="text-sm text-muted-foreground">Trained professionals</p>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <Music className="h-8 w-8 text-primary mb-2" />
                    <h4 className="font-semibold">All Genres</h4>
                    <p className="text-sm text-muted-foreground">From classical to electronic</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card" id="testimonials">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="gradient-text">Community</span> Says
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover-elevate" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your <span className="gradient-text">Musical Journey</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you want to learn an instrument, record your music, or explore our resources, 
              we're here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-cta-contact">
                  Contact Us Today
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" data-testid="button-cta-whatsapp">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
