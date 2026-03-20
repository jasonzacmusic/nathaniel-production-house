import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SEOHead, { schemas } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Piano,
  CheckCircle2,
  XCircle,
  ExternalLink,
  AlertTriangle,
  Star,
  ShoppingCart,
  Music,
  Settings,
  Headphones,
  Cable,
  Volume2,
  Sliders,
  Monitor,
  Usb,
  Bluetooth,
  ArrowRight,
  Info,
  Zap,
  Target,
  Users
} from "lucide-react";
import { SiAmazon } from "react-icons/si";
import { Link } from "wouter";

const keyboardTypes = [
  {
    name: "Portable Keyboard",
    icon: Music,
    keys: "61 keys",
    price: "₹10,000 - ₹20,000",
    pros: ["Lightweight and easy to move", "Built-in speakers", "Battery powered option", "Great for beginners", "Affordable"],
    cons: ["Not weighted keys", "May lack hammer action", "Limited polyphony"],
    bestFor: "Students just starting out, casual players, those who need portability",
    recommendation: "Yamaha PSR-E373"
  },
  {
    name: "Digital Piano",
    icon: Piano,
    keys: "88 keys",
    price: "₹38,000 - ₹90,000",
    pros: ["Weighted hammer action", "Feels like real piano", "Great for serious practice", "High polyphony", "Built-in speakers"],
    cons: ["Not as portable as keyboards", "May require stand purchase"],
    bestFor: "Serious piano students, intermediate to advanced players",
    recommendation: "Yamaha P-45, Roland FP-30X"
  },
  {
    name: "Stage Piano",
    icon: Target,
    keys: "88 keys",
    price: "₹80,000 - ₹1,50,000",
    pros: ["Professional grade sounds", "Extremely portable for 88 keys", "MIDI controller capabilities", "Great for gigs and recording", "Multiple outputs"],
    cons: ["Higher cost", "May need external speakers"],
    bestFor: "Gigging musicians, studio producers, advanced players",
    recommendation: "Yamaha CK-88, Roland RD-88"
  },
  {
    name: "MIDI Controller",
    icon: Monitor,
    keys: "25-88 keys",
    price: "₹10,000 - ₹80,000",
    pros: ["Unlimited sounds via computer", "Great for production", "Can upgrade sounds through software", "Often more affordable"],
    cons: ["No built-in sounds", "Requires computer/tablet", "Latency considerations"],
    bestFor: "Music producers, those with a good computer setup, home studio use",
    recommendation: "Roland A-88, Native Instruments"
  }
];

const featuresToLookFor = [
  {
    feature: "Number of Keys",
    icon: Piano,
    importance: "Critical",
    description: "For serious piano playing, get 88 keys. Portable keyboards with 61 keys work for beginners, but you'll outgrow them. Some MIDI controllers come in 25, 49, or 61 keys for production work."
  },
  {
    feature: "Key Action",
    icon: Sliders,
    importance: "Critical",
    description: "Weighted or hammer action is essential for developing proper piano technique. Graded Hammer Action (GHA) on Yamaha keyboards makes lower keys heavier like a real piano. Synth action is fine for non-piano work."
  },
  {
    feature: "Touch Response",
    icon: Zap,
    importance: "Essential",
    description: "Touch sensitivity means the harder you press, the louder it plays. NEVER get a keyboard without touch response - it's useless for learning dynamics. Avoid keyboards that let you disable touch entirely."
  },
  {
    feature: "Polyphony",
    icon: Music,
    importance: "Important",
    description: "This is how many notes can sound simultaneously. For piano with sustain pedal, you need at least 64 notes. For layered sounds (piano + strings), get 128+. Budget keyboards with 48 may struggle with complex pieces."
  },
  {
    feature: "MIDI Connectivity",
    icon: Usb,
    importance: "Important",
    description: "USB MIDI and traditional 5-pin DIN MIDI allow you to connect to computers for recording. Most keyboards have USB; make sure you also have 5-pin MIDI out for maximum compatibility with gear."
  },
  {
    feature: "Built-in Speakers",
    icon: Volume2,
    importance: "Convenient",
    description: "Having onboard speakers means you can practice anywhere without extra gear. Stage pianos may not include speakers - check before buying. MIDI controllers have NO sounds at all."
  }
];

