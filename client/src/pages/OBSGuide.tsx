import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SEOHead, { schemas } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AlertCircle,
  Music,
  MonitorPlay,
  Cable,
  Tablet,
  Smartphone,
  Speaker,
  Radio,
  Tv,
  HardDrive,
  Users,
  GraduationCap,
  MessageSquare,
  Volume2,
  Eye,
  Play,
  Layers,
  Zap,
  Globe,
  Router,
  XCircle,
  Sliders,
  Layout,
  Crop,
  Maximize2,
  LayoutGrid,
  FileVideo,
  Youtube,
  Cog,
  Hash
} from "lucide-react";

const guideGoals = [
  "Set up professional-quality online music lessons using Zoom & OBS Studio",
  "Configure multi-camera angles to show both your face AND instrument",
  "Achieve studio-quality audio that doesn't get destroyed by noise reduction",
  "Record lessons, assignments, and performances for future reference",
  "Stream live to YouTube or other platforms directly from OBS",
  "Create a scalable setup that works anywhere - home, studio, or on the road",
  "Integrate iPads, iPhones, Android phones, DSLRs, and webcams seamlessly",
  "Master the essential settings that 95% of online music teachers miss"
];

const thingsYouCanDo = [
  { icon: Video, text: "Multi-angle video combining face + instrument views" },
  { icon: Play, text: "Record lessons, assignments, and performances" },
  { icon: MonitorPlay, text: "Stream directly to YouTube in better quality than Zoom" },
  { icon: Camera, text: "Use your phone as a professional second camera" },
  { icon: Volume2, text: "Route audio from multiple apps with full control" },
  { icon: Layers, text: "Show MIDI piano rolls, sheet music, and apps on screen" },
  { icon: Layout, text: "Switch between scenes with hotkeys or MIDI controller" }
];

const setupRequirements = [
  {
    icon: Cable,
    title: "Ethernet Connection",
    description: "WiFi is 100x slower than a direct cable. Use LAN/Ethernet/RJ45 for serious lessons.",
    critical: true
  },
  {
    icon: Monitor,
    title: "Zoom Desktop App",
    description: "Never use the browser version - download the actual Zoom app and keep it updated.",
    critical: true
  },
  {
    icon: Video,
    title: "OBS Studio (Free)",
    description: "Free, open-source, and powers every major streamer. Essential for multi-camera setups.",
    critical: true
  },
  {
    icon: Volume2,
    title: "Quiet Environment",
    description: "Zoom's noise reduction treats instruments as noise. Quiet room = better music quality.",
    critical: true
  },
  {
    icon: Tv,
    title: "External Display (Optional)",
    description: "Project to TV/monitor for better viewing. Use HDMI, Chromecast, or wireless projection.",
    critical: false
  },
  {
    icon: Smartphone,
    title: "Second Camera (Phone)",
    description: "Your phone becomes a pro camera with DroidCam (Android) or Camo (iPhone).",
    critical: false
  },
  {
    icon: Users,
    title: "Fallback: Two Zoom Accounts",
    description: "Simple alternative - join from two devices for different angles. Works for everyone.",
    critical: false
  },
];

const essentialHardware = [
  {
    icon: Keyboard,
    title: "Digital Piano/Keyboard",
    description: "MIDI-capable for visualization apps. USB or 5-pin MIDI connection to computer.",
  },
  {
    icon: HardDrive,
    title: "Audio Interface",
    description: "Focusrite Scarlett (₹8,000-15,000) is the standard. Handles mic + instrument inputs.",
  },
  {
    icon: Mic2,
    title: "Quality Microphone",
    description: "Any condenser or dynamic mic. SE Electronics, Audio-Technica, or Shure are great options.",
  },
  {
    icon: Headphones,
    title: "Monitoring Headphones",
    description: "Closed-back headphones to hear yourself and students clearly without feedback.",
  },
  {
    icon: Cable,
    title: "Ethernet Cable",
    description: "Cat5e or Cat6, long enough to reach your router. This single upgrade transforms your lessons.",
  },
  {
    icon: Camera,
    title: "Elgato Cam Link 4K",
    description: "HDMI to USB adapter - turns any DSLR/mirrorless camera into a webcam.",
  },
  {
    icon: Radio,
    title: "Router with UPS",
    description: "Power backup for your router. Internet cuts during lessons are career-damaging.",
  },
  {
    icon: Smartphone,
    title: "Phone + Charging Cable",
    description: "Your old phone works perfectly. Lightning/USB-C cable for wired connection + power.",
  },
  {
    icon: Settings,
    title: "Phone Stand/Mount",
    description: "Position your phone at the right angle for overhead shots of your instrument.",
  },
];

