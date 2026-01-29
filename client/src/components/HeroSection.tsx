import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Music, Mic2, Users, Handshake, ArrowRight, Disc3, Headphones, Waves } from "lucide-react";

type FormTab = 'learn' | 'record' | 'rehearse' | 'collaborate';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<FormTab>('learn');
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
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
              <Disc3 className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
              Recording Studio & Tech Resources
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">Nathaniel</span>
              <span className="block gradient-text">Production House</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Professional recording studio services including mixing, mastering, arrangement, 
              and production. Your one-stop tech resource for music education.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mic2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Recording</p>
                  <p className="text-sm text-muted-foreground">Studio Quality</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Mixing</p>
                  <p className="text-sm text-muted-foreground">Pro Audio</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Production</p>
                  <p className="text-sm text-muted-foreground">Full Service</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-border/50 bg-card/80 backdrop-blur glow-orange">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FormTab)}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="learn" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-learn">
                    <Music className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Learn</span>
                  </TabsTrigger>
                  <TabsTrigger value="record" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-record">
                    <Mic2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Record</span>
                  </TabsTrigger>
                  <TabsTrigger value="rehearse" className="flex items-center gap-1 text-xs sm:text-sm" data-testid="tab-rehearse">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Rehearse</span>
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

                  <TabsContent value="learn" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Instrument</Label>
                        <Select data-testid="select-instrument">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="piano">Piano / Keyboard</SelectItem>
                            <SelectItem value="guitar">Guitar</SelectItem>
                            <SelectItem value="vocals">Vocals</SelectItem>
                            <SelectItem value="drums">Drums</SelectItem>
                            <SelectItem value="production">Music Production</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Level</Label>
                        <Select data-testid="select-level">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

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
                            <SelectItem value="podcast">Podcast</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Select data-testid="select-duration">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="half-day">Half Day</SelectItem>
                            <SelectItem value="full-day">Full Day</SelectItem>
                            <SelectItem value="multi-day">Multiple Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rehearse" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Band Size</Label>
                        <Select data-testid="select-band-size">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo</SelectItem>
                            <SelectItem value="duo">Duo</SelectItem>
                            <SelectItem value="band-small">Band (3-5)</SelectItem>
                            <SelectItem value="band-large">Band (6+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Hours Needed</Label>
                        <Select data-testid="select-hours">
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 Hours</SelectItem>
                            <SelectItem value="4">4 Hours</SelectItem>
                            <SelectItem value="8">Full Day</SelectItem>
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
                            <SelectItem value="songwriting">Songwriting</SelectItem>
                            <SelectItem value="production">Production</SelectItem>
                            <SelectItem value="arrangement">Arrangement</SelectItem>
                            <SelectItem value="mixing">Mixing/Mastering</SelectItem>
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
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="jazz">Jazz</SelectItem>
                            <SelectItem value="classical">Classical</SelectItem>
                            <SelectItem value="electronic">Electronic</SelectItem>
                            <SelectItem value="indian">Indian Classical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project..."
                      className="resize-none"
                      data-testid="input-message"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit">
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
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