const ck88VsRd88Comparison = [
  { feature: "Price (India)", ck88: "~₹90,000", rd88: "~₹1,37,000", winner: "ck88" },
  { feature: "Weight", ck88: "~12.7 kg", rd88: "~13.2 kg", winner: "tie" },
  { feature: "Key Action", ck88: "Graded Hammer Standard", rd88: "PHA-4 Standard", winner: "tie" },
  { feature: "Graded Hammer Action", ck88: "Yes", rd88: "No (but has escapement)", winner: "ck88" },
  { feature: "Built-in Speakers", ck88: "Yes", rd88: "Yes", winner: "tie" },
  { feature: "Bluetooth Audio", ck88: "Yes (play Spotify through speakers)", rd88: "No", winner: "ck88" },
  { feature: "MIDI In", ck88: "Yes", rd88: "No (only MIDI Out)", winner: "ck88" },
  { feature: "Organ Drawbars", ck88: "Full dedicated drawbars", rd88: "Basic", winner: "ck88" },
  { feature: "Pitch/Mod Wheels", ck88: "Full-size, excellent feel", rd88: "Small, feels fragile", winner: "ck88" },
  { feature: "Live Sets/Patches", ck88: "3 simultaneous patches", rd88: "2 patches, basic", winner: "ck88" },
  { feature: "Battery Powered", ck88: "Yes", rd88: "No", winner: "ck88" },
  { feature: "Included Pedal", ck88: "Not included", rd88: "DP10 continuous pedal included", winner: "rd88" },
  { feature: "Included Adapter", ck88: "May not be included (check)", rd88: "Great adapter included", winner: "rd88" },
  { feature: "Chassis Depth", ck88: "14 inches (harder to reach cables)", rd88: "10 inches (compact)", winner: "rd88" },
  { feature: "Live Performance", ck88: "Excellent - more controls", rd88: "Good - simpler interface", winner: "ck88" },
  { feature: "Studio Recording", ck88: "Excellent - full MIDI", rd88: "Good", winner: "ck88" }
];

const postPurchaseChecklist = [
  {
    title: "Check Master Tuning",
    description: "Ensure your keyboard is set to A = 440 Hz. Rental or used keyboards may have been detuned. This is in the global/system settings.",
    icon: Settings
  },
  {
    title: "Find the Transpose Button",
    description: "Know where this is so you don't accidentally play in the wrong key during lessons or gigs. If you're playing C but hearing D, transpose is probably on.",
    icon: Music
  },
  {
    title: "Set Your Touch Response",
    description: "Default touch settings are often 'Normal' or 'Light' - too easy for proper technique. Set it to 'Medium' or 'Hard' so you develop strong fingers. Never use 'Touch Off'.",
    icon: Sliders
  },
  {
    title: "Test the Speakers in Stereo",
    description: "Piano is a stereo instrument. If you're using external speakers, ALWAYS use two cables panned left and right. Mono sounds 70-80% worse.",
    icon: Volume2
  },
  {
    title: "Check All Knobs and Faders",
    description: "Before you complain about sound quality, make sure EQ is flat, effects are off, and mod wheel is down. New users often tweak things accidentally.",
    icon: Sliders
  },
  {
    title: "Install Drivers if Using MIDI",
    description: "For computer connectivity, download the official Yamaha/Roland drivers. Enable the keyboard in your DAW's MIDI input settings.",
    icon: Monitor
  },
  {
    title: "Get a Proper Sustain Pedal",
    description: "Budget 'switch' pedals are useless for piano. Get a continuous/half-damper pedal: Yamaha FC3A for Yamaha keyboards, or M-Audio SP2 for universal use.",
    icon: Piano
  },
  {
    title: "Test with MIDI Meter Tool",
    description: "Open a MIDI monitor (Piano Tech has one) and tap your keyboard. Check for false signals. Used keyboards sometimes send phantom MIDI from worn controls.",
    icon: Settings
  }
];