const audioMidiApps = [
  {
    name: "Loopback",
    developer: "Rogue Amoeba (Mac)",
    url: "https://rogueamoeba.com/loopback",
    description: "The ultimate audio routing tool. Control levels from DAW, Spotify, Piano plugins, and mic - all going to Zoom independently.",
    free: false,
    essential: true
  },
  {
    name: "SoundSource",
    developer: "Rogue Amoeba (Mac)",
    url: "https://rogueamoeba.com/soundsource/",
    description: "Control what YOU hear from students. Mute unwanted audio, reduce Zoom volume to prevent ear fatigue.",
    free: false,
    essential: true
  },
  {
    name: "VoiceMeeter",
    developer: "VB-Audio (Windows)",
    url: "https://vb-audio.com/Voicemeeter/",
    description: "Windows equivalent of Loopback. Virtual audio mixer for routing multiple sources to Zoom.",
    free: true,
    essential: true
  },
  {
    name: "Pianoteq",
    developer: "Modartt",
    url: "https://www.modartt.com/pianoteq",
    description: "Professional piano plugin. Used for live concerts and recordings. Works with any MIDI keyboard.",
    free: false,
    essential: false
  },
  {
    name: "Chordie (Cauti)",
    developer: "Matkat Music",
    url: "https://www.chordieapp.com/",
    description: "Shows real-time chord names, MIDI piano roll, and manuscript view. Perfect for YouTube videos and teaching.",
    free: false,
    essential: false
  },
  {
    name: "Reaper",
    developer: "Cockos",
    url: "https://reaper.fm/",
    description: "Full DAW with unlimited trial. EQ, compression, noise removal - professional audio processing.",
    free: true,
    essential: false
  },
];

const webcamApps = [
  {
    name: "Reincubate Camo",
    platform: "iPhone/Mac",
    url: "https://reincubate.com/camo/",
    description: "Transforms iPhone into a professional webcam. Full control over exposure, saturation, brightness. Works wired or wireless.",
    free: false,
    recommended: true
  },
  {
    name: "DroidCam",
    platform: "Android/Windows/Linux",
    url: "https://droidcam.en.uptodown.com/android",
    description: "Your Android phone becomes a webcam. Works wired via USB or wireless over WiFi. Completely free.",
    free: true,
    recommended: true
  },
  {
    name: "OBS Ninja",
    platform: "Any Browser",
    url: "https://obs.ninja/",
    description: "Wireless video from any device. Just scan a QR code and your video appears in OBS. No app needed.",
    free: true,
    recommended: false
  },
  {
    name: "Paper",
    platform: "iPad",
    url: "https://paper.wetransfer.com/",
    description: "Draw notes and diagrams during lessons. More personal than PDFs or PowerPoints. Students love it.",
    free: true,
    recommended: false
  },
];

