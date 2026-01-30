import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Mic2, Headphones, Music2, Disc3 } from "lucide-react";
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
    caption: "Control Room",
    feature: "Pro Tools 10 & Mac Workstation",
    aspectClass: "aspect-[4/5]"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800",
    caption: "Live Recording Room",
    feature: "Multi-Track Recording Setup",
    aspectClass: "aspect-square"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    caption: "Vocal Booth",
    feature: "Blue & Rode Microphones",
    aspectClass: "aspect-[3/4]"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    caption: "Instrument Collection",
    feature: "Kurzweil K2600 & Akai MPK 88",
    aspectClass: "aspect-video"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    caption: "Drum Recording",
    feature: "Live & Programmed Options",
    aspectClass: "aspect-[4/3]"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800",
    caption: "Monitoring Suite",
    feature: "M-Audio BX 8 Deluxe",
    aspectClass: "aspect-square"
  },
];

const studioFeatures = [
  {
    icon: Mic2,
    title: "Recording",
    description: "Shure, Rode, Blue microphones with Focusrite preamps"
  },
  {
    icon: Headphones,
    title: "Monitoring",
    description: "M-Audio BX 8 Deluxe with HD 380 Pro headphones"
  },
  {
    icon: Music2,
    title: "Virtual Instruments",
    description: "Native Instruments Komplete 8 & IK Multimedia"
  },
  {
    icon: Disc3,
    title: "Processing",
    description: "Waves, AVID, Valhalla plugins for mixing & mastering"
  },
];

const recentWork = [
  {
    id: "1",
    type: "spotify",
    title: "Allegro Fudge - Maximum City",
    description: "Full album production",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    url: "https://spotify.com"
  },
  {
    id: "2",
    type: "youtube",
    title: "Parvaaz - Behosh EP",
    description: "Psychedelic Rock Blues",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    url: "https://youtube.com"
  },
  {
    id: "3",
    type: "spotify",
    title: "Jason Zac Band - Back in Time",
    description: "Instrumental Piano Album",
    thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
    url: "https://spotify.com"
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
            State-of-the-Art <span className="gradient-text">Recording Facility</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A fully digital facility with professional equipment. We've invested in what really matters —
            delivering the best sounding product for your music.
          </p>
        </div>

        {/* Studio Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {studioFeatures.map((feature, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-4 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Masonry Gallery */}
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

        {/* Recent Work */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Productions</h3>
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
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium">{work.title}</h4>
                      <p className="text-sm text-muted-foreground">{work.description}</p>
                    </div>
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