const optimizationTips = [
  {
    title: "Explore ALL Tone Presets",
    description: "Before you decide your piano sounds bad, check every preset. Many keyboards have 10+ piano sounds - Grand, Bright, Jazz, Pop, Intimate. The default may not be the best one.",
    icon: Music
  },
  {
    title: "Adjust Touch/Velocity Curve",
    description: "This is the #1 reason people hate their piano. Go to Global Settings > Velocity Map. Try 'Hard 1' to 'Hard 3' for better dynamics. Never use 'Light' or 'Easy' - they make Kurzweils sound crappy.",
    icon: Sliders
  },
  {
    title: "Use Stereo Output - Always",
    description: "Piano is designed for stereo. Using one cable (mono) kills 70-80% of the sound quality. Use two cables, pan them left and right on your mixer. For headphones, use a quality pair.",
    icon: Cable
  },
  {
    title: "Check Your Speakers",
    description: "Built-in speakers on furniture pianos often sound worse than a lightweight stage piano's speakers. Try good headphones to test if the problem is the speaker or the keyboard.",
    icon: Volume2
  },
  {
    title: "Consider Piano Tech or Virtual Instruments",
    description: "If your keyboard feels great but sounds bad, connect it via MIDI/USB to a computer running Piano Tech (Modartt). You bypass the onboard sounds completely and get studio-quality piano.",
    icon: Monitor
  },
  {
    title: "Room Acoustics Matter",
    description: "Bass builds up in corners. Move your piano away from walls. A carpet and some absorption panels can dramatically improve how your piano sounds in the room.",
    icon: Settings
  }
];

const recommendedKeyboards = [
  {
    category: "Under ₹20,000 (Budget)",
    keyboards: [
      { name: "Yamaha PSR-E373", price: "₹14,000-16,000", keys: "61", notes: "Best beginner keyboard. Touch response, built-in speakers, MIDI out.", amazonLink: "https://www.amazon.in/YAMAHA-PSR-E373-61-Keys-Portable-Keyboard/dp/B08GHXB78L" },
      { name: "Casio CT-X700", price: "₹13,000", keys: "61", notes: "Good budget alternative. Not as recommended as Yamaha.", amazonLink: "https://www.amazon.in/s?k=casio+ct-x700" }
    ]
  },
  {
    category: "₹35,000-50,000 (Entry Pro)",
    keyboards: [
      { name: "Yamaha P-45", price: "₹38,990", keys: "88", notes: "Our top recommendation for serious students. 88 weighted keys, feels like real piano.", amazonLink: "https://www.amazon.in/Yamaha-P-45B-P45B-Digital-Piano/dp/B018K1D7L4" },
      { name: "Roland FP-10", price: "₹45,000", keys: "88", notes: "Roland's entry-level 88-key. Great feel and sound.", amazonLink: "https://www.amazon.in/s?k=roland+fp-10" }
    ]
  },
  {
    category: "₹70,000-1,00,000 (Intermediate/Pro)",
    keyboards: [
      { name: "Roland FP-30X", price: "₹72,990", keys: "88", notes: "Excellent all-rounder. 256 polyphony, Bluetooth, great feel.", amazonLink: "https://www.amazon.in/Roland-FP-30X-Digital-Piano-Black/dp/B08SBZW46G" },
      { name: "Yamaha CK-88", price: "₹89,990", keys: "88", notes: "Incredible stage piano. Great for gigs AND studio. Battery powered, Bluetooth.", amazonLink: "https://www.amazon.in/s?k=yamaha+ck88" },
      { name: "Kurzweil SP6", price: "₹85,000", keys: "88", notes: "Incredible piano sounds. Great for studio work. Jason's studio keyboard.", amazonLink: "https://www.amazon.in/s?k=kurzweil+sp6" }
    ]
  },
  {
    category: "Above ₹1,00,000 (Professional)",
    keyboards: [
      { name: "Roland RD-88", price: "₹1,37,847", keys: "88", notes: "Industry standard stage piano. Comes with great pedal and adapter. Compact design.", amazonLink: "https://www.amazon.in/Roland-Professional-Stage-88-Key-RD-88/dp/B083Z72KJM" },
      { name: "Kurzweil K2600/PC4", price: "₹1,50,000+", keys: "88", notes: "Workstation with incredible sounds. For serious professionals.", amazonLink: "https://www.amazon.in/s?k=kurzweil+pc4" }
    ]
  }
];