const zoomTips = [
  {
    title: "Keep Your Video Camera ON",
    description: "It engages the teacher and improves your understanding. Compulsory for children - no exceptions!",
    important: true
  },
  {
    title: "Use Laptop/Desktop, Not Phone",
    description: "Teachers share notes and visuals constantly. You'll miss everything on a tiny phone screen.",
    important: true
  },
  {
    title: "Background Noise: Set to LOW",
    description: "Under Settings → Audio → Suppress Background Noise → LOW. This preserves your instrument sound.",
    important: true
  },
  {
    title: "Ask Questions by Unmuting",
    description: "Don't use chat or virtual hand-raising. Just unmute and ask directly - it's a music lesson, not a webinar.",
    important: true
  },
  {
    title: "Microphone Levels Check",
    description: "Test before class. If your audio distorts or 'jars', reduce mic volume in Zoom settings.",
    important: true
  },
  {
    title: "Camera + Lighting Setup",
    description: "We need to see your face AND your instrument clearly. Position camera and light source properly.",
    important: true
  },
  {
    title: "Ethernet Over WiFi",
    description: "A LAN cable is 100x more stable than WiFi. Just plug directly into your router.",
    important: false
  },
  {
    title: "Allow Host to Unmute",
    description: "When joining, allow the teacher to unmute you. Makes class management smoother.",
    important: false
  },
  {
    title: "Update Zoom Regularly",
    description: "New features and bug fixes. Always use the desktop app, never browser.",
    important: false
  },
  {
    title: "Project to TV if Possible",
    description: "HDMI cable or Chromecast to see your teacher on the big screen. Game-changer for learning.",
    important: false
  },
  {
    title: "Organize Your Files",
    description: "Keep a dedicated folder for recordings and notes. Back it up - you'll thank yourself later.",
    important: false
  },
  {
    title: "Use OBS for Multi-Camera",
    description: "Combine your webcam + phone camera into one Zoom feed. Free and works perfectly.",
    important: false
  },
];

const obsSettingsGuide = [
  {
    section: "General",
    icon: Settings,
    settings: [
      { name: "Theme", value: "Dark (easier on eyes for long sessions)", important: false },
      { name: "Output", value: "Leave as default unless you know what you're doing", important: false }
    ]
  },
  {
    section: "Stream",
    icon: Youtube,
    settings: [
      { name: "Service", value: "YouTube - RTMPS for better quality live streams", important: true },
      { name: "Server", value: "Primary YouTube ingest server", important: false },
      { name: "Stream Key", value: "Get from YouTube Studio → Go Live → Stream", important: true }
    ]
  },
  {
    section: "Output",
    icon: FileVideo,
    settings: [
      { name: "Output Mode", value: "Advanced (more control)", important: true },
      { name: "Encoder", value: "Hardware (NVENC/AMD) if available, otherwise x264", important: true },
      { name: "Bitrate", value: "4500-5000 Kbps for 1080p streaming", important: true },
      { name: "Recording Format", value: "MP4 (more compatible than FLV)", important: true },
      { name: "Audio Bitrate", value: "160 Kbps minimum, 320 for hi-fi", important: false }
    ]
  },
  {
    section: "Audio",
    icon: Volume2,
    settings: [
      { name: "Sample Rate", value: "48 kHz (highest available)", important: true },
      { name: "Channels", value: "Stereo", important: true },
      { name: "Desktop Audio", value: "Your sound card or audio interface", important: false },
      { name: "Mic/Aux Audio", value: "Your microphone or Loopback virtual device", important: true }
    ]
  },
  {
    section: "Video",
    icon: Monitor,
    settings: [
      { name: "Base Resolution", value: "1920x1080 (Full HD)", important: true },
      { name: "Output Resolution", value: "1920x1080 for quality, 1280x720 for speed", important: false },
      { name: "FPS", value: "30 for lessons (60 only if gaming)", important: false }
    ]
  },
  {
    section: "Hotkeys",
    icon: Keyboard,
    settings: [
      { name: "Scene Switching", value: "Assign keys or MIDI notes to each scene", important: true },
      { name: "Start/Stop Recording", value: "Quick access without clicking", important: true },
      { name: "Pro Tip", value: "Use a small MIDI keyboard (25-32 keys) for scene changes during class", important: true }
    ]
  }
];

