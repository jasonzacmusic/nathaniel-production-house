import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { SiSpotify, SiYoutube } from "react-icons/si";

interface StudioImage {
  id: string;
  url: string;
  caption: string;
  feature: string;
  aspectClass: string;
}

const studioImages: StudioImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    caption: "Main Control Room",
    feature: "SSL Console & Genelec Monitors",
    aspectClass: "aspect-[4/5]"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    caption: "Live Recording Room",
    feature: "Acoustic Treatment & Isolation Booth",
    aspectClass: "aspect-square"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    caption: "Vocal Booth",
    feature: "Neumann U87 & Reflection Filter",
    aspectClass: "aspect-[3/4]"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    caption: "Instrument Collection",
    feature: "Vintage & Modern Keyboards",
    aspectClass: "aspect-video"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    caption: "Mastering Suite",
    feature: "Precision Monitoring System",
    aspectClass: "aspect-[4/3]"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800",
    caption: "Recording Session",
    feature: "Professional Engineers",
    aspectClass: "aspect-square"
  },
];

const recentWork = [
  {
    id: "1",
    type: "youtube",
    title: "Recording Session BTS",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "2",
    type: "spotify",
    title: "Latest Album Production",
    thumbnail: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400",
    url: "https://spotify.com"
  },
  {
    id: "3",
    type: "youtube",
    title: "Mix Breakdown",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ"
  },
];

export default function StudioShowcase() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50" id="studio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Our Studio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            World-Class <span className="gradient-text">Recording Facility</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience professional audio production in our state-of-the-art studio. 
            From recording to mastering, we have everything you need.
          </p>
        </div>

        <div className="masonry-grid mb-16">
          {studioImages.map((image) => (
            <div 
              key={image.id}
              className="masonry-item relative group overflow-hidden rounded-lg cursor-pointer"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              data-testid={`img-studio-${image.id}`}
            >
              <div className={`${image.aspectClass} overflow-hidden`}>
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                  hoveredImage === image.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div 
                className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                  hoveredImage === image.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{image.caption}</h3>
                <p className="text-sm text-white/80">{image.feature}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Recent Work</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recentWork.map((work) => (
              <Card key={work.id} className="group overflow-hidden hover-elevate" data-testid={`card-work-${work.id}`}>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <Badge 
                    className="absolute top-3 left-3"
                    variant={work.type === 'youtube' ? 'destructive' : 'default'}
                  >
                    {work.type === 'youtube' ? (
                      <><SiYoutube className="h-3 w-3 mr-1" /> YouTube</>
                    ) : (
                      <><SiSpotify className="h-3 w-3 mr-1" /> Spotify</>
                    )}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium truncate">{work.title}</h4>
                    <a href={work.url} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="ghost" className="shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
