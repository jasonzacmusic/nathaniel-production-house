import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
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
  Star,
  Mic2,
  Headphones,
  Waves,
  Scissors,
  Disc3,
  PenTool,
  Video,
  Piano,
  Guitar,
  Mic,
  Music2,
  Quote,
  Building2,
  User,
  Users2,
  Church,
  Volume2
} from "lucide-react";

// Services data
const services = [
  {
    icon: Mic2,
    title: "Recording",
    description: "Equipped to record any musical instrument with professional-grade equipment. Multi-track recording available.",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    icon: Scissors,
    title: "Editing",
    description: "Tightening and reinforcing your song with time correction, pitch correction using industry-standard tools.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Headphones,
    title: "Mixing",
    description: "Experience with Country, Rock, Metal, Blues, Folk and more. Our engineers are highly regarded musicians.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Disc3,
    title: "Mastering",
    description: "Industry-standard, CD-ready products in multiple formats. Upload-ready for streaming services.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: PenTool,
    title: "Songwriting & Production",
    description: "Vocal harmony, synths, sound design, and orchestration from highly experienced musicians and producers.",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    icon: Video,
    title: "Video & Artwork",
    description: "Video recording, editing, and professional album cover design to complete your project.",
    color: "from-indigo-500/20 to-violet-500/20"
  },
];

// In-house artists/instruments
const inHouseArtists = [
  { icon: Mic, name: "Voice Over" },
  { icon: Piano, name: "Piano / Keyboard" },
  { icon: Music2, name: "Orchestration" },
  { icon: Music, name: "Arrangement" },
  { icon: Guitar, name: "Electric / Acoustic Bass" },
  { icon: Guitar, name: "Acoustic / Nylon / Electric Guitar" },
  { icon: Music2, name: "Indian & Western Flute" },
  { icon: Disc3, name: "Percussion" },
  { icon: Mic, name: "Carnatic, Hindustani & Western Vocals" },
  { icon: Users, name: "Choir" },
  { icon: Music2, name: "Trumpet" },
  { icon: Piano, name: "Melodica" },
];

// Clients data
const clients = [
  {
    name: "Lagori",
    genre: "Folk Rock",
    description: "Music that reflects the modern Indian youth. We had the opportunity of working with this energetic Folk Rock act with a variety of genres.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"
  },
  {
    name: "Bhoomi",
    genre: "Rock",
    description: "Album mixed and produced by internationally acclaimed producer Neil Kernon. We tracked Guitars, Bass and Keyboards.",
    testimonial: "Nathaniel provides an awesome and professional recording experience...we look forward to working with them on our future projects",
    author: "Sujay Harthi, Vocalist",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
  },
  {
    name: "Parvaaz",
    genre: "Psychedelic Rock Blues",
    description: "Completed work on their first EP, 'Behosh'. Punchy Rock Blues with a nice Psychedelic feel.",
    testimonial: "We got what we asked for. Thanks to Nathaniel",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400"
  },
  {
    name: "Allegro Fudge",
    genre: "Acoustic Rock",
    description: "An acoustic rock band from Bangalore. We recorded the entire album 'Maximum City' and continue to produce various singles and covers.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400"
  },
  {
    name: "Jason Zac Band",
    genre: "Instrumental",
    description: "A solo project by Jason Zachariah. Two albums - 'Back in Time' and 'Christmas Chronicles I' were produced with our in-house session artists.",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400"
  },
  {
    name: "Samuel Deepak Victor",
    genre: "Christian",
    description: "Amazing Christian Artist from Singapore. We arranged his compositions to create a raw and unique sound for the album 'Bend in the Road'.",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400"
  },
];

// Who we work with
const workWith = [
  { icon: Music, label: "Bands of Any Genre" },
  { icon: User, label: "Singer-Songwriters" },
  { icon: Mic, label: "Solo Artists" },
  { icon: Users2, label: "Choirs" },
  { icon: Church, label: "Church Musicians" },
  { icon: Volume2, label: "Voice Overs" },
];

// Resources/features
const resources = [
  {
    icon: Piano,
    title: "MIDI Visualizer",
    description: "Transform your MIDI keyboard into a visual learning tool. Real-time chord detection and effects.",
    href: "/midi-visualizer",
    isNew: true,
  },
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
];

