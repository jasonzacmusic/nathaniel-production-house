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
  Guitar, 
  Wrench, 
  Headphones, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  AlertTriangle,
  Star,
  ShoppingCart
} from "lucide-react";
import { SiAmazon } from "react-icons/si";

const pianoVideos = [
  { id: "ov8mojWB-j0", title: "How to Buy Your First Digital Piano" },
  { id: "uiDMZcwmnxk", title: "Acoustic vs Digital Piano Comparison" },
  { id: "s_wsHwo4IJg", title: "Yamaha P-45 In-Depth Review" },
  { id: "P6xU9PGegag", title: "Roland RD-88 vs Yamaha CK-88" },
];

const pianoSpecs = [
  {
    name: "Yamaha PSR-E373",
    keys: "61",
    weighted: "No",
    polyphony: "48",
    price: "₹14,000 - ₹16,000",
    rating: 4,
    level: "Budget",
    amazonLink: "https://www.amazon.in/YAMAHA-PSR-E373-61-Keys-Portable-Keyboard/dp/B08GHXB78L",
    bajaaoLink: "https://www.bajaao.com/products/yamaha-psr-e363-61-key-touch-sensitive-portable-keyboard-with-adapter"
  },
  {
    name: "Yamaha P-45",
    keys: "88",
    weighted: "Yes",
    polyphony: "64",
    price: "₹38,990 - ₹44,000",
    rating: 5,
    level: "Entry Pro",
    amazonLink: "https://www.amazon.in/Yamaha-P-45B-P45B-Digital-Piano/dp/B018K1D7L4",
    bajaaoLink: "https://www.bajaao.com/products/yamaha-p45-88-key-digital-piano"
  },
  {
    name: "Roland FP-30X",
    keys: "88",
    weighted: "Yes",
    polyphony: "256",
    price: "₹72,990",
    rating: 5,
    level: "Intermediate",
    amazonLink: "https://www.amazon.in/Roland-FP-30X-Digital-Piano-Black/dp/B08SBZW46G",
    bajaaoLink: "https://www.bajaao.com/products/roland-fp-30x-digital-piano"
  },
  {
    name: "Yamaha CK-88",
    keys: "88",
    weighted: "Yes",
    polyphony: "128",
    price: "₹89,990",
    rating: 5,
    level: "Professional",
    amazonLink: "https://www.amazon.in/s?k=yamaha+ck88",
    bajaaoLink: "https://www.bajaao.com/collections/yamaha-digital-pianos"
  },
  {
    name: "Roland RD-88",
    keys: "88",
    weighted: "Yes",
    polyphony: "128",
    price: "₹1,37,847",
    rating: 5,
    level: "Professional",
    amazonLink: "https://www.amazon.in/Roland-Professional-Stage-88-Key-RD-88/dp/B083Z72KJM",
    bajaaoLink: "https://www.bajaao.com/collections/roland-digital-pianos"
  },
];

const guitarRecommendations = [
  {
    name: "Yamaha F310",
    type: "Acoustic",
    price: "₹9,500",
    description: "The most reliable entry-level acoustic. Made in India with excellent resale value. This is where every modern guitarist starts.",
    recommended: true,
    amazonLink: "https://www.amazon.in/Yamaha-F310-6-Strings-Acoustic-Natural/dp/B000RVYW7E",
    bajaaoLink: "https://www.bajaao.com/products/yamaha-f310-acoustic-guitar"
  },
  {
    name: "Yamaha FX310AII",
    type: "Semi-Acoustic",
    price: "₹15,191",
    description: "Our top recommendation. Sounds great unplugged, plug into any PA system for gigs. One guitar does everything. Buy this.",
    recommended: true,
    amazonLink: "https://www.amazon.in/Yamaha-FX310A-Electro-Acoustic-Guitar-Natural/dp/B000UH4P18",
    bajaaoLink: "https://www.bajaao.com/products/yamaha-fx310aii-dreadnought-electro-acoustic-guitar-natural"
  },
  {
    name: "Cort AD810E",
    type: "Semi-Acoustic",
    price: "₹13,500",
    description: "Solid alternative to Yamaha. Spruce top, mahogany back & sides. Great bang for buck.",
    recommended: true,
    amazonLink: "https://www.amazon.in/Cort-AD810-OP-Acoustic-Guitar-Brown/dp/B00VQ7YDCM",
    bajaaoLink: "https://www.bajaao.com/products/cort-ad810e-dreadnought-electro-acoustic-guitar"
  },
  {
    name: "Pluto HW41CE-201",
    type: "Semi-Acoustic",
    price: "₹9,500",
    description: "Acceptable for absolute budget buyers. Get this only if Yamaha/Cort are out of stock or out of budget.",
    recommended: false,
    amazonLink: "https://www.amazon.in/Pluto-HW41C-201-Acoustic-Guitar-Sunburst/dp/B0154UQNWE",
    bajaaoLink: "https://www.bajaao.com/products/pluto-hw41ce-101sp-cutway-semi-acoustic-guitar"
  },
];