const essentialAccessories = [
  {
    name: "Sustain Pedal",
    recommendation: "Yamaha FC3A or M-Audio SP2",
    price: "₹1,500 - ₹3,000",
    notes: "Get a continuous/half-damper pedal, NOT a switch pedal. The FC3A is perfect for Yamaha; SP2 is universal.",
    priority: "Essential"
  },
  {
    name: "Keyboard Stand",
    recommendation: "X-stand or Z-stand",
    price: "₹1,500 - ₹4,000",
    notes: "X-stands are portable; Z-stands are more stable. Height should allow wrists to be level with keys.",
    priority: "Essential"
  },
  {
    name: "Headphones",
    recommendation: "Audio-Technica ATH-M50x",
    price: "₹10,000 - ₹15,000",
    notes: "Closed-back for isolation. Listen in stereo to hear the full piano sound.",
    priority: "Recommended"
  },
  {
    name: "Instrument Cables",
    recommendation: "Two 1/4\" TRS cables",
    price: "₹800 - ₹1,500 for pair",
    notes: "ALWAYS use two cables for stereo output. Never go mono with piano.",
    priority: "Essential for gigs"
  },
  {
    name: "Keyboard Bag",
    recommendation: "Padded gig bag with backpack straps",
    price: "₹3,000 - ₹6,000",
    notes: "Get a waterproof, padded bag. Essential for transporting your investment.",
    priority: "Recommended"
  },
  {
    name: "Music Stand",
    recommendation: "Sturdy folding stand",
    price: "₹800 - ₹1,500",
    notes: "Many keyboards include a notation stand holder but not the stand itself.",
    priority: "Optional"
  }
];

const whatToAvoid = [
  {
    item: "Arranger Keyboards",
    reason: "Too many buttons, drums can start playing unexpectedly during performances. Scary on stage. Use a DAW instead for arrangements."
  },
  {
    item: "Furniture Pianos with Cheap Wood",
    reason: "Heavy, impossible to transport, wood cracks easily, and they often don't sound better than a good portable keyboard."
  },
  {
    item: "Clavinovas (for portability)",
    reason: "Supremely heavy, need labor to move. Great if it stays in one place forever, but not practical for gigs or moving."
  },
  {
    item: "Switch/Fake Sustain Pedals",
    reason: "They look like piano pedals but are just on/off switches. No half-damper capability. Get a continuous pedal."
  },
  {
    item: "Keyboards with Touch Off",
    reason: "If a keyboard can disable touch response completely, students will never develop proper dynamics and finger strength."
  },
  {
    item: "Mono Output",
    reason: "Piano is stereo. Using one cable destroys 70-80% of the sound quality. Always use two cables."
  }
];