// Equipment categories
const equipment = [
  {
    category: "Workstation",
    items: ["Digital Audio Workstation", "Mac Computers", "Focusrite & Mbox 3 Pro", "Waves, IK Multimedia"]
  },
  {
    category: "Monitoring",
    items: ["M-Audio BX 8 Deluxe", "EX-29 Headphones", "HD 380 Pro", "AKG K 240 MK II"]
  },
  {
    category: "Microphones",
    items: ["Shure Beta 52A, SM 57, 81", "Rode NT5 Matched Pair", "Blue Bluebird, Baby Bottle", "SE Electronics"]
  },
  {
    category: "Virtual Instruments",
    items: ["Native Instruments Komplete 8", "IK Multimedia Total Studio 3", "Pianoteq", "Steven Slate Drums"]
  },
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Tracks Produced" },
  { value: "100%", label: "Satisfaction" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Recording Studio & Tech Resources"
        description="State-of-the-art, fully digital recording facility offering full service production including recording, editing, mixing, mastering, and musical arrangement. Nathaniel Production House, Bangalore."
        path="/"
      />
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* About Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card/50" id="about">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                State of the Art, <span className="gradient-text">Fully Digital</span> Facility
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We are producing the cleanest, most defined sound you will find. Unlike many studios who invest
                in flashy decor and "showpiece" consoles, we have put our resources into providing the best of
                what really matters — <span className="text-foreground font-medium">the best sounding product</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="px-4 py-2 text-sm">Professional Audio Engineers</Badge>
                <Badge className="px-4 py-2 text-sm" variant="secondary">Multi-Track Recording</Badge>
                <Badge className="px-4 py-2 text-sm" variant="outline">Industry Standard Output</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-card" id="services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Full Service <span className="gradient-text">Music Production</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From initial recording to final mastering, we offer comprehensive production services
                tailored to bring your musical vision to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="group hover-elevate overflow-hidden" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} data-testid={`stat-${index}`}>
                  <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In-House Artists Section */}
        <section className="py-20 bg-background" id="artists">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">In-House Artists</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Session <span className="gradient-text">Musicians</span> Available
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Need additional instrumentation? Our talented in-house artists are ready to bring
                your vision to life with professional performances.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {inHouseArtists.map((artist, index) => (
                <Card key={index} className="group hover-elevate text-center" data-testid={`artist-${index}`}>
                  <CardContent className="p-4">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <artist.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{artist.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-20 bg-card" id="clients">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Our Clients</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Artists Who <span className="gradient-text">Trust Us</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've had the privilege of working with incredible artists across various genres,
                from folk rock to Christian music.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <Card key={index} className="group hover-elevate overflow-hidden" data-testid={`client-${index}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold">{client.name}</h3>
                      <Badge variant="secondary" className="text-xs">{client.genre}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{client.description}</p>
                    {client.testimonial && (
                      <div className="border-l-2 border-primary pl-4 mt-4">
                        <Quote className="h-4 w-4 text-primary mb-2" />
                        <p className="text-sm italic text-foreground/80">"{client.testimonial}"</p>
                        {client.author && (
                          <p className="text-xs text-muted-foreground mt-2">— {client.author}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Work With */}
        <section className="py-20 bg-gradient-to-b from-background to-card/30" id="work-with">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Open to All</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We <span className="gradient-text">Work With</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are open to all possible options. Give us a call and describe your setup
                and we'll be glad to take up your project.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {workWith.map((item, index) => (
                <Card key={index} className="hover-elevate text-center py-6">
                  <CardContent className="p-0">
                    <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <p className="text-sm font-medium">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-20 bg-card" id="equipment">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Our Setup</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Professional <span className="gradient-text">Equipment</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Industry-standard gear for professional results. From recording to mastering,
                we have the tools for exceptional sound.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipment.map((category, index) => (
                <Card key={index} className="hover-elevate" data-testid={`equipment-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-primary">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary/60 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background" id="why-us">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  The <span className="gradient-text">Trusted</span> Choice for Musicians
                </h2>
                <p className="text-muted-foreground mb-6">
                  With over 15 years of experience and a passion for music, we've built a reputation
                  for delivering exceptional quality across all genres.
                </p>
                <div className="space-y-4">
                  {[
                    "Professional Audio Engineers",
                    "International Producer Collaborations",
                    "Multi-genre expertise: Rock, Metal, Blues, Folk & more",
                    "In-house session musicians available",
                    "Industry-standard mastering for all platforms",
                    "Complete video and artwork services",
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

        {/* Featured Tool - MIDI Visualizer */}
        <section className="py-20 bg-gradient-to-b from-card to-background" id="midi-tool">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4">Featured Tool</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  MIDI Piano <span className="gradient-text">Visualizer</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Transform your MIDI keyboard into a powerful visual learning tool. Real-time chord detection,
                  staff notation, and stunning visual effects for students, teachers, and content creators.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>Zero-latency audio with 88-key visualization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>40+ chord types detected in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>Teacher Mode with camera overlay for lessons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>Fun Mode with particle effects for content creation</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link href="/midi-visualizer">
                    <Button size="lg">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <a href="https://midi.nathanielschool.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      Try It Now
                    </Button>
                  </a>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl glow-orange">
                  <img
                    src="/midi-visualizer/MIDI Visualiser.png"
                    alt="MIDI Piano Visualizer"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 bg-card" id="resources">
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
              {resources.map((feature, index) => (
                <Card key={index} className={`group hover-elevate ${feature.isNew ? 'border-primary/30 bg-primary/5' : ''}`} data-testid={`card-feature-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      {feature.isNew && (
                        <Badge className="text-xs">New</Badge>
                      )}
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create <span className="gradient-text">Something Amazing</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're an established band, a solo artist, or just starting out,
              we're here to help you achieve professional-quality sound.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" data-testid="button-cta-contact">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/917760456847" target="_blank" rel="noopener noreferrer">
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
