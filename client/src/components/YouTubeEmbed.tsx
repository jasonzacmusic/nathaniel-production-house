import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isPlaying) {
    return (
      <div className={`aspect-video rounded-lg overflow-hidden ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <Card 
      className={`group overflow-hidden cursor-pointer hover-elevate ${className}`}
      onClick={() => setIsPlaying(true)}
      data-testid={`video-${videoId}`}
    >
      <div className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
          <Button 
            size="lg" 
            className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90"
          >
            <Play className="h-7 w-7 ml-1" fill="currentColor" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h4 className="font-medium line-clamp-2">{title}</h4>
      </CardContent>
    </Card>
  );
}
