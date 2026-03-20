import { Link } from "wouter";
import { MapPin, Eye, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MARKETPLACE_CATEGORIES, LISTING_CONDITIONS } from "@shared/schema";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    category: string;
    condition: string;
    price: number;
    description: string | null;
    imageUrls: string | null;
    city: string;
    viewCount: number | null;
    createdAt: Date | string | null;
    status?: string;
    seller?: {
      id: string;
      displayName: string | null;
      city: string | null;
      createdAt: Date | string | null;
    } | null;
  };
  showStatus?: boolean;
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

function parseImages(imageUrls: string | null): string[] {
  if (!imageUrls) return [];
  try {
    const parsed = JSON.parse(imageUrls);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getCategoryLabel(value: string): string {
  const match = MARKETPLACE_CATEGORIES.find((c) => c.value === value);
  return match?.label ?? value;
}

function getTimeAgo(date: Date | string | null): string {
  if (!date) return "";
  const now = Date.now();
  const then = new Date(date).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function ListingCard({ listing, showStatus }: ListingCardProps) {
  const images = parseImages(listing.imageUrls);
  const firstImage = images[0] ?? null;
  const conditionEntry = LISTING_CONDITIONS.find(
    (c) => c.value === listing.condition,
  );

  return (
    <Link href={`/marketplace/${listing.id}`}>
      <Card className="hover-elevate overflow-hidden cursor-pointer transition-shadow">
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}

          {/* Category badge - top left */}
          <Badge className="absolute top-2 left-2" variant="secondary">
            {getCategoryLabel(listing.category)}
          </Badge>

          {/* Condition badge - top right */}
          <Badge
            className={`absolute top-2 right-2 border-0 ${getConditionColor(listing.condition)}`}
          >
            {conditionEntry?.label ?? listing.condition}
          </Badge>
        </div>

        <CardContent className="p-4 space-y-2">
          {/* Title */}
          <h3 className="font-semibold line-clamp-1">{listing.title}</h3>

          {/* Price */}
          <p className="text-lg font-bold text-primary">
            {formatPrice(listing.price)}
          </p>

          {/* Status badge */}
          {showStatus && listing.status && (
            <Badge variant="outline" className="text-xs">
              {listing.status}
            </Badge>
          )}

          {/* City + seller */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.city}
            </span>
            {listing.seller?.displayName && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {listing.seller.displayName}
              </span>
            )}
          </div>

          {/* View count + time ago */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {listing.viewCount != null && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {listing.viewCount}
              </span>
            )}
            {listing.createdAt && (
              <span>{getTimeAgo(listing.createdAt)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
