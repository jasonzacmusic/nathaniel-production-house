import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ListingCard from "@/components/ListingCard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Search,
  Plus,
  ShoppingBag,
  Filter,
  Loader2,
  User,
  LogIn,
} from "lucide-react";
import { MARKETPLACE_CATEGORIES, INDIAN_CITIES } from "@shared/schema";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
];

export default function Marketplace() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const queryParams = new URLSearchParams();
  if (selectedCategory !== "all") queryParams.set("category", selectedCategory);
  if (selectedCondition !== "all") queryParams.set("condition", selectedCondition);
  if (selectedCity !== "all") queryParams.set("city", selectedCity);
  if (searchQuery) queryParams.set("search", searchQuery);
  if (sortBy) queryParams.set("sort", sortBy);

  const { data: listings, isLoading } = useQuery<any[]>({
    queryKey: ["/api/marketplace", selectedCategory, selectedCondition, selectedCity, searchQuery, sortBy],
    queryFn: async () => {
      const res = await fetch(`/api/marketplace?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Gear Marketplace - Buy & Sell Used Musical Instruments"
        description="Buy and sell used musical instruments in India. Keyboards, guitars, drums, Indian classical instruments, pro audio equipment. Connect with local musicians."
        path="/marketplace"
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <Badge variant="outline" className="mb-2">Community Marketplace</Badge>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Gear <span className="gradient-text">Marketplace</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Buy and sell used musical instruments with local musicians
                </p>
              </div>
              <div className="flex gap-3">
                {user ? (
                  <>
                    <Link href="/account">
                      <Button size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Sell Your Gear
                      </Button>
                    </Link>
                    <Link href="/account">
                      <Button variant="outline" size="lg">
                        <User className="h-4 w-4 mr-2" />
                        My Account
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button size="lg">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login to Sell
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-8">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search guitars, keyboards, tabla, mics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[170px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {MARKETPLACE_CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Condition</SelectItem>
                        <SelectItem value="mint">Mint</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {INDIAN_CITIES.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
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

            {/* Results */}
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : !listings || listings.length === 0 ? (
              <Card className="py-16 text-center">
                <CardContent>
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Gear Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || selectedCategory !== "all"
                      ? "Try adjusting your search or filters"
                      : "Be the first to list your gear!"}
                  </p>
                  {!user && (
                    <Link href="/auth">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Sign up to sell
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {listings.length} listing{listings.length !== 1 ? "s" : ""} found
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing: any) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
