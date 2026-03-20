import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  MapPin,
  Eye,
  Clock,
  ArrowLeft,
  MessageCircle,
  User,
  Share2,
  Copy,
} from "lucide-react";
import { MARKETPLACE_CATEGORIES, LISTING_CONDITIONS } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ListingWithSeller {
  id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  description: string | null;
  imageUrls: string | null;
  city: string;
  status: string;
  viewCount: number | null;
  createdAt: string | null;
  seller: {
    id: string;
    displayName: string | null;
    phone: string | null;
    city: string | null;
    createdAt: string | null;
    activeListings: number;
  } | null;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getConditionColor(condition: string): string {
  switch (condition) {
    case "mint":
      return "bg-green-600 text-white";
    case "excellent":
      return "bg-blue-600 text-white";
    case "good":
      return "bg-amber-500 text-white";
    case "fair":
      return "bg-orange-500 text-white";
    case "poor":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

function getCategoryLabel(value: string): string {
  const match = MARKETPLACE_CATEGORIES.find((c) => c.value === value);
  return match?.label ?? value;
}

function formatDate(date: string | null): string {
  if (!date) return "Unknown";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseImages(imageUrls: string | null): string[] {
  if (!imageUrls) return [];
  try {
    const parsed = JSON.parse(imageUrls);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ListingDetail() {
  const [, params] = useRoute("/marketplace/:id");
  const id = params?.id;
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    data: listing,
    isLoading,
    isError,
  } = useQuery<ListingWithSeller>({
    queryKey: ["marketplace-listing", id],
    queryFn: async () => {
      const res = await fetch(`/api/marketplace/${id}`);
      if (!res.ok) throw new Error("Listing not found");
      return res.json();
    },
    enabled: !!id,
  });

  const images = listing ? parseImages(listing.imageUrls) : [];
  const conditionEntry = listing
    ? LISTING_CONDITIONS.find((c) => c.value === listing.condition)
    : null;
  const formattedPrice = listing ? formatPrice(listing.price) : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard" });
    } catch {
      toast({ title: "Failed to copy link", variant: "destructive" });
    }
  };

  const whatsappUrl = listing?.seller?.phone
    ? `https://wa.me/91${listing.seller.phone}?text=${encodeURIComponent(
        `Hi, I'm interested in your "${listing.title}" listed on Nathaniel Marketplace for ${formattedPrice}`,
      )}`
    : null;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (isError || !listing) {
    return (
      <>
        <Header />
        <SEOHead
          title="Listing Not Found"
          description="This listing could not be found on Nathaniel Marketplace."
          path={`/marketplace/${id}`}
        />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Listing not found</h1>
          <p className="text-muted-foreground">
            This listing may have been removed or does not exist.
          </p>
          <Link href="/marketplace">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <SEOHead
        title={listing.title}
        description={
          listing.description
            ? listing.description.slice(0, 160)
            : `${listing.title} - ${formattedPrice} on Nathaniel Marketplace`
        }
        path={`/marketplace/${listing.id}`}
      />

      <main className="container mx-auto px-4 py-8 min-h-screen">
        {/* Back button */}
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
        </Link>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image gallery (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={listing.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="text-gray-500 text-lg">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${listing.title} - ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details card (1 col) */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={`border-0 ${getConditionColor(listing.condition)}`}
                  >
                    {conditionEntry?.label ?? listing.condition}
                  </Badge>
                  <Badge variant="secondary">
                    {getCategoryLabel(listing.category)}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold">{listing.title}</h1>

                {/* Price */}
                <p className="text-3xl font-bold text-green-500">
                  {formattedPrice}
                </p>

                {/* Meta info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.city}</span>
                  </div>
                  {listing.viewCount != null && (
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{listing.viewCount} views</span>
                    </div>
                  )}
                  {listing.createdAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Posted {formatDate(listing.createdAt)}</span>
                    </div>
                  )}
                </div>

                <hr className="border-border" />

                {/* Contact & share buttons */}
                <div className="space-y-2">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Seller on WhatsApp
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                <hr className="border-border" />

                {/* Seller info */}
                {listing.seller && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
                      Seller
                    </h3>
                    <div className="space-y-2">
                      <Link href={`/seller/${listing.seller.id}`}>
                        <span className="flex items-center gap-2 text-primary hover:underline cursor-pointer font-medium">
                          <User className="h-4 w-4" />
                          {listing.seller.displayName ?? "Anonymous"}
                        </span>
                      </Link>
                      {listing.seller.createdAt && (
                        <p className="text-sm text-muted-foreground">
                          Member since {formatDate(listing.seller.createdAt)}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {listing.seller.activeListings} active{" "}
                        {listing.seller.activeListings === 1
                          ? "listing"
                          : "listings"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Description */}
                {listing.description && (
                  <>
                    <hr className="border-border" />
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
                        Description
                      </h3>
                      <p className="text-sm whitespace-pre-wrap">
                        {listing.description}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
