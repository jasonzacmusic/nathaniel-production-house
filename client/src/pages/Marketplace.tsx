import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Copy, 
  ExternalLink, 
  Plus, 
  Tag, 
  ShoppingBag,
  Filter,
  Percent
} from "lucide-react";
import { SiAmazon } from "react-icons/si";

interface GearItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  amazonPrice?: number;
  bajaaoPrice?: number;
  soundGlitzPrice?: number;
}

const sampleGear: GearItem[] = [
  {
    id: "1",
    name: "Yamaha PSR-E373",
    category: "keyboards",
    price: 9500,
    originalPrice: 11000,
    description: "Excellent condition, barely used. Touch-sensitive 61 keys with learning functions.",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
    amazonPrice: 10990,
    bajaaoPrice: 10500,
    soundGlitzPrice: 10800,
  },
  {
    id: "2",
    name: "Fender CD-60S Acoustic Guitar",
    category: "guitars",
    price: 12000,
    originalPrice: 18000,
    description: "Great beginner guitar. Minor cosmetic scratches, plays perfectly.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
    amazonPrice: 17500,
    bajaaoPrice: 16800,
    soundGlitzPrice: 17000,
  },
  {
    id: "3",
    name: "Audio-Technica AT2020",
    category: "pro_audio",
    price: 6500,
    originalPrice: 9000,
    description: "Condenser microphone with shock mount. Perfect for home recording.",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400",
    amazonPrice: 8500,
    bajaaoPrice: 8200,
    soundGlitzPrice: 8000,
  },
  {
    id: "4",
    name: "Roland TD-1DMK Electronic Drums",
    category: "drums",
    price: 28000,
    originalPrice: 42000,
    description: "Complete electronic drum kit. All mesh heads. Great for practice.",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400",
    amazonPrice: 39000,
    bajaaoPrice: 38500,
    soundGlitzPrice: 40000,
  },
  {
    id: "5",
    name: "Focusrite Scarlett 2i2 (3rd Gen)",
    category: "pro_audio",
    price: 8500,
    originalPrice: 12000,
    description: "USB audio interface, 2 inputs. Like new condition with original box.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    amazonPrice: 11500,
    bajaaoPrice: 11000,
    soundGlitzPrice: 11200,
  },
  {
    id: "6",
    name: "Casio CDP-S100",
    category: "keyboards",
    price: 22000,
    originalPrice: 30000,
    description: "88-key digital piano with weighted keys. Includes stand and pedal.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
    amazonPrice: 29500,
    bajaaoPrice: 28000,
    soundGlitzPrice: 28500,
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "keyboards", label: "Keyboards & Pianos" },
  { value: "guitars", label: "Guitars" },
  { value: "drums", label: "Drums & Percussion" },
  { value: "pro_audio", label: "Pro Audio" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "discount", label: "Best Discount" },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sellDialogOpen, setSellDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredGear = sampleGear
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "discount":
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discountB - discountA;
        default:
          return 0;
      }
    });

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/marketplace#${id}`);
    toast({
      title: "Link Copied!",
      description: "Product link copied to clipboard",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Gear Marketplace - Buy & Sell Used Musical Instruments"
        description="Buy and sell used musical instruments within the Nathaniel School community. Keyboards, guitars, drums, pro audio equipment at great prices with price comparison."
        path="/marketplace"
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <Badge variant="outline" className="mb-2">Marketplace</Badge>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Gear <span className="gradient-text">Marketplace</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Buy and sell used musical instruments within our community
                </p>
              </div>
              <Dialog open={sellDialogOpen} onOpenChange={setSellDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" data-testid="button-sell-gear">
                    <Plus className="h-4 w-4 mr-2" />
                    Sell Your Gear
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>List Your Gear for Sale</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Listing Submitted!",
                      description: "We'll review and publish your listing soon.",
                    });
                    setSellDialogOpen(false);
                  }}>
                    <div className="space-y-2">
                      <Label>Product Name</Label>
                      <Input placeholder="e.g., Yamaha P-45 Digital Piano" required data-testid="input-product-name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select required>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="keyboards">Keyboards</SelectItem>
                            <SelectItem value="guitars">Guitars</SelectItem>
                            <SelectItem value="drums">Drums</SelectItem>
                            <SelectItem value="pro_audio">Pro Audio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Your Price (₹)</Label>
                        <Input type="number" placeholder="10000" required data-testid="input-price" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Original Price (₹)</Label>
                      <Input type="number" placeholder="15000" data-testid="input-original-price" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Describe the condition, included accessories, reason for selling..."
                        className="resize-none"
                        required
                        data-testid="input-description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Your Email</Label>
                      <Input type="email" placeholder="you@example.com" required data-testid="input-seller-email" />
                    </div>
                    <Button type="submit" className="w-full" data-testid="button-submit-listing">
                      Submit Listing
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="mb-8">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search gear..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-search"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]" data-testid="select-filter-category">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]" data-testid="select-sort">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {filteredGear.length === 0 ? (
              <Card className="py-16 text-center">
                <CardContent>
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Gear Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGear.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover-elevate" id={item.id} data-testid={`gear-${item.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3">
                        <Tag className="h-3 w-3 mr-1" />
                        {categories.find(c => c.value === item.category)?.label.split(' ')[0]}
                      </Badge>
                      <Badge 
                        className="absolute top-3 right-3 bg-green-600"
                      >
                        <Percent className="h-3 w-3 mr-1" />
                        {getDiscount(item.originalPrice, item.price)}% OFF
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-green-500">{formatPrice(item.price)}</span>
                        <span className="text-sm text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-muted-foreground font-medium">Compare Market Prices:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {item.amazonPrice && (
                            <a href="https://amazon.in" target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="w-full text-xs px-1">
                                <SiAmazon className="h-3 w-3 mr-1" />
                                {formatPrice(item.amazonPrice)}
                              </Button>
                            </a>
                          )}
                          {item.bajaaoPrice && (
                            <a href="https://bajaao.com" target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="w-full text-xs px-1">
                                Bajaao {formatPrice(item.bajaaoPrice)}
                              </Button>
                            </a>
                          )}
                          {item.soundGlitzPrice && (
                            <a href="https://soundglitz.com" target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="w-full text-xs px-1">
                                SoundGlitz {formatPrice(item.soundGlitzPrice)}
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" data-testid={`button-contact-${item.id}`}>
                          Contact Seller
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => copyLink(item.id)}
                          data-testid={`button-copy-${item.id}`}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