const sceneExamples = [
  {
    name: "Face View",
    description: "Your main camera showing your face for personal interaction",
    sources: ["DSLR via Cam Link", "Webcam", "iPhone via Camo"]
  },
  {
    name: "Top/Overhead View",
    description: "Bird's eye view of your instrument (piano keys, guitar fretboard)",
    sources: ["Phone on stand pointing down", "Mounted webcam above instrument"]
  },
  {
    name: "Notes/Drawing",
    description: "iPad or tablet for drawing explanations and annotations",
    sources: ["iPad via Lightning cable", "Window capture of Paper app"]
  },
  {
    name: "Piano Roll",
    description: "MIDI visualization showing which keys are being played",
    sources: ["Window capture of Chordie/Cauti app", "Piano visualization software"]
  },
  {
    name: "Desktop Share",
    description: "Share your entire screen for sheet music, DAW, or tutorials",
    sources: ["Display Capture", "Window Capture"]
  },
  {
    name: "Class View (Combined)",
    description: "Multiple sources arranged for a complete lesson layout",
    sources: ["Face camera + iPad notes + Instrument overhead"]
  }
];

const routerRecommendations = [
  {
    name: "TP-Link Archer AX21",
    price: "₹3,500 - ₹4,500",
    description: "WiFi 6 router with excellent range. Great value for most homes.",
    recommended: true
  },
  {
    name: "TP-Link Archer C6",
    price: "₹2,500 - ₹3,000",
    description: "Budget-friendly with good performance. AC1200 dual-band.",
    recommended: false
  },
  {
    name: "Netgear Nighthawk R7000",
    price: "₹8,000 - ₹10,000",
    description: "Premium option with advanced QoS for prioritizing video traffic.",
    recommended: false
  }
];

const videoGuides = [
  { id: "ugY4dTJiwxM", title: "Part 1: Online Music Lessons Setup & Requirements" },
  { id: "2O0CqcfJb9I", title: "Part 2: Best Zoom Settings for Music Classes" },
  { id: "xuCCAYiXqE4", title: "Part 3: OBS Studio Complete Guide for Musicians" },
];

const audioInterfaceRecommendations = [
  {
    name: "Focusrite Scarlett Solo",
    price: "₹8,000 - ₹9,000",
    channels: "1 XLR + 1 Instrument",
    description: "Perfect starter interface. One mic input and one instrument input.",
    level: "Beginner"
  },
  {
    name: "Focusrite Scarlett 2i2",
    price: "₹12,000 - ₹14,000",
    channels: "2 XLR/Instrument Combo",
    description: "Two combo inputs - perfect for mic + keyboard DI. Industry standard.",
    level: "Recommended"
  },
  {
    name: "PreSonus AudioBox USB 96",
    price: "₹9,000 - ₹11,000",
    channels: "2 XLR/Instrument Combo",
    description: "Great alternative to Scarlett. Includes Studio One Artist DAW.",
    level: "Beginner"
  },
  {
    name: "Universal Audio Volt 2",
    price: "₹18,000 - ₹20,000",
    channels: "2 XLR/Instrument Combo",
    description: "Vintage preamp mode for warmth. Built-in compressor option.",
    level: "Intermediate"
  },
  {
    name: "Antelope Audio Zen Studio+",
    price: "₹1,50,000+",
    channels: "12 inputs, 8 outputs",
    description: "Professional studio interface. For serious production work.",
    level: "Professional"
  }
];

