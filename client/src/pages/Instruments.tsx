import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SEOHead from "@/components/SEOHead";
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
  { name: "Yamaha PSR-E373", keys: "61", weighted: "No", polyphony: "48", price: "₹11,000", rating: 4, level: "Budget" },
  { name: "Yamaha P-45", keys: "88", weighted: "Yes", polyphony: "64", price: "₹35,000", rating: 5, level: "Entry Pro" },
  { name: "Roland FP-30X", keys: "88", weighted: "Yes", polyphony: "256", price: "₹65,000", rating: 5, level: "Intermediate" },
  { name: "Yamaha CK-88", keys: "88", weighted: "Yes", polyphony: "128", price: "₹85,000", rating: 5, level: "Professional" },
  { name: "Roland RD-88", keys: "88", weighted: "Yes", polyphony: "128", price: "₹95,000", rating: 5, level: "Professional" },
];

const guitarRecommendations = [
  {
    name: "Yamaha F310",
    type: "Acoustic",
    price: "₹8,500",
    description: "Best entry-level acoustic guitar. Reliable, great resale value.",
    recommended: true,
  },
  {
    name: "Yamaha FX310A",
    type: "Semi-Acoustic",
    price: "₹12,000",
    description: "Semi-acoustic with pickup. Perfect for gigs and practice.",
    recommended: true,
  },
  {
    name: "Cort AD810E",
    type: "Semi-Acoustic",
    price: "₹10,000",
    description: "Great bang for buck. Solid build quality.",
    recommended: true,
  },
  {
    name: "Pluto HW41CE-201",
    type: "Semi-Acoustic",
    price: "₹8,000",
    description: "Budget option. Acceptable for absolute beginners.",
    recommended: false,
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
        title="How to Buy Instruments - Piano, Guitar & Accessories"
        description="Comprehensive buying guides for digital pianos, keyboards, acoustic guitars, and music accessories. Honest recommendations from Nathaniel School of Music teachers."
        path="/instruments"
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Piano className="h-5 w-5 text-primary" />
                        Piano & Keyboard Buying Guide
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
                              <h4 className="font-semibold mb-2">Budget Buyer (₹11,000)</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                Get a 61-key instrument with touch sensitivity from Yamaha. 
                                The <strong>Yamaha PSR-E373</strong> is your only option at this price.
                              </p>
                              <Badge variant="outline" className="text-primary border-primary">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Recommended
                              </Badge>
                            </CardContent>
                          </Card>

                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">Serious Student (₹35,000+)</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                Get an 88-key fully weighted digital piano. 
                                <strong> Yamaha P-45</strong> is the gold standard starter.
                              </p>
                              <Badge variant="outline" className="text-primary border-primary">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Recommended
                              </Badge>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-destructive/10 border-destructive/30 mb-6">
                          <CardContent className="p-4 flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-destructive">What to Avoid</h4>
                              <p className="text-sm text-muted-foreground">
                                Avoid 25-key and 49-key MIDI controllers for learning - they're toys for TikTok videos, 
                                not real music production. Stay away from "iPiANO 3423" type gimmicky Indian rebranded keyboards.
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
                                  <TableCell className="text-primary font-semibold">{spec.price}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">{spec.level}</Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
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
                          If you're dreaming of shredding like Slash on an electric guitar - hold that thought. 
                          You start like everyone else: on an acoustic. Build calluses first, then talk about distortion pedals.
                        </p>

                        <Card className="bg-primary/10 border-primary/30 mb-6">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Our Recommendation: Semi-Acoustic</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Sounds great unplugged for practice at home
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Has a pickup and output jack for amps/PA
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                Perfect for parties, open mics, or small gigs
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                One guitar does everything
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <h3 className="text-lg font-semibold mb-4">Recommended Guitars (₹8,000 - ₹12,000)</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                          {guitarRecommendations.map((guitar, index) => (
                            <Card key={index} className={guitar.recommended ? "bg-muted/30" : "bg-muted/10"}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-semibold">{guitar.name}</h4>
                                    <Badge variant="outline" className="text-xs">{guitar.type}</Badge>
                                  </div>
                                  <span className="text-lg font-bold text-primary">{guitar.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{guitar.description}</p>
                                {guitar.recommended && (
                                  <Badge className="bg-primary/20 text-primary border-0">
                                    <Star className="h-3 w-3 mr-1 fill-primary" /> Recommended
                                  </Badge>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <Card className="bg-destructive/10 border-destructive/30 mb-6">
                          <CardContent className="p-4 flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-destructive">AVOID: Cadence Guitars</h4>
                              <p className="text-sm text-muted-foreground">
                                This brand is a scam. They sell overpriced garbage to clueless beginners. 
                                The intonation is terrible, tuning pegs slip, and you'll outgrow it in 3 months. 
                                Don't let them swindle you.
                              </p>
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
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold">Rooster Guitars</h4>
                              <p className="text-sm text-muted-foreground">Church Street</p>
                              <p className="text-xs text-muted-foreground mt-2">Local manufacturing</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <h4 className="font-semibold">Reynolds Music</h4>
                              <p className="text-sm text-muted-foreground">Multiple Locations</p>
                              <p className="text-xs text-muted-foreground mt-2">Good alternative option</p>
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
                          <p className="text-lg font-bold text-primary mb-4">{item.price}</p>
                          <div className="flex gap-2">
                            <a href={item.amazonLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                <SiAmazon className="h-4 w-4 mr-1" />
                                Amazon
                              </Button>
                            </a>
                            <a href={item.bajaaoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
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
