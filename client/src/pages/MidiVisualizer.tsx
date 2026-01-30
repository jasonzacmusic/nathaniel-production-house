import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import {
  ArrowRight,
  Play,
  Music,
  Zap,
  Camera,
  Sparkles,
  Piano,
  MonitorPlay,
  Keyboard,
  GraduationCap,
  Music2,
  Volume2,
  Settings,
  CheckCircle2,
  ExternalLink,
  Star,
  Users,
  BookOpen,
  Wand2,
  Layers,
  Eye
} from "lucide-react";

// Features list
const coreFeatures = [
  {
    icon: Zap,
    title: "Zero-Latency Audio",
    description: "Custom AudioWorklet engine runs on a dedicated audio thread, eliminating latency for perfectly synchronized sound."
  },
  {
    icon: Piano,
    title: "88-Key Visualization",
    description: "Full grand piano range with photorealistic key rendering. Each key responds to velocity for dynamic visual feedback."
  },
  {
    icon: Music2,
    title: "Smart Chord Detection",
    description: "Recognizes 40+ chord types including extended chords, altered dominants, and complex jazz voicings in real-time."
  },
  {
    icon: BookOpen,
    title: "Staff Notation",
    description: "Professional grand staff rendering with VexFlow. Notes appear with proper accidentals, ledger lines, and hand color-coding."
  },
  {
    icon: Layers,
    title: "Scale Practice Mode",
    description: "40+ scale types including modes, pentatonics, blues, and jazz scales. Filter keys to show only scale tones."
  },
  {
    icon: Volume2,
    title: "Salamander Grand Piano",
    description: "High-quality piano samples with authentic acoustic sound, velocity sensitivity, and natural sustain decay."
  },
];

// Application modes
const appModes = [
  {
    id: "standard",
    name: "Standard Mode",
    icon: Music,
    tagline: "For Daily Practice & Theory Study",
    description: "Perfect for understanding chord voicings, scale degrees, and developing your musical ear.",
    image: "/midi-visualizer/MIDI mode.png",
    features: [
      "Real-time chord detection with jazz voicing support",
      "Professional grand staff notation with VexFlow",
      "Scale practice with 40+ scale types",
      "Color-coded left/right hand visualization",
      "Sustain pedal indicator",
      "Interval display for scale degrees"
    ]
  },
  {
    id: "fun",
    name: "Fun Mode",
    icon: Sparkles,
    tagline: "For Performances & Content Creation",
    description: "Make practice engaging with stunning visual effects. Perfect for social media content and live performances.",
    image: "/midi-visualizer/Fun Mode.png",
    features: [
      "Waterfall visualization with falling note bars",
      "Particle effects and ripple animations",
      "Multiple visual presets (Visual Symphony, Harmonic Aurora, etc.)",
      "Glow effects around active notes",
      "Customizable colors and animation speeds",
      "Perfect for YouTube/Instagram content"
    ]
  },
  {
    id: "teacher",
    name: "Teacher Mode",
    icon: GraduationCap,
    tagline: "For Educators & Online Lessons",
    description: "Designed for music educators creating video content and live online lessons with camera overlay.",
    image: "/midi-visualizer/Teacher Mode.png",
    features: [
      "Camera overlay for video lessons",
      "Superimpose MIDI visualization on real piano footage",
      "Precise alignment controls for perfect overlay",
      "Professional bar styling that blends with real keys",
      "Floating panels for additional content",
      "Perfect for Zoom/YouTube teaching"
    ]
  }
];

// Benefits for different users
const benefitsForUsers = [
  {
    icon: GraduationCap,
    title: "For Students",
    benefits: [
      "Visualize what you're playing in real-time",
      "Learn chord theory with instant detection",
      "Practice scales with guided key highlighting",
      "Develop muscle memory with visual feedback",
      "Make practice sessions more engaging"
    ]
  },
  {
    icon: Users,
    title: "For Teachers",
    benefits: [
      "Create professional teaching videos",
      "Overlay MIDI on real piano footage",
      "Demonstrate concepts visually to students",
      "Enhance online lessons with visualizations",
      "Export content for educational materials"
    ]
  },
  {
    icon: MonitorPlay,
    title: "For Content Creators",
    benefits: [
      "Stunning visuals for social media",
      "Multiple preset themes to match your brand",
      "Particle effects for engaging content",
      "Perfect for piano covers and tutorials",
      "Professional-looking output without editing"
    ]
  }
];

