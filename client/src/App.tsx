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
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import QuickLinks from "@/components/QuickLinks";
import { isPageVisible } from "@/config/siteConfig";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {isPageVisible("instruments") && <Route path="/instruments" component={Instruments} />}
      {isPageVisible("obs-guide") && <Route path="/obs-guide" component={OBSGuide} />}
      {isPageVisible("marketplace") && <Route path="/marketplace" component={Marketplace} />}
      {isPageVisible("partners") && <Route path="/partners" component={Partners} />}
      {isPageVisible("contact") && <Route path="/contact" component={Contact} />}
      {isPageVisible("midi-visualizer") && <Route path="/midi-visualizer" component={MidiVisualizer} />}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <QuickLinks />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
