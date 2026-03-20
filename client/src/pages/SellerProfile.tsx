import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Calendar, Package } from "lucide-react";
import { Link } from "wouter";

interface SellerData {
  id: string;
  displayName: string | null;
  city: string | null;
  bio: string | null;
  createdAt: string | null;
  activeListings: number;
  listings: any[];
}

export default function SellerProfile() {
  const [, params] = useRoute("/seller/:id");
  const sellerId = params?.id;

  const { data: seller, isLoading, error } = useQuery<SellerData>({
    queryKey: ["/api/sellers", sellerId],
    queryFn: async () => {
      const res = await fetch(`/api/sellers/${sellerId}`);
      if (!res.ok) throw new Error("Seller not found");
      return res.json();
    },
    enabled: !!sellerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Seller Not Found</h2>
            <Link href="/marketplace" className="text-primary hover:underline">Back to Marketplace</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const memberSince = seller.createdAt
    ? new Date(seller.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "Unknown";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {(seller.displayName || "?")[0].toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{seller.displayName || "Unknown Seller"}</h1>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      {seller.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {seller.city}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Member since {memberSince}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" /> {seller.activeListings} active listing{seller.activeListings !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {seller.bio && (
                      <p className="mt-3 text-sm text-muted-foreground">{seller.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-xl font-semibold mb-4">Listings</h2>
            {seller.listings.length === 0 ? (
              <p className="text-muted-foreground">No active listings.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {seller.listings.map((listing: any) => (
                  <ListingCard key={listing.id} listing={listing} />
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