// System requirements
const systemRequirements = [
  "Modern web browser (Chrome recommended)",
  "USB MIDI keyboard or controller",
  "Webcam (optional, for Teacher Mode)",
  "Stable internet connection (for audio samples)"
];

export default function MidiVisualizer() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="MIDI Piano Visualizer"
        description="Professional MIDI visualization tool for musicians and educators. Real-time chord detection, staff notation, and beautiful visual effects. Perfect for teaching and content creation."
        path="/midi-visualizer"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge className="mb-4 px-4 py-1.5">
                <Wand2 className="h-3 w-3 mr-1" /> Exclusive Tool
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                MIDI Piano <span className="gradient-text">Visualizer</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your MIDI keyboard into a powerful visual learning and teaching tool.
                Real-time chord detection, staff notation, and stunning visual effects.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://midi.nathanielschool.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2">
                    <Play className="h-5 w-5" /> Try It Now
                  </Button>
                </a>
                <a href="#features">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Eye className="h-5 w-5" /> See Features
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl glow-orange">
                <img
                  src="/midi-visualizer/MIDI Visualiser.png"
                  alt="MIDI Piano Visualizer"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">40+</p>
                <p className="text-sm text-muted-foreground">Chord Types Detected</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">88</p>
                <p className="text-sm text-muted-foreground">Piano Keys Visualized</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">0ms</p>
                <p className="text-sm text-muted-foreground">Audio Latency</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-1">3</p>
                <p className="text-sm text-muted-foreground">Visualization Modes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Modes */}
        <section className="py-20 bg-background" id="modes">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Three Powerful Modes</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Switch between modes designed for different use cases - practice, performance, or teaching.
              </p>
            </div>

            <Tabs defaultValue="standard" className="max-w-6xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-8">
                {appModes.map((mode) => (
                  <TabsTrigger key={mode.id} value={mode.id} className="gap-2">
                    <mode.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{mode.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {appModes.map((mode) => (
                <TabsContent key={mode.id} value={mode.id}>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <mode.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{mode.name}</h3>
                          <p className="text-sm text-primary">{mode.tagline}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">{mode.description}</p>
                      <ul className="space-y-3">
                        {mode.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-1 lg:order-2">
                      <div className="rounded-xl overflow-hidden border border-border/50 shadow-xl">
                        <img
                          src={mode.image}
                          alt={mode.name}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 bg-card" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Core Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Professional <span className="gradient-text">Tools</span> for Musicians
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with cutting-edge web audio technology for a seamless, professional experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="hover-elevate card-shine">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* MIDI Connection */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">Easy Setup</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Connect & <span className="gradient-text">Play</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Getting started is incredibly simple. Connect your MIDI keyboard, open the app,
                  and start playing. Your notes appear instantly on screen with zero configuration.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="p-2 bg-primary/10 rounded-full text-primary font-bold">1</div>
                    <div>
                      <p className="font-medium">Connect your MIDI keyboard via USB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="p-2 bg-primary/10 rounded-full text-primary font-bold">2</div>
                    <div>
                      <p className="font-medium">Open the app in Chrome and enable audio</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="p-2 bg-primary/10 rounded-full text-primary font-bold">3</div>
                    <div>
                      <p className="font-medium">Select your MIDI device and start playing</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-sm font-medium mb-2">No MIDI Keyboard?</p>
                  <p className="text-sm text-muted-foreground">
                    Use your computer keyboard! White keys: A S D F G H J K L, Black keys: W E T Y U O P.
                    Press Spacebar for sustain pedal.
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-xl">
                <img
                  src="/midi-visualizer/MIDI option.png"
                  alt="MIDI Device Selection"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Who Is It For</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perfect For <span className="gradient-text">Everyone</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {benefitsForUsers.map((user, index) => (
                <Card key={index} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <user.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{user.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {user.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4">Requirements</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  System <span className="gradient-text">Requirements</span>
                </h2>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {systemRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Visualize</span> Your Music?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Start using the MIDI Piano Visualizer today. Perfect for students, teachers,
              and content creators. No download required - works right in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://midi.nathanielschool.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <Play className="h-5 w-5" /> Launch Visualizer
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="gap-2">
                  <GraduationCap className="h-5 w-5" /> Learn More About Lessons
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
