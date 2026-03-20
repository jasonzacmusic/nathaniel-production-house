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
  Video,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
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
  imageLabels: string | null;
  city: string;
  status: string;
  viewCount: number | null;
  createdAt: string | null;
  videoEmbed: { type: "youtube" | "gdrive" | "dropbox" | "unknown"; embedUrl: string } | null;
  gearHealth: { score: number; label: string } | null;
  priceIndicator: { label: string; savingsPercent: number } | null;
  newMarketPrice: number | null;
  amazonProductLink: string | null;
  bajaaoProductLink: string | null;
  gearHealthCosmeticScore: number | null;
  gearHealthElectronicsWorking: boolean | null;
  gearHealthOriginalAccessories: boolean | null;
  gearHealthOriginalBox: boolean | null;
  gearHealthWarrantyMonths: number | null;
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

function priceIndicatorColor(label: string) {
  if (label === "Great Deal") return "bg-green-600";
  if (label === "Fair Price") return "bg-amber-600";
  return "bg-red-600";
}

export default function ListingDetail() {
  const [, params] = useRoute("/marketplace/:id");
  const id = params?.id;
  const { toast } = useToast();
  const { user } = useAuth();
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

  const { data: zoomSlots } = useQuery<any[]>({
    queryKey: ["/api/marketplace/zoom-slots", id],
    queryFn: async () => {
      const res = await fetch(`/api/marketplace/${id}/zoom-slots`);
      return res.json();
    },
    enabled: !!listing,
  });

  const images = listing ? parseImages(listing.imageUrls) : [];
  const imageLabels: Record<string, string> = listing?.imageLabels ? JSON.parse(listing.imageLabels) : {};
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
            {/* Video embed */}
            {listing.videoEmbed && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4" /> Product Video
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src={listing.videoEmbed.embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

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
                  <div key={index} className="flex-shrink-0 text-center">
                    <button
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
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
                    {imageLabels[String(index)] && (
                      <span className="text-xs text-muted-foreground mt-1 block truncate max-w-[5rem]">
                        {imageLabels[String(index)]}
                      </span>
                    )}
                  </div>
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

                {/* Price Comparison */}
                {listing.newMarketPrice && (
                  <div className="p-4 rounded-lg border bg-card space-y-2">
                    <h3 className="text-sm font-medium">Price Comparison</h3>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">New price:</span>
                      <span className="font-medium">{formatPrice(listing.newMarketPrice)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Listed price:</span>
                      <span className="text-lg font-bold text-green-500">{formatPrice(listing.price)}</span>
                    </div>
                    {listing.priceIndicator && (
                      <Badge className={priceIndicatorColor(listing.priceIndicator.label)}>
                        {listing.priceIndicator.label} - Save {listing.priceIndicator.savingsPercent}%
                      </Badge>
                    )}
                    <div className="flex gap-2 mt-2">
                      {listing.amazonProductLink && (
                        <a href={listing.amazonProductLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-xs">Check Amazon</Button>
                        </a>
                      )}
                      {listing.bajaaoProductLink && (
                        <a href={listing.bajaaoProductLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-xs">Check Bajaao</Button>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Gear Health Report */}
                {listing.gearHealth && (
                  <div className="p-4 rounded-lg border bg-card space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Gear Health Report</h3>
                      <Badge className={listing.gearHealth.score >= 80 ? "bg-green-600" : listing.gearHealth.score >= 60 ? "bg-amber-600" : "bg-red-600"}>
                        {listing.gearHealth.score}/100 - {listing.gearHealth.label}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      {listing.gearHealthCosmeticScore != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cosmetic Condition</span>
                          <span>{"★".repeat(listing.gearHealthCosmeticScore)}{"☆".repeat(5 - listing.gearHealthCosmeticScore)}</span>
                        </div>
                      )}
                      {listing.gearHealthElectronicsWorking != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Electronics</span>
                          <span className={listing.gearHealthElectronicsWorking ? "text-green-500" : "text-red-500"}>
                            {listing.gearHealthElectronicsWorking ? "All Working" : "Issues"}
                          </span>
                        </div>
                      )}
                      {listing.gearHealthOriginalAccessories != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Original Accessories</span>
                          <span>{listing.gearHealthOriginalAccessories ? "Included" : "Not included"}</span>
                        </div>
                      )}
                      {listing.gearHealthOriginalBox != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Original Box</span>
                          <span>{listing.gearHealthOriginalBox ? "Yes" : "No"}</span>
                        </div>
                      )}
                      {listing.gearHealthWarrantyMonths != null && listing.gearHealthWarrantyMonths > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Warranty</span>
                          <span>{listing.gearHealthWarrantyMonths} months remaining</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

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

                {/* Zoom Verification */}
                {zoomSlots && zoomSlots.length > 0 && (
                  <>
                    <hr className="border-border" />
                    <div className="p-4 rounded-lg border bg-card space-y-3">
                      <h3 className="text-sm font-medium flex items-center gap-2">
                        <Video className="w-4 h-4" /> Live Video Inspection
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Not sure about the condition? Book a free Zoom call to see the gear live, mediated by Nathaniel School.
                      </p>
                      {user ? (
                        <ZoomRequestForm listingId={listing.id} slots={zoomSlots} />
                      ) : (
                        <Link href="/auth"><Button variant="outline" size="sm" className="w-full">Login to book inspection</Button></Link>
                      )}
                    </div>
                  </>
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

function ZoomRequestForm({ listingId, slots }: { listingId: string; slots: any[] }) {
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem("userToken");
      const res = await fetch(`/api/marketplace/${listingId}/zoom-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slotId: selectedSlot, buyerNotes: notes }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Request Sent!", description: "You'll be notified once approved" });
      setSelectedSlot("");
      setNotes("");
    } catch {
      toast({ title: "Error", description: "Failed to submit request", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-3">
      <Select value={selectedSlot} onValueChange={setSelectedSlot}>
        <SelectTrigger><SelectValue placeholder="Choose a time slot" /></SelectTrigger>
        <SelectContent>
          {slots.map((slot: any) => (
            <SelectItem key={slot.id} value={slot.id}>
              {slot.date} - {slot.timeSlot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any questions for the seller? (optional)" />
      <Button onClick={handleSubmit} disabled={!selectedSlot || submitting} className="w-full" size="sm">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Request Zoom Inspection
      </Button>
    </div>
  );
}
