import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Download, 
  Monitor, 
  Mic2, 
  Video, 
  Settings, 
  CheckCircle2, 
  ExternalLink,
  Wifi,
  Camera,
  Headphones,
  Keyboard,
  AlertCircle
} from "lucide-react";

const setupRequirements = [
  {
    icon: Wifi,
    title: "Stable Internet",
    description: "Use Ethernet cable (LAN/RJ45) for fastest, most reliable connection",
  },
  {
    icon: Monitor,
    title: "Latest Zoom App",
    description: "Download the latest version of Zoom - don't use web browser",
  },
  {
    icon: Video,
    title: "OBS Studio",
    description: "Free open-source software for virtual camera and scene management",
  },
  {
    icon: Camera,
    title: "Multi-Angle Setup",
    description: "Use phone as second camera via DroidCam or Camo app",
  },
];

const zoomSettings = [
  {
    category: "Video Settings",
    settings: [
      "Enable HD video if your internet supports it",
      "Choose your primary camera (Cam Link for DSLR, Camo for phone)",
      "Select OBS Virtual Camera when using OBS",
      "Enable 'Hide non-video participants' to focus on active students",
    ],
  },
  {
    category: "Audio Settings",
    settings: [
      "Choose your audio interface as Speaker output",
      "Set microphone to your audio interface or Loopback device",
      "Set 'Suppress Background Noise' to LOW for music",
      "Enable 'Music and Professional Audio' mode",
      "Turn ON 'High Fidelity Music Mode'",
      "Enable 'Use Stereo Audio'",
    ],
  },
];

const obsFeatures = [
  {
    title: "Virtual Camera",
    description: "Send your OBS scene to Zoom as a camera source",
  },
  {
    title: "Scene Switching",
    description: "Switch between face, top view, and screen share instantly",
  },
  {
    title: "Recording",
    description: "Record your entire class in high quality MP4 format",
  },
  {
    title: "Live Streaming",
    description: "Stream directly to YouTube for concerts and presentations",
  },
];

const recommendedApps = [
  { name: "OBS Studio", platform: "All", url: "https://obsproject.com", free: true },
  { name: "Camo (iPhone/Mac)", platform: "Apple", url: "https://reincubate.com/camo/", free: false },
  { name: "DroidCam", platform: "Android/Windows", url: "https://droidcam.en.uptodown.com/android", free: true },
  { name: "OBS Ninja", platform: "Web", url: "https://obs.ninja/", free: true },
  { name: "Loopback (Mac)", platform: "macOS", url: "https://rogueamoeba.com/loopback/", free: false },
  { name: "SoundSource (Mac)", platform: "macOS", url: "https://rogueamoeba.com/soundsource/", free: false },
];

const videoGuides = [
  { id: "ugY4dTJiwxM", title: "Part 1: Online Music Lessons Setup & Requirements" },
  { id: "2O0CqcfJb9I", title: "Part 2: Best Zoom Settings for Music Classes" },
  { id: "xuCCAYiXqE4", title: "Part 3: OBS Studio Complete Guide for Musicians" },
];

export default function OBSGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="OBS & Zoom Setup Guide for Online Music Lessons"
        description="Learn how to set up professional Zoom music classes using OBS Studio. Multi-angle camera setup, high-quality audio configuration, and recording tips for teachers and students."
        path="/obs-guide"
      />
      <Header />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Setup Guide</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Online Music Lessons with <span className="gradient-text">OBS & Zoom</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Learn how to set up professional-quality Zoom music classes using OBS Studio. 
                Multi-angle camera setup, high-quality audio, and recording capabilities.
              </p>
              <a href="/obs-guide.pdf" download>
                <Button size="lg" data-testid="button-download-pdf">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Guide
                </Button>
              </a>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {setupRequirements.map((req, index) => (
                <Card key={index} className="text-center hover-elevate" data-testid={`requirement-${index}`}>
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                      <req.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{req.title}</h3>
                    <p className="text-sm text-muted-foreground">{req.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {videoGuides.map((video, index) => (
                <YouTubeEmbed
                  key={video.id}
                  videoId={video.id}
                  title={video.title}
                />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Zoom Settings for Music
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {zoomSettings.map((section, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{section.category}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {section.settings.map((setting, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{setting}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <Card className="mt-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Keep your environment as quiet as possible. Zoom's noise reduction 
                          will treat your piano/guitar as noise if set to high. Use LOW setting for music.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    OBS Studio Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {obsFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      Scene Switching with Hotkeys
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      OBS allows you to set up hotkeys for switching scenes. You can use a 
                      MIDI controller or even a small keyboard to switch between your face, 
                      top view, and screen share instantly during class.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Recommended Apps & Software</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedApps.map((app, index) => (
                    <Card key={index} className="bg-muted/30">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{app.name}</h4>
                          <p className="text-sm text-muted-foreground">{app.platform}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={app.free ? "default" : "secondary"}>
                            {app.free ? "Free" : "Paid"}
                          </Badge>
                          <a href={app.url} target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="ghost">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for Teachers & Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Mic2 className="h-5 w-5 text-primary" />
                      For Teachers
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Keep video ON at all times to engage students",
                        "Use a laptop/desktop for better screen sharing",
                        "Consider using Loopback for advanced audio routing",
                        "Record your classes for student reference",
                        "Set up multiple camera angles for instrument teaching",
                        "Use paper app on iPad for live notation",
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-primary" />
                      For Students
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Keep video ON - teachers can't mentor invisible students",
                        "Use Ethernet cable for stable connection",
                        "Project class to TV/larger monitor if possible",
                        "Set up phone as secondary camera for your instrument",
                        "Keep environment quiet for better audio quality",
                        "Request permission to unmute and ask questions directly",
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