const accessories = [
  {
    name: "Korg TM-60 Tuner/Metronome",
    category: "Essentials",
    price: "₹2,500",
    amazonLink: "https://amazon.in",
    bajaaoLink: "https://bajaao.com",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
  },
  {
    name: "Audio-Technica ATH-M50x",
    category: "Headphones",
    price: "₹12,000",
    amazonLink: "https://amazon.in",
    bajaaoLink: "https://bajaao.com",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=300",
  },
  {
    name: "Sustain Pedal (Universal)",
    category: "Piano Accessories",
    price: "₹1,200",
    amazonLink: "https://amazon.in",
    bajaaoLink: "https://bajaao.com",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300",
  },
  {
    name: "Guitar Capo",
    category: "Guitar Accessories",
    price: "₹500",
    amazonLink: "https://amazon.in",
    bajaaoLink: "https://bajaao.com",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300",
  },
  {
    name: "Music Stand",
    category: "Essentials",
    price: "₹800",
    amazonLink: "https://amazon.in",
    bajaaoLink: "https://bajaao.com",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300",
  },
  {
    name: "Instrument Cable (3m)",
    category: "Cables",
    price: "₹400",
    amazonLink: "https://amazon.in",
    bajaaoLink: "https://bajaao.com",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
  },
];

export default function Instruments() {
  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/instruments#${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Instrument Buying Guide - Piano, Guitar & Accessories"
        description="Comprehensive buying guides for digital pianos, keyboards, acoustic guitars, and music accessories. Expert recommendations from Nathaniel School of Music teachers in Bangalore."
        path="/instruments"
        keywords="buy digital piano india, keyboard buying guide, acoustic guitar guide, music accessories bangalore, best piano for beginners, yamaha keyboard india, roland piano comparison"
        jsonLd={[
          schemas.breadcrumb([{ name: "Home", url: "/" }, { name: "Instruments", url: "/instruments" }]),
          schemas.article("Instrument Buying Guide", "Expert buying guides for pianos, guitars, keyboards, and accessories for musicians in India.", "/instruments"),
          schemas.faq([
            { q: "Which digital piano is best for beginners in India?", a: "The Yamaha P-45 and Casio CDP-S110 are excellent beginner options under ₹35,000. For more features, consider the Yamaha CK-88 or Roland RD-88." },
            { q: "Where can I buy musical instruments in Bangalore?", a: "You can purchase from Bajaao.com, Amazon India, or visit Nathaniel School of Music for hands-on recommendations and our gear marketplace." },
          ]),
        ]}
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">Buying Guides</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                How to Buy <span className="gradient-text">Instruments</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive guides to help you make informed decisions when purchasing 
                musical instruments. No fluff, just honest recommendations.
              </p>
            </div>

            <Tabs defaultValue="piano" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="piano" className="flex items-center gap-2" data-testid="tab-piano">
                  <Piano className="h-4 w-4" />
                  <span className="hidden sm:inline">Piano & Keys</span>
                </TabsTrigger>
                <TabsTrigger value="guitar" className="flex items-center gap-2" data-testid="tab-guitar">
                  <Guitar className="h-4 w-4" />
                  <span className="hidden sm:inline">Guitars</span>
                </TabsTrigger>
                <TabsTrigger value="servicing" className="flex items-center gap-2" data-testid="tab-servicing">
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Servicing</span>
                </TabsTrigger>
                <TabsTrigger value="accessories" className="flex items-center gap-2" data-testid="tab-accessories">
                  <Headphones className="h-4 w-4" />
                  <span className="hidden sm:inline">Accessories</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="piano" id="piano">
                <div className="space-y-12">
                  <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-primary/30">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Piano className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <Badge className="mb-1">New Comprehensive Guide</Badge>
                          <h3 className="text-xl font-bold">Complete Piano Buying Guide</h3>
                          <p className="text-sm text-muted-foreground">
                            Yamaha CK-88 vs Roland RD-88 comparison, touch settings, accessories, and expert recommendations from 25+ years of experience.
                          </p>
                        </div>
                      </div>
                      <a href="/piano-guide">
                        <Button size="lg" data-testid="button-view-piano-guide">
                          Read Full Guide
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Piano className="h-5 w-5 text-primary" />
                        Piano & Keyboard Quick Reference
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-3">The Basics</h3>
                        <p className="text-muted-foreground mb-4">
                          Whether you're a complete beginner or upgrading your setup, here's what you need to know 
                          about buying a digital piano or keyboard.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Budget Buyer (₹14,000 - ₹16,000)</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                The threshold is simple: you need a 61-key instrument with touch sensitivity from a reputable brand. That brand is Yamaha. Period. 
                                Get the <strong>Yamaha PSR-E373</strong>. At this level, there are literally no other options worth considering.
                              </p>
                              <Badge variant="default">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Recommended
                              </Badge>
                            </CardContent>
                          </Card>

                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Serious Student (₹39,000+)</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                If money isn't an issue, get an 88-key fully weighted digital piano. 
                                The <strong>Yamaha P-45</strong> is the gold standard starter. These are portable, unlike furniture-style pianos.
                              </p>
                              <Badge variant="default">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Recommended
                              </Badge>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-destructive/10 border-destructive/30 mb-6">
                          <CardContent className="p-4 flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-destructive">The Minimum Rules</h4>
                              <p className="text-sm text-muted-foreground">
                                61 keys minimum for everyone. No exceptions. 25-key and 49-key controllers are for quick productions, not for learning piano.
                                If you're not tech-savvy, avoid MIDI controllers and get a digital piano with built-in sounds instead.
                                And definitely avoid furniture-style pianos with MDF wood cabinets - they're not portable and don't add musical value.
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold mb-4">Comparison Table</h3>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Model</TableHead>
                                <TableHead>Keys</TableHead>
                                <TableHead>Weighted</TableHead>
                                <TableHead>Polyphony</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Buy</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {pianoSpecs.map((spec, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{spec.name}</TableCell>
                                  <TableCell>{spec.keys}</TableCell>
                                  <TableCell>
                                    {spec.weighted === "Yes" ? (
                                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <XCircle className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </TableCell>
                                  <TableCell>{spec.polyphony}</TableCell>
                                  <TableCell className="font-semibold">{spec.price}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">{spec.level}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-1">
                                      <a href={spec.amazonLink} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="icon" data-testid={`button-amazon-${spec.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                          <SiAmazon className="h-4 w-4" />
                                        </Button>
                                      </a>
                                      <a href={spec.bajaaoLink} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="icon" data-testid={`button-bajaao-${spec.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                          <ShoppingCart className="h-4 w-4" />
                                        </Button>
                                      </a>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Prices are approximate and may vary. Click the icons to check current prices on Amazon and Bajaao.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="text-xl font-semibold mb-6">Video Tutorials</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {pianoVideos.map((video) => (
                        <YouTubeEmbed
                          key={video.id}
                          videoId={video.id}
                          title={video.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="guitar" id="guitar">
                <div className="space-y-12">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Guitar className="h-5 w-5 text-primary" />
                        Guitar Buying Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-3">Start with Acoustic</h3>
                        <p className="text-muted-foreground mb-4">
                          If you grew up dreaming of shredding like your rock heroes, I've got news: you're not ready for electric yet.
                          You start like everyone else starts - on an acoustic. Build your calluses first, then we can talk about distortion pedals.
                          Yes, it makes you feel less cool. Good. That's part of the journey.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Nylon String (Classical)</h4>
                              <p className="text-sm text-muted-foreground">
                                Wide neck, soft strings, played fingerstyle. Best for classical music studies.
                                If you're not specifically studying classical guitar, you can skip this.
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Steel String (Recommended)</h4>
                              <p className="text-sm text-muted-foreground">
                                Standard acoustic sound, playable with fingers or a pick.
                                This is where most modern guitarists start their journey.
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-primary/10 border-primary/30 mb-6">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Our Recommendation: Semi-Acoustic (Electro-Acoustic)</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Sounds great unplugged for practice at home
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Built-in pickup and output jack for amps/PA systems
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Perfect for parties, open mics, office events, or small gigs
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                One guitar does everything - no need to buy separate acoustic and electric
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold mb-4">Recommended Guitars (₹9,000 - ₹16,000)</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                          {guitarRecommendations.map((guitar, index) => (
                            <Card key={index} className={guitar.recommended ? "bg-muted/30" : "bg-muted/10"}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-semibold">{guitar.name}</h4>
                                    <Badge variant="outline" className="text-xs">{guitar.type}</Badge>
                                  </div>
                                  <span className="text-lg font-bold">{guitar.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{guitar.description}</p>
                                <div className="flex items-center justify-between">
                                  {guitar.recommended && (
                                    <Badge variant="default">
                                      <Star className="h-3 w-3 mr-1" /> Recommended
                                    </Badge>
                                  )}
                                  <div className="flex gap-2 ml-auto">
                                    <a href={guitar.amazonLink} target="_blank" rel="noopener noreferrer">
                                      <Button variant="outline" size="sm" data-testid={`button-guitar-amazon-${guitar.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                        <SiAmazon className="h-4 w-4 mr-1" />
                                        Amazon
                                      </Button>
                                    </a>
                                    <a href={guitar.bajaaoLink} target="_blank" rel="noopener noreferrer">
                                      <Button variant="outline" size="sm" data-testid={`button-guitar-bajaao-${guitar.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                        <ShoppingCart className="h-4 w-4 mr-1" />
                                        Bajaao
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mb-6">
                          * Prices are approximate and may vary. Click the buttons to check current prices.
                        </p>

                        <Card className="bg-amber-500/10 border-amber-500/30 mb-6">
                          <CardContent className="p-4 flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-amber-500">What to Look Out For</h4>
                              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                <li>• Stick to Yamaha, Cort, or verified Rooster models. Everything else is noise.</li>
                                <li>• If someone tries to sell you "full body mahogany" from an unknown brand for ₹15,000+, walk out.</li>
                                <li>• Intonation and tuning peg quality matter more than wood type at this price.</li>
                                <li>• Always compare prices across Sound Glitz, Rooster, and Reynolds before buying.</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold mb-4">Total Setup Cost</h3>
                        <Card className="bg-muted/30 mb-6">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Guitar (semi-acoustic)</p>
                                <p className="font-semibold">₹9,000 - ₹16,000</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Instrument Cable (3m)</p>
                                <p className="font-semibold">₹300 - ₹500</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Plectrums (pack of 5)</p>
                                <p className="font-semibold">₹100</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-semibold">Total</p>
                                <p className="font-bold">Under ₹17,000</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold mb-4">Where to Buy in Bangalore</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold">Sound Glitz</h4>
                              <p className="text-sm text-muted-foreground">Brigade Road</p>
                              <p className="text-xs text-muted-foreground mt-2">Good Yamaha & Cort selection</p>
                              <a href="https://soundglitz.com" target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm" className="mt-2" data-testid="button-soundglitz">
                                  Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                                </Button>
                              </a>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold">Rooster Guitars</h4>
                              <p className="text-sm text-muted-foreground">Church Street</p>
                              <p className="text-xs text-muted-foreground mt-2">Local manufacturing, custom setups</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold">Reynolds Music</h4>
                              <p className="text-sm text-muted-foreground">Multiple Locations</p>
                              <p className="text-xs text-muted-foreground mt-2">Good alternative with comparable pricing</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="servicing" id="servicing">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Instrument Servicing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        We're compiling a list of trusted instrument servicing professionals in Bangalore. 
                        Check back soon for recommendations on piano tuners, guitar techs, and more.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accessories" id="accessories">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Essential Accessories</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accessories.map((item, index) => (
                      <Card key={index} className="overflow-hidden hover-elevate" data-testid={`accessory-${index}`}>
                        <div className="aspect-video relative overflow-hidden bg-muted">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 left-2">{item.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-1">{item.name}</h4>
                          <p className="text-lg font-bold mb-4">{item.price}</p>
                          <div className="flex gap-2">
                            <a href={item.amazonLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="outline" size="sm" className="w-full" data-testid={`button-acc-amazon-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <SiAmazon className="h-4 w-4 mr-1" />
                                Amazon
                              </Button>
                            </a>
                            <a href={item.bajaaoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="outline" size="sm" className="w-full" data-testid={`button-acc-bajaao-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Bajaao
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
