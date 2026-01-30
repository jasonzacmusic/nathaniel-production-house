import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SEOHead from "@/components/SEOHead";
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
  Zap
} from "lucide-react";

const guideGoals = [
  "How to teach an Online Music Lesson with the best possible A/V quality using Zoom & OBS",
  "How to learn a Music Class virtually and set up your instrument & microphone for best results",
  "How to record assignments, homework, and the music class",
  "Best audio & video settings for Zoom & OBS (Open Broadcaster Software)",
  "Best 3rd party apps to integrate with Zoom & OBS",
  "Hardware & Software needed for the project",
  "Tips for Teachers & Students to optimize for online learning",
  "Scalability and portability considerations including live streaming"
];

const thingsYouCanDo = [
  { icon: Video, text: "Music Classes via Virtual Camera" },
  { icon: Play, text: "Recordings of Assignments/Homework" },
  { icon: MonitorPlay, text: "Streaming to YouTube & other platforms" },
  { icon: Camera, text: "Multi-Cam Setup for Face & Instrument" },
  { icon: Volume2, text: "High-quality Audio from DAW & Audio Interface" },
  { icon: Layers, text: "Advanced Screen Sharing" },
  { icon: Tablet, text: "Integrating iPads, DSLRs, WebCams & other Video Sources" }
];

const setupRequirements = [
  {
    icon: Cable,
    title: "Ethernet Connection",
    description: "Use internet with Cable (Ethernet, LAN, RJ45) - no WiFi for serious teaching",
  },
  {
    icon: Monitor,
    title: "Latest Zoom App",
    description: "Use latest version of Zoom App and not browser - this is critical",
  },
  {
    icon: Video,
    title: "OBS Virtual Cam",
    description: "Install latest version of OBS for Virtual Camera functionality",
  },
  {
    icon: Tv,
    title: "Projection",
    description: "Connect to Display/TV if possible for better viewing experience",
  },
  {
    icon: Volume2,
    title: "Quiet Environment",
    description: "Keep your environment as quiet as possible - Zoom's noise reduction treats your instrument as noise",
  },
  {
    icon: Smartphone,
    title: "Multi-Angle Apps",
    description: "DroidCam/Camo for multi-angle setup - your phone becomes a second camera",
  },
  {
    icon: Users,
    title: "Two Zoom Accounts",
    description: "Simple Setup - Join a lesson via two Zoom accounts for different camera angles",
  },
];

const essentialHardware = [
  {
    icon: Keyboard,
    title: "Keyboard/Digital Piano",
    description: "Must be able to send MIDI data to the computer for visualization and recording",
  },
  {
    icon: HardDrive,
    title: "Audio Interface",
    description: "Support your Input & Output requirements - this is non-negotiable for quality audio",
  },
  {
    icon: Headphones,
    title: "Quality Headphones/Speakers",
    description: "Good quality for monitoring your sound and the class audio",
  },
  {
    icon: Mic2,
    title: "Quality Microphone",
    description: "For teaching, learning, and recording - don't use your laptop mic",
  },
  {
    icon: Cable,
    title: "LAN Cable",
    description: "For high speed internet - WiFi is not reliable enough for lessons",
  },
  {
    icon: Camera,
    title: "Camlink (Elgato)",
    description: "HDMI to USB connection - lets you use a DSLR as a webcam",
  },
  {
    icon: Radio,
    title: "Wireless Router with UPS",
    description: "Power backup for your router - internet cuts during lessons are frustrating",
  },
  {
    icon: Smartphone,
    title: "Camera Options",
    description: "Mobile Phone, Webcam or DSLR - use what you have, upgrade when needed",
  },
  {
    icon: Settings,
    title: "Stands & Accessories",
    description: "Tripods, phone mounts, and stands to position your cameras at the right angles",
  },
];

const audioMidiApps = [
  {
    name: "Loopback",
    developer: "Rogue Amoeba",
    url: "https://rogueamoeba.com/loopback",
    description: "Control audio levels from multiple apps & interfaces. Essential for routing audio to Zoom.",
    free: false,
    image: "/images/obs-guide/img-022.png"
  },
  {
    name: "SoundSource",
    developer: "Rogue Amoeba",
    url: "https://rogueamoeba.com/soundsource/",
    description: "Monitor incoming audio, mute unwanted signals, control Zoom levels. Minimizes ear fatigue.",
    free: false,
    image: "/images/obs-guide/img-024.png"
  },
  {
    name: "Pianoteq",
    developer: "Modartt",
    url: "https://www.modartt.com/pianoteq",
    description: "High-quality piano plugin for MIDI playback and practice.",
    free: false,
    image: "/images/obs-guide/img-018.png"
  },
  {
    name: "Chordie",
    developer: "Matkat Music",
    url: "https://www.chordieapp.com/",
    description: "Piano MIDI Roll visualization - great for showing students what you're playing.",
    free: false,
    image: "/images/obs-guide/img-019.png"
  },
  {
    name: "Reaper",
    developer: "Cockos",
    url: "https://reaper.fm/",
    description: "DAW for EQ, noise removal, and professional audio processing.",
    free: true,
    image: null
  },
];

