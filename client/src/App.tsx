import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Instruments from "@/pages/Instruments";
import OBSGuide from "@/pages/OBSGuide";
import Marketplace from "@/pages/Marketplace";
import Partners from "@/pages/Partners";
import Contact from "@/pages/Contact";
import MidiVisualizer from "@/pages/MidiVisualizer";
import PianoGuide from "@/pages/PianoGuide";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import QuickLinks from "@/components/QuickLinks";
import { loadPageSettings } from "@/config/siteConfig";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/instruments" component={Instruments} />
      <Route path="/obs-guide" component={OBSGuide} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/partners" component={Partners} />
      <Route path="/contact" component={Contact} />
      <Route path="/midi-visualizer" component={MidiVisualizer} />
      <Route path="/piano-guide" component={PianoGuide} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  
  useEffect(() => {
    loadPageSettings().finally(() => setSettingsLoaded(true));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        {settingsLoaded && <QuickLinks />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