export default function PianoGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Complete Piano Buying Guide 2026 - Yamaha CK-88 vs Roland RD-88"
        description="Comprehensive guide to buying digital pianos and keyboards in India. Yamaha CK-88 vs Roland RD-88 comparison, touch response settings, sustain pedals, and expert recommendations by price tier."
        path="/piano-guide"
        keywords="yamaha ck-88 vs roland rd-88, best digital piano india 2026, piano buying guide, weighted keyboard india, sustain pedal guide, digital piano comparison, keyboard for music students"
        jsonLd={[
          schemas.breadcrumb([{ name: "Home", url: "/" }, { name: "Instruments", url: "/instruments" }, { name: "Piano Guide", url: "/piano-guide" }]),
          schemas.article("Complete Piano Buying Guide 2026", "Expert guide to choosing the right digital piano or keyboard. Includes Yamaha CK-88 vs Roland RD-88 comparison.", "/piano-guide"),
          schemas.faq([
            { q: "Yamaha CK-88 vs Roland RD-88 - which is better?", a: "Both are excellent 88-key stage pianos. The CK-88 offers built-in speakers and lighter weight, while the RD-88 has superior piano sounds and weighted action. Choose CK-88 for portability, RD-88 for studio feel." },
            { q: "What sustain pedal should I buy for my digital piano?", a: "Avoid cheap on/off sustain pedals. Invest in a half-damper compatible pedal like the Yamaha FC3A or Roland DP-10 for realistic sustain control." },
            { q: "How much should I spend on my first digital piano?", a: "Budget ₹15,000-25,000 for beginners, ₹30,000-60,000 for intermediate, and ₹60,000+ for professional-grade keyboards." },
          ]),
        ]}
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">Complete Guide</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                How to Buy a <span className="gradient-text">Digital Piano</span>
              </h1>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Expert guidance from 25+ years of playing, teaching, and buying keyboards.
                This guide will help you choose the right instrument, set it up correctly, and
                optimize what you already have. No sales pitch - just honest advice.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                By Jason Zach, Piano Faculty at Nathaniel School of Music
              </p>
            </div>
          </div>
        </section>

        <Tabs defaultValue="types" className="container mx-auto px-4 py-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8 h-auto gap-1">
            <TabsTrigger value="types" className="text-xs sm:text-sm" data-testid="tab-types">
              <Piano className="w-4 h-4 mr-1 hidden sm:inline" />
              Types
            </TabsTrigger>
            <TabsTrigger value="features" className="text-xs sm:text-sm" data-testid="tab-features">
              <Settings className="w-4 h-4 mr-1 hidden sm:inline" />
              Features
            </TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs sm:text-sm" data-testid="tab-comparison">
              <Sliders className="w-4 h-4 mr-1 hidden sm:inline" />
              CK-88 vs RD-88
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-xs sm:text-sm" data-testid="tab-setup">
              <CheckCircle2 className="w-4 h-4 mr-1 hidden sm:inline" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="optimize" className="text-xs sm:text-sm" data-testid="tab-optimize">
              <Zap className="w-4 h-4 mr-1 hidden sm:inline" />
              Optimize
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs sm:text-sm" data-testid="tab-recommendations">
              <Star className="w-4 h-4 mr-1 hidden sm:inline" />
              Buy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="types" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Types of Keyboards</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding the difference between keyboard types is the first step to making the right purchase.
                Each type serves different needs and budgets.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {keyboardTypes.map((type, index) => (
                <Card key={index} className="overflow-hidden" data-testid={`card-keyboard-type-${index}`}>
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <type.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{type.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{type.keys} | {type.price}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-green-500 mb-2">Pros</h4>
                      <ul className="space-y-1">
                        {type.pros.map((pro, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-red-500 mb-2">Cons</h4>
                      <ul className="space-y-1">
                        {type.cons.map((con, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm"><strong>Best for:</strong> {type.bestFor}</p>
                      <Badge className="mt-2">{type.recommendation}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">What to Avoid</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {whatToAvoid.slice(0, 4).map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium text-destructive">{item.item}:</span>{" "}
                          <span className="text-muted-foreground">{item.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Features to Look For</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Before you walk into a store or click "Buy Now," understand these features.
                They make the difference between a keyboard you love and one you'll regret.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuresToLookFor.map((item, index) => (
                <Card key={index} data-testid={`card-feature-${index}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{item.feature}</CardTitle>
                      </div>
                      <Badge variant={item.importance === "Critical" ? "default" : item.importance === "Essential" ? "secondary" : "outline"}>
                        {item.importance}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Quick Decision Guide
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">If You're a Beginner</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Get 61+ keys with touch response</li>
                      <li>Built-in speakers are essential</li>
                      <li>Yamaha PSR-E373 is perfect</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">If You're Serious About Piano</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Must have 88 weighted keys</li>
                      <li>Graded hammer action preferred</li>
                      <li>Get Yamaha P-45 minimum</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">If You're a Performer/Producer</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Stage piano with MIDI I/O</li>
                      <li>Multiple outputs essential</li>
                      <li>CK-88 or RD-88 tier</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Yamaha CK-88 vs Roland RD-88</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These two keyboards have been the industry standard stage pianos for years.
                Both fall under $1,500 USD (₹90,000-1,40,000) and I own both. Here's the honest comparison.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Why I Have Both
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One stays in my studio permanently - all cables patched, ready for production.
                  The other goes to gigs, church services, and shoots. Both are light enough for one person
                  to carry, fit in an auto, and cost less combined than a Nord or Yamaha Montage.
                  You get the best of both Yamaha and Roland engineering.
                </p>
              </CardContent>
            </Card>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    <TableHead className="text-center bg-blue-500/10">Yamaha CK-88</TableHead>
                    <TableHead className="text-center bg-red-500/10">Roland RD-88</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ck88VsRd88Comparison.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell className={`text-center ${row.winner === "ck88" ? "text-green-500 font-medium" : ""}`}>
                        {row.ck88}
                        {row.winner === "ck88" && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                      </TableCell>
                      <TableCell className={`text-center ${row.winner === "rd88" ? "text-green-500 font-medium" : ""}`}>
                        {row.rd88}
                        {row.winner === "rd88" && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-500">Choose CK-88 If...</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />You want better value for money</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />You play organ and need drawbars</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />You need Bluetooth for jamming to Spotify</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />You want 3 simultaneous patches for live sets</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />You need MIDI In for studio work</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />You want battery backup option</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />Full-size pitch/mod wheels matter to you</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-500">Choose RD-88 If...</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />You want everything included out of the box</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />You prefer a simpler, cleaner interface</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />You need the compact 10" depth for small desks</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />The DP10 continuous pedal is important</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />You prefer Roland's escapement feel</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />You want plug-and-play with great adapter</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />Budget is not a primary concern</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">The Bottom Line</h4>
                <p className="text-muted-foreground">
                  For most people, the <strong>Yamaha CK-88 offers better value</strong> with more features at a lower price.
                  However, you'll need to separately purchase a good sustain pedal (FC3A) and possibly an adapter.
                  The Roland RD-88 is ready to go out of the box but costs significantly more.
                  Either way, you're getting industry-standard quality that will last years.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Post-Purchase Checklist</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Just bought a keyboard? Don't skip these crucial checks. Many people hate their piano
                simply because they haven't set it up correctly. This applies to new AND used keyboards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {postPurchaseChecklist.map((item, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-checklist-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg h-fit">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{index + 1}. {item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-destructive/10 border-destructive/30">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Warning: Yamaha CK-88 Buyers</h4>
                    <p className="text-sm text-muted-foreground">
                      The Yamaha CK-88 does NOT come with a sustain pedal, and in India, it may not include a power adapter.
                      Ask your dealer before purchasing. Get the Yamaha FC3A pedal (not FC4A switch pedal) for proper half-damper support.
                      The Roland RD-88 includes both pedal and adapter.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimize" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Don't Discard Your Piano Yet</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Before you sell your keyboard or buy a new one, try these optimizations.
                The piano you already have might be awesome - you just don't know it yet.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {optimizationTips.map((tip, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-optimization-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <tip.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  The Piano Tech Secret
                </h4>
                <p className="text-muted-foreground mb-4">
                  If your keyboard feels great but sounds bad, here's what I do: Connect it via USB/MIDI to a computer
                  running <strong>Modartt Piano Tech</strong>. You completely bypass the onboard sounds and get studio-quality
                  piano that updates with new features. It works on Windows, Mac, and Linux.
                </p>
                <p className="text-muted-foreground">
                  Piano Tech also has a velocity curve calibration tool - play how you normally play, and it creates
                  a custom curve for your touch. This alone can transform how your keyboard responds.
                </p>
                <div className="mt-4">
                  <a href="https://www.modartt.com/pianoteq" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" data-testid="button-pianoteq">
                      Learn About Piano Tech
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Recommended Keyboards</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Based on years of experience with students and our own studio work,
                here are our honest recommendations at every price point.
              </p>
            </div>

            {recommendedKeyboards.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {category.keyboards.map((kb, kbIndex) => (
                    <Card key={kbIndex} data-testid={`card-keyboard-${catIndex}-${kbIndex}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{kb.name}</h4>
                            <p className="text-sm text-muted-foreground">{kb.keys} keys | {kb.price}</p>
                          </div>
                          <a href={kb.amazonLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" data-testid={`button-buy-${kb.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              <SiAmazon className="w-4 h-4 mr-1" />
                              Buy
                            </Button>
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">{kb.notes}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-primary" />
              Essential Accessories
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {essentialAccessories.map((acc, index) => (
                <Card key={index} data-testid={`card-accessory-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{acc.name}</h4>
                      <Badge variant={acc.priority === "Essential" ? "default" : acc.priority === "Recommended" ? "secondary" : "outline"}>
                        {acc.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">{acc.recommendation}</p>
                    <p className="text-sm text-muted-foreground mb-2">{acc.price}</p>
                    <p className="text-xs text-muted-foreground">{acc.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20 mt-8">
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">Need Personalized Advice?</h4>
                <p className="text-muted-foreground mb-4">
                  Every student's needs are different. Contact us for personalized recommendations
                  based on your budget, skill level, and goals.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/contact">
                    <Button data-testid="button-contact-piano">
                      Contact Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/instruments">
                    <Button variant="outline" data-testid="button-view-instruments">
                      View All Instruments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