const webcamApps = [
  {
    name: "Reincubate Camo",
    platform: "iPhone/Mac",
    url: "https://reincubate.com/camo/",
    description: "Turn your iPhone into a professional webcam with full control over settings.",
    free: false,
  },
  {
    name: "DroidCam",
    platform: "Android/Windows",
    url: "https://droidcam.en.uptodown.com/android",
    description: "Use your Android phone as a webcam - works wired or wireless.",
    free: true,
  },
  {
    name: "OBS Ninja",
    platform: "Web Browser",
    url: "https://obs.ninja/",
    description: "Remote video sources via browser - bring in any device's camera to OBS.",
    free: true,
  },
];

const zoomTips = [
  {
    title: "Keep Your Video Camera ON",
    description: "It engages the teacher to interact with you personally and will improve your understanding of the class and your performance quality. Compulsory for Children!",
    important: true
  },
  {
    title: "Use a Laptop/Desktop/Tablet",
    description: "The teacher will be sharing important notes and visuals with you regularly. Mobile phones should be used as a \"worst-case scenario\" only.",
    important: true
  },
  {
    title: "Connect via Ethernet",
    description: "If possible, connect a LAN (Ethernet/RJ45) cable to the desktop/laptop. This will ensure faster and stable internet.",
    important: false
  },
  {
    title: "Background Noise Setting",
    description: "Under Settings -> Audio, set \"Suppress Background noise\" to LOW. Also, try to learn in as quiet an environment as possible. If your environment is noisy, revert back to AUTO setting.",
    important: true
  },
  {
    title: "Allow Host to Unmute",
    description: "We always \"Request permission to Unmute\" during a lesson. Please allow the host/teacher to do so prior to joining. This helps the teacher moderate the class efficiently.",
    important: false
  },
  {
    title: "Ask Questions Directly",
    description: "When you have a doubt, please don't use Chat, Virtual hand-raising, or any other \"modern\" feature. UNMUTE yourself and directly ask the question!",
    important: true
  },
  {
    title: "Use Latest Zoom APP",
    description: "Use the latest version of the Zoom APP for your operating system. Don't join via Browser - you'll miss important features.",
    important: false
  },
  {
    title: "Recording Policy",
    description: "All Nathaniel music lessons are recorded in High Quality. However, if you wish to record on your end, please request your respective teacher.",
    important: false
  },
  {
    title: "Organize Your Files",
    description: "Maintain a neat folder on your computer to store video recordings and notes. Try to also back up this data - you'll thank yourself later.",
    important: false
  },
  {
    title: "Microphone Levels",
    description: "Adjust your microphone so it doesn't distort and create a \"jarring\" sound. Under Audio Settings, you can reduce or increase the volume.",
    important: true
  },
  {
    title: "Video Quality Check",
    description: "What you see via the Zoom meeting is exactly what your teacher will see! Try to make the lesson as clear as possible. We need to see your instrument AND your face. Adjust camera and lighting accordingly.",
    important: true
  },
  {
    title: "Use OBS for Multi-Camera",
    description: "With OBS (free and open-source!), you can connect an additional camera like your phone to your laptop wirelessly or wired. Very helpful for all instrument learners!",
    important: false
  },
  {
    title: "Invest in Stable Internet",
    description: "Consider investing in a Wifi Router UPS (power backup), an additional connection, or a better ISP if needed. The experience will be perfect with decent internet!",
    important: false
  },
  {
    title: "Project to TV",
    description: "If possible, project your class to a TV for better viewing using an HDMI cable, Chromecast or any other method.",
    important: false
  },
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
        description="Complete guide to teaching and learning music online with OBS Studio and Zoom. Multi-angle camera setup, high-quality audio configuration, and recording tips for teachers and students at Nathaniel School of Music."
        path="/obs-guide"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Complete Setup Guide</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Zoom Music Lessons with <span className="gradient-text">OBS & 3rd Party Apps</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Everything you need to know about teaching and learning music online with professional-quality audio and video. 
                This guide covers Zoom settings, OBS setup, multi-camera configurations, and the apps that make it all work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/obs-guide.pdf" download>
                  <Button size="lg" data-testid="button-download-pdf">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Guide
                  </Button>
                </a>
                <a href="#setup">
                  <Button size="lg" variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </a>
              </div>
            </div>

            {/* Main Setup Image */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                <img
                  src="/images/obs-guide/img-014.png"
                  alt="My Music Class Setup with Virtual Cam"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                My actual teaching setup - iPad, DSLR via Camlink, iPhone via Camo App, with Loopback for audio mixing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Multi-Cam Layouts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img src="/images/obs-guide/img-023.png" alt="Multi-cam view" className="w-full h-auto border-t" />
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Example of a multi-camera layout in OBS combining face and instrument angles.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Scene Transitions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img src="/images/obs-guide/img-026.png" alt="OBS Scene switching" className="w-full h-auto border-t" />
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Using OBS to switch between different views like the piano roll and face camera.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What This Guide Covers */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Guide Contents</Badge>
              <h2 className="text-3xl font-bold mb-4">
                What This Guide <span className="gradient-text">Covers</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Goals of This Guide
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
                    Things You Can Do with OBS & Zoom
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
                These video tutorials walk you through every step of the setup process.
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

        {/* Setup Requirements */}
        <section className="py-16 bg-card" id="setup">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Getting Started</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Setup & Tech <span className="gradient-text">Requirements</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Before you start, make sure you have these basics covered. Trust me, getting these right makes everything else easier.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {setupRequirements.map((req, index) => (
                <Card key={index} className="hover-elevate" data-testid={`requirement-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <req.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{req.title}</h3>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Setup Screenshot */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-xl">
                <img
                  src="/images/obs-guide/img-015.png"
                  alt="Essential Hardware Setup"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Essential Hardware */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Hardware</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Recommended <span className="gradient-text">Essential Hardware</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                You don't need everything at once. Start with what you have and upgrade as needed. But these are the items that make a real difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {essentialHardware.map((item, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Audio & MIDI Apps */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Software</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Audio & MIDI <span className="gradient-text">Apps</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These apps help you route audio, control levels, and integrate your instruments with Zoom. Some are paid, but they're worth it if you're serious about quality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {audioMidiApps.map((app, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{app.name}</h3>
                        <p className="text-xs text-muted-foreground">{app.developer}</p>
                      </div>
                      <Badge variant={app.free ? "default" : "secondary"}>
                        {app.free ? "Free" : "Paid"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Audio Setup Explanation */}
            <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">How My Audio Signal Works</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      My Audio Signal coming to you is controlled using Loopback by Rogue Amoeba. This allows me to independently control the levels of multiple apps & audio interfaces sending audio from my computer. Zoom will then accept this combined STEREO signal from Loopback and send it out as the audio signal which you hear.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      My current setup needs my DAW, Reaper, MuseScore, Pianoteq, Spotify among others to go out at different levels along with my microphone & instrument DI signals coming from my audio interfaces.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I monitor the audio coming to me via SoundSource. That allows me to mute unwanted audio signals which might cause feedback and also control the level of ZOOM from time to time. As teachers/students, this minimizes ear fatigue.
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
                Webcam <span className="gradient-text">Apps</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Turn your phone into a second camera. This is game-changing for showing your hands, instrument, or different angles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {webcamApps.map((app, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant={app.free ? "default" : "secondary"}>
                        {app.free ? "Free" : "Paid"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{app.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{app.platform}</p>
                    <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">
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
              <Badge variant="outline" className="mb-4">Configuration</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Zoom Settings for <span className="gradient-text">Audio & Video</span>
              </h2>
            </div>

            <Tabs defaultValue="audio" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="audio" className="gap-2">
                  <Volume2 className="h-4 w-4" />
                  Audio Settings
                </TabsTrigger>
                <TabsTrigger value="video" className="gap-2">
                  <Video className="h-4 w-4" />
                  Video Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="audio">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Background Noise Suppression</h4>
                        <p className="text-sm text-muted-foreground">
                          Suppress background noise can be LOW unless you are in a noisy environment, then set it to AUTO. 
                          <strong className="text-foreground"> Never use HIGH for music - it will treat your instrument as noise!</strong>
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Music & Professional Audio</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Tick all the options under "Music & Professional Audio" assuming you have a good & stable internet connection:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            High Fidelity Music Mode
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Use Stereo Audio
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Echo Cancellation (Auto)
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Speaker & Microphone</h4>
                        <p className="text-sm text-muted-foreground">
                          <strong>SPEAKER</strong> is your Output source - usually your Headphones, in-built speaker, or Audio Interface.
                          <br /><br />
                          <strong>MICROPHONE</strong> is your Input source - could be your Webcam Mic, Audio Interface, or the "Hybrid" audio setup using an app like Loopback or Soundflower.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl overflow-hidden border border-border/50">
                          <img src="/images/obs-guide/img-016.png" alt="Zoom Audio Settings" className="w-full h-auto" />
                          <p className="p-2 text-xs text-center bg-muted/30">Audio input selection</p>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-border/50">
                          <img src="/images/obs-guide/img-017.png" alt="Zoom Music Mode" className="w-full h-auto" />
                          <p className="p-2 text-xs text-center bg-muted/30">Music mode configuration</p>
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
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Enable OBS Virtual Camera</h4>
                        <p className="text-sm text-muted-foreground">
                          First, enable VIRTUAL CAMERA in OBS. Then choose "OBS Virtual Camera" under Video then Camera in Zoom settings.
                        </p>
                      </div>
                      
                      <div className="rounded-xl overflow-hidden border border-border/50 mb-4">
                        <img
                          src="/images/obs-guide/img-021.png"
                          alt="Zoom Camera Selection"
                          className="w-full h-auto"
                        />
                        <p className="p-2 text-xs text-center bg-muted/30">Selecting OBS Virtual Camera in Zoom settings</p>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">HD Video</h4>
                        <p className="text-sm text-muted-foreground">
                          Enable HD if your internet bandwidth supports it. Customize your video settings if needed.
                        </p>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-border/50">
                        <img
                          src="/images/obs-guide/img-023.png"
                          alt="Zoom Video Settings"
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

        {/* OBS Connections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">OBS Setup</Badge>
              <h2 className="text-3xl font-bold mb-4">
                OBS <span className="gradient-text">Connections</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full text-primary font-bold shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Connect Your Sources</h4>
                        <p className="text-sm text-muted-foreground">
                          Make sure all your sources - Video & Audio are properly connected & installed.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full text-primary font-bold shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Create Scenes</h4>
                        <p className="text-sm text-muted-foreground">
                          Make SCENES using SOURCES depending on what you need. A scene may have multiple sources. 
                          For example: TOP angle Piano view from iPhone via Camo, FACE angle from DSLR via Camlink, 
                          Hand-written notes from iPad (Notes App), and a Piano MIDI Roll from ChordieApp.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full text-primary font-bold shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Set Up Hotkeys</h4>
                        <p className="text-sm text-muted-foreground">
                          Use shortcuts or even a MIDI Controller to switch scenes easily during your lesson.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full text-primary font-bold shrink-0">4</div>
                      <div>
                        <h4 className="font-semibold mb-1">Start Virtual Camera</h4>
                        <p className="text-sm text-muted-foreground">
                          Enable "Start Virtual Camera" and you are good to go for music lessons.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Play className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Bonus: Record & Stream</h4>
                        <p className="text-sm text-muted-foreground">
                          You can even RECORD your performances and STREAM from OBS to YouTube and other platforms!
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl overflow-hidden border border-border/50">
                        <img src="/images/obs-guide/img-025.png" alt="OBS Recording Settings" className="w-full h-auto" />
                        <p className="p-2 text-xs text-center bg-muted/30">Output and recording setup</p>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-border/50">
                        <img src="/images/obs-guide/img-020.png" alt="OBS Scene Sources" className="w-full h-auto" />
                        <p className="p-2 text-xs text-center bg-muted/30">Managing sources and scenes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Zoom Tips for Nathaniel Music Class */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Important Tips</Badge>
              <h2 className="text-3xl font-bold mb-4">
                Important Zoom Tips for a <span className="gradient-text">Nathaniel Music Class</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these guidelines for the best online music learning experience. These tips come from years of teaching music online.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {zoomTips.map((tip, index) => (
                <Card 
                  key={index} 
                  className={`hover-elevate ${tip.important ? 'border-primary/30 bg-primary/5' : ''}`}
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
              Ready to Start <span className="gradient-text">Learning Online?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Download the complete PDF guide and start setting up your perfect online music lesson environment. 
              Questions? Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/obs-guide.pdf" download>
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Download PDF Guide
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="gap-2">
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