export default function OBSGuide() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Ultimate Music Lesson Guide 2026 | OBS + Zoom Setup for Online Teaching"
        description="The complete 2026 guide to teaching and learning music online. Professional multi-camera setup, studio-quality audio, OBS Studio configuration, and Zoom optimization for musicians of all ages and skill levels."
        path="/obs-guide"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Globe className="h-3 w-3 mr-1" />
                2026 Edition | International Standard
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                The Ultimate <span className="gradient-text">Music Lesson Guide</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
                Everything you need to teach or learn music online with professional quality. 
                OBS Studio + Zoom setup for musicians of all ages - from 10-year-olds to seasoned professionals.
              </p>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
                Based on years of experience teaching thousands of online lessons at Nathaniel School of Music. 
                This guide covers the exact setup we use for world-class virtual music education.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/obs-guide.pdf" download>
                  <Button size="lg" data-testid="button-download-pdf">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Guide
                  </Button>
                </a>
                <a href="#quick-start">
                  <Button size="lg" variant="outline" data-testid="button-get-started">
                    <Play className="h-4 w-4 mr-2" />
                    Quick Start Guide
                  </Button>
                </a>
              </div>
            </div>

            {/* Main Setup Image */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src="/images/obs-guide/img-014.png"
                  alt="Professional Music Class Setup with Multi-Camera Virtual Cam"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                My actual teaching setup - iPad for notes, DSLR via Cam Link, iPhone overhead via Camo, with Loopback for audio mixing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Camera Layouts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img src="/images/obs-guide/img-023.png" alt="Multi-cam view combining face and instrument" className="w-full h-auto border-t" />
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Face + instrument + notes - all visible to your students simultaneously.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Scene Switching</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img src="/images/obs-guide/img-026.png" alt="OBS Scene switching with hotkeys" className="w-full h-auto border-t" />
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Switch between views instantly using keyboard hotkeys or MIDI controller.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why This Guide Matters */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">The Problem</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Why 95% of Online Music Lessons <span className="gradient-text">Sound Terrible</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" />
                    The Default Zoom Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">Zoom treats your piano/guitar as "noise" and suppresses it</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">Mono audio - loses all the richness of your instrument</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">Can only show ONE camera angle at a time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">WiFi drops and freezes mid-lesson</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm">No recording of lessons for later review</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    With This Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Full stereo audio in "High Fidelity Music Mode"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Multi-camera showing face + hands + notes simultaneously</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">100x faster internet with simple Ethernet cable</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Record every lesson in high quality for students</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Stream to YouTube with better quality than Zoom itself</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {guideGoals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    What OBS + Zoom Enables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {thingsYouCanDo.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Video Tutorials</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Watch the <span className="gradient-text">Complete Series</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These videos walk you through every step. Watch them, then use this guide as a reference.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {videoGuides.map((video) => (
                <YouTubeEmbed
                  key={video.id}
                  videoId={video.id}
                  title={video.title}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start - Internet Setup */}
        <section className="py-16 bg-card" id="quick-start">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Step 1: Internet</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Your Internet is <span className="gradient-text">Probably the Problem</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Before anything else, fix your internet. This single change will transform your online lessons.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="mb-8 border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Cable className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Use an Ethernet Cable - Not WiFi</h3>
                      <p className="text-muted-foreground mb-4">
                        WiFi might show "100 Mbps" but the actual throughput for video is unstable. 
                        A simple Ethernet/LAN/RJ45 cable can be <strong>100 times faster</strong> and infinitely more stable.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Wifi className="h-4 w-4" />
                            WiFi Problems
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Signal drops through walls</li>
                            <li>• Neighbors' networks interfere</li>
                            <li>• Distance from router matters</li>
                            <li>• Microwaves cause interference</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Cable className="h-4 w-4 text-primary" />
                            Ethernet Benefits
                          </h4>
                          <ul className="text-sm space-y-1">
                            <li>• Direct, stable connection</li>
                            <li>• No interference possible</li>
                            <li>• Consistent speed always</li>
                            <li>• Upload 10GB in minutes vs hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-xl font-semibold mb-4">Recommended Routers (Upgrade from ISP Router)</h3>
              <p className="text-sm text-muted-foreground mb-6">
                The router your ISP provides is usually garbage. These are affordable upgrades that make a real difference.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {routerRecommendations.map((router, index) => (
                  <Card key={index} className={router.recommended ? "border-primary/30" : ""} data-testid={`card-router-${index}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{router.name}</h4>
                        {router.recommended && (
                          <Badge variant="default" className="text-xs">Recommended</Badge>
                        )}
                      </div>
                      <p className="text-lg font-bold mb-2">{router.price}</p>
                      <p className="text-sm text-muted-foreground">{router.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Setup Requirements */}
        <section className="py-16 bg-background" id="setup">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Step 2: Basics</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Setup & Tech <span className="gradient-text">Requirements</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get these fundamentals right before moving to OBS. Critical items are marked.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {setupRequirements.map((req, index) => (
                <Card 
                  key={index} 
                  className={`hover-elevate ${req.critical ? 'border-primary/30 bg-primary/5' : ''}`}
                  data-testid={`requirement-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <req.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{req.title}</h3>
                          {req.critical && (
                            <Badge variant="destructive" className="text-xs">Critical</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-xl">
                <img
                  src="/images/obs-guide/img-015.png"
                  alt="Complete Hardware Setup Overview"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Essential Hardware */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Hardware</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Essential <span className="gradient-text">Hardware</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start with what you have. Most of this you already own. Upgrade strategically over time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {essentialHardware.map((item, index) => (
                <Card key={index} className="hover-elevate" data-testid={`card-hardware-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Audio Interface Recommendations */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Audio Setup</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Audio Interface <span className="gradient-text">Recommendations</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                An audio interface handles your microphone and instrument inputs. This is the foundation of good sound.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {audioInterfaceRecommendations.slice(0, 4).map((item, index) => (
                <Card key={index} className={`hover-elevate ${item.level === "Recommended" ? "border-primary/30 bg-primary/5" : ""}`} data-testid={`card-audio-interface-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={item.level === "Recommended" ? "default" : "secondary"} className="text-xs">
                        {item.level}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-lg font-bold mb-2">{item.price}</p>
                    <p className="text-xs text-muted-foreground mb-2">{item.channels}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* OBS Settings Deep Dive */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Step 3: OBS Configuration</Badge>
              <h2 className="text-3xl font-bold mb-4">
                OBS Settings <span className="gradient-text">Deep Dive</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OBS is free and open-source. It powers every major streamer and is perfect for music lessons.
                Here are the exact settings you need.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {obsSettingsGuide.map((section, index) => (
                <Card key={index} data-testid={`card-obs-setting-${index}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <section.icon className="h-5 w-5 text-primary" />
                      {section.section}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.settings.map((setting, settingIndex) => (
                        <div 
                          key={settingIndex} 
                          className={`p-3 rounded-lg ${setting.important ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-medium text-sm">{setting.name}</h4>
                              <p className="text-sm text-muted-foreground">{setting.value}</p>
                            </div>
                            {setting.important && (
                              <Badge variant="default" className="text-xs shrink-0">Important</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Scenes & Sources */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Step 4: Scenes</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Creating <span className="gradient-text">Scenes & Sources</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Scenes are different views you can switch between. Each scene contains Sources (cameras, apps, screens).
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* How to Create Scene */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    How to Create a Scene
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0 text-sm">1</div>
                        <div>
                          <h4 className="font-medium">Click + under Scenes</h4>
                          <p className="text-sm text-muted-foreground">Name it something descriptive like "Face View" or "Piano Top"</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0 text-sm">2</div>
                        <div>
                          <h4 className="font-medium">Add Sources with + under Sources</h4>
                          <p className="text-sm text-muted-foreground">Choose "Video Capture Device" for cameras, "Window Capture" for apps</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0 text-sm">3</div>
                        <div>
                          <h4 className="font-medium">Select Your Device</h4>
                          <p className="text-sm text-muted-foreground">Cam Link, Camo, DroidCam, or your webcam will appear in the list</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0 text-sm">4</div>
                        <div>
                          <h4 className="font-medium">Resize & Crop</h4>
                          <p className="text-sm text-muted-foreground">Drag corners to resize. Hold ALT and drag edges to crop.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0 text-sm">5</div>
                        <div>
                          <h4 className="font-medium">Add More Sources</h4>
                          <p className="text-sm text-muted-foreground">Layer multiple cameras/apps in one scene for combined views</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-border/50">
                      <img src="/images/obs-guide/img-020.png" alt="OBS Scenes and Sources panel" className="w-full h-auto" />
                      <p className="p-2 text-xs text-center bg-muted/30">The Scenes and Sources panels in OBS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scene Examples */}
              <h3 className="text-xl font-semibold mb-6">Recommended Scene Setups</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sceneExamples.map((scene, index) => (
                  <Card key={index} className="hover-elevate" data-testid={`card-scene-${index}`}>
                    <CardContent className="p-5">
                      <h4 className="font-semibold mb-2">{scene.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{scene.description}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                        {scene.sources.map((source, sourceIndex) => (
                          <Badge key={sourceIndex} variant="outline" className="text-xs mr-1 mb-1">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Audio & MIDI Apps */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Software</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Audio Routing <span className="gradient-text">Apps</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These apps let you control exactly what audio goes to your students. 
                Mix your mic, piano plugin, Spotify, and DAW independently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {audioMidiApps.map((app, index) => (
                <Card key={index} className={`hover-elevate ${app.essential ? 'border-primary/30' : ''}`} data-testid={`card-audio-app-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{app.name}</h3>
                        <p className="text-xs text-muted-foreground">{app.developer}</p>
                      </div>
                      <div className="flex gap-1">
                        {app.essential && (
                          <Badge variant="default" className="text-xs">Essential</Badge>
                        )}
                        <Badge variant={app.free ? "outline" : "secondary"} className="text-xs">
                          {app.free ? "Free" : "Paid"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-app-${index}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loopback Explanation */}
            <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">How Audio Routing Works (Loopback Example)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Loopback creates a virtual audio device that combines multiple sources. Here's my setup:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Sources I Route to Students:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Audio Interface (my mic + piano DI)</li>
                          <li>• Pianoteq (virtual piano plugin)</li>
                          <li>• Reaper DAW (for playback)</li>
                          <li>• Spotify (for reference tracks)</li>
                          <li>• MuseScore (notation playback)</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">What Students Hear:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Combined STEREO signal via Zoom</li>
                          <li>• Each source at controlled levels</li>
                          <li>• I can mute any source independently</li>
                          <li>• No feedback or echo issues</li>
                          <li>• Professional broadcast quality</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      I use <strong>SoundSource</strong> to control what I hear FROM students - so I can reduce their volume if they're too loud, preventing ear fatigue during long teaching days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Webcam Apps */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Multi-Camera</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Turn Your Phone into a <span className="gradient-text">Pro Camera</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your phone is already a high-quality camera. These apps make it work with OBS.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {webcamApps.map((app, index) => (
                <Card key={index} className={`hover-elevate ${app.recommended ? 'border-primary/30' : ''}`} data-testid={`card-webcam-app-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex gap-1">
                        {app.recommended && (
                          <Badge variant="default" className="text-xs">Top Pick</Badge>
                        )}
                        <Badge variant={app.free ? "outline" : "secondary"} className="text-xs">
                          {app.free ? "Free" : "Paid"}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">{app.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{app.platform}</p>
                    <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-webcam-${index}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Zoom Settings */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Step 5: Zoom Configuration</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Zoom Settings for <span className="gradient-text">Musicians</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These settings are CRITICAL. Default Zoom settings destroy music quality.
              </p>
            </div>

            <Tabs defaultValue="audio" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="audio" className="gap-2" data-testid="tab-audio">
                  <Volume2 className="h-4 w-4" />
                  Audio Settings
                </TabsTrigger>
                <TabsTrigger value="video" className="gap-2" data-testid="tab-video">
                  <Video className="h-4 w-4" />
                  Video Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="audio">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                          CRITICAL: Background Noise Suppression
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Go to Settings → Audio → Suppress Background Noise and set it to <strong>LOW</strong>.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Zoom's noise reduction algorithm is designed for voice. It treats your piano, guitar, or drums as "noise" and suppresses it!
                          <strong> Never use HIGH for music lessons.</strong>
                        </p>
                      </div>
                      
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Music className="h-5 w-5 text-primary" />
                          Enable Music & Professional Audio
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Under Settings → Audio → Music and professional audio, enable these options:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>Show in-meeting option to enable Original Sound</strong>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>High Fidelity Music Mode</strong> (uses more bandwidth, worth it)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>Echo Cancellation</strong> (prevents feedback)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>Stereo Audio</strong> (Zoom defaults to mono - fix this!)
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Speaker & Microphone Selection</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          <strong>SPEAKER (Output):</strong> Your headphones, speakers, or audio interface output.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>MICROPHONE (Input):</strong> Your audio interface, OR if using Loopback, select your virtual device (e.g., "Nathaniel Studio") to send your mixed audio.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl overflow-hidden border border-border/50">
                          <img src="/images/obs-guide/img-016.png" alt="Zoom Audio Settings" className="w-full h-auto" />
                          <p className="p-2 text-xs text-center bg-muted/30">Audio input selection</p>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-border/50">
                          <img src="/images/obs-guide/img-017.png" alt="Zoom Music Mode" className="w-full h-auto" />
                          <p className="p-2 text-xs text-center bg-muted/30">Music mode settings</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="video">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <h4 className="font-semibold mb-2">Select OBS Virtual Camera</h4>
                        <p className="text-sm text-muted-foreground">
                          In OBS, click <strong>Start Virtual Camera</strong>. Then in Zoom Settings → Video → Camera, select <strong>OBS Virtual Camera</strong>.
                        </p>
                      </div>
                      
                      <div className="rounded-xl overflow-hidden border border-border/50 mb-4">
                        <img
                          src="/images/obs-guide/img-021.png"
                          alt="Zoom Camera Selection showing OBS Virtual Camera"
                          className="w-full h-auto"
                        />
                        <p className="p-2 text-xs text-center bg-muted/30">Select OBS Virtual Camera in Zoom's video settings</p>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Additional Video Settings</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Enable <strong>HD</strong> if your internet supports it
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>Adjust for low light</strong> - useful for home setups
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>49 participants</strong> in gallery view for large classes
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <strong>Hide non-video participants</strong> - see actual students
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-border/50">
                        <img
                          src="/images/obs-guide/img-023.png"
                          alt="Zoom Video Settings panel"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* OBS-Zoom Connection Steps */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Final Step</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Connecting <span className="gradient-text">OBS to Zoom</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Set Up Your Sources</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect all cameras (webcam, phone via Camo/DroidCam, DSLR via Cam Link) and audio devices.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Create Your Scenes</h4>
                        <p className="text-sm text-muted-foreground">
                          Build scenes for different views: Face, Instrument Overhead, Notes, Combined Class View.
                          Use the + button under Scenes, then add Sources to each.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Configure Hotkeys</h4>
                        <p className="text-sm text-muted-foreground">
                          Go to Settings → Hotkeys and assign keyboard shortcuts or MIDI notes to switch scenes instantly during lessons.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="p-2 bg-primary/20 rounded-full font-bold shrink-0">4</div>
                      <div>
                        <h4 className="font-semibold mb-1">Start Virtual Camera</h4>
                        <p className="text-sm text-muted-foreground">
                          Click <strong>Start Virtual Camera</strong> in OBS. Then in Zoom, select <strong>OBS Virtual Camera</strong> as your camera source. You're live!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Play className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Bonus: Record & Stream</h4>
                        <p className="text-sm text-muted-foreground">
                          Click <strong>Start Recording</strong> to save lessons locally. Connect YouTube in Stream settings to broadcast live with better quality than Zoom!
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl overflow-hidden border border-border/50">
                        <img src="/images/obs-guide/img-025.png" alt="OBS Recording Settings" className="w-full h-auto" />
                        <p className="p-2 text-xs text-center bg-muted/30">Recording and streaming controls</p>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-border/50">
                        <img src="/images/obs-guide/img-020.png" alt="OBS Scene Sources" className="w-full h-auto" />
                        <p className="p-2 text-xs text-center bg-muted/30">Managing your sources</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Zoom Tips for Students */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">For Students & Teachers</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Essential Tips for <span className="gradient-text">Online Music Lessons</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These tips come from teaching thousands of online lessons. Important items are highlighted.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {zoomTips.map((tip, index) => (
                <Card 
                  key={index} 
                  className={`hover-elevate ${tip.important ? 'border-primary/30 bg-primary/5' : ''}`}
                  data-testid={`card-zoom-tip-${index}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      {tip.important ? (
                        <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-semibold mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your <span className="gradient-text">Music Lessons?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Download the complete PDF guide and start setting up your professional online music lesson environment.
              Questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/obs-guide.pdf" download>
                <Button size="lg" className="gap-2" data-testid="button-download-pdf-bottom">
                  <Download className="h-5 w-5" />
                  Download PDF Guide
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-contact">
                  <MessageSquare className="h-5 w-5" />
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
