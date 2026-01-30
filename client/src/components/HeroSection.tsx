import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Music, Mic2, Users, Handshake, ArrowRight, Disc3, Headphones, Waves, Sliders, Award, CheckCircle } from "lucide-react";

type FormTab = 'record' | 'mix' | 'produce' | 'collaborate';

const highlights = [
  { icon: Mic2, label: "Recording", desc: "Multi-Track" },
  { icon: Sliders, label: "Mixing", desc: "All Genres" },
  { icon: Disc3, label: "Mastering", desc: "CD Ready" },
  { icon: Waves, label: "Production", desc: "Full Service" },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<FormTab>('record');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Inquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
                <Award className="h-4 w-4" />
                Professional Recording Studio
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Nathaniel</span>
                <span className="block gradient-text">Production House</span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              A state-of-the-art, <span className="text-foreground font-medium">fully digital facility</span> producing
              the cleanest, most defined sound you will find. Full service production including recording,
              editing, mixing, mastering, and musical arrangement.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="secondary" className="py-1.5">
                <CheckCircle className="h-3 w-3 mr-1" /> International Collaborations
              </Badge>
              <Badge variant="outline" className="py-1.5">
                <CheckCircle className="h-3 w-3 mr-1" /> Multi-Track Recording
              </Badge>
              <Badge variant="outline" className="py-1.5">
                <CheckCircle className="h-3 w-3 mr-1" /> All Genres
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border/50 bg-card/80 backdrop-blur glow-orange">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Start Your Project</CardTitle>
              <p className="text-sm text-muted-foreground">Tell us about your vision</p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FormTab)}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="record" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-record">
                    <Mic2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Record</span>
                  </TabsTrigger>
                  <TabsTrigger value="mix" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-mix">
                    <Headphones className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Mix</span>
                  </TabsTrigger>
                  <TabsTrigger value="produce" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-produce">
                    <Music className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Produce</span>
                  </TabsTrigger>
                  <TabsTrigger value="collaborate" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-collaborate">
                    <Handshake className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Collab</span>
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required data-testid="input-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+91" required data-testid="input-phone" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required data-testid="input-email" />
                  </div>

                  <TabsContent value="record" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Project Type</Label>
                        <Select data-testid="select-project-type">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single Track</SelectItem>
                            <SelectItem value="ep">EP (3-5 tracks)</SelectItem>
                            <SelectItem value="album">Album Production</SelectItem>
                            <SelectItem value="podcast">Podcast / Voice Over</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Genre</Label>
                        <Select data-testid="select-genre">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rock">Rock / Metal</SelectItem>
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="folk">Folk / Country</SelectItem>
                            <SelectItem value="blues">Blues / Jazz</SelectItem>
                            <SelectItem value="indian">Indian Classical</SelectItem>
                            <SelectItem value="christian">Christian / Devotional</SelectItem>
                            <SelectItem value="electronic">Electronic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mix" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Service Needed</Label>
                        <Select data-testid="select-mix-service">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mixing">Mixing Only</SelectItem>
                            <SelectItem value="mastering">Mastering Only</SelectItem>
                            <SelectItem value="both">Mixing & Mastering</SelectItem>
                            <SelectItem value="editing">Editing & Cleanup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Track Count</Label>
                        <Select data-testid="select-track-count">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Track</SelectItem>
                            <SelectItem value="3">3-5 Tracks</SelectItem>
                            <SelectItem value="10">6-10 Tracks</SelectItem>
                            <SelectItem value="album">Full Album</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="produce" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Production Type</Label>
                        <Select data-testid="select-production-type">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="arrangement">Arrangement</SelectItem>
                            <SelectItem value="orchestration">Orchestration</SelectItem>
                            <SelectItem value="songwriting">Songwriting Help</SelectItem>
                            <SelectItem value="full">Full Production</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Session Artists Needed?</Label>
                        <Select data-testid="select-session-artists">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">No, I have musicians</SelectItem>
                            <SelectItem value="some">Some instruments</SelectItem>
                            <SelectItem value="full">Full band needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="collaborate" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Collaboration Type</Label>
                        <Select data-testid="select-collab-type">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="album-design">Album Cover Design</SelectItem>
                            <SelectItem value="video">Video Recording</SelectItem>
                            <SelectItem value="jingle">Jingle / Ad Music</SelectItem>
                            <SelectItem value="score">Background Score</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Budget Range</Label>
                        <Select data-testid="select-budget">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="starter">Starter</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="custom">Custom / Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your project</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your musical vision, reference tracks, or any specific requirements..."
                      className="resize-none"
                      rows={3}
                      data-testid="input-message"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit">
                    {isSubmitting ? "Submitting..." : "Get a Quote"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
