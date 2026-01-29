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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/instruments" component={Instruments} />
      <Route path="/obs-guide" component={OBSGuide} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/partners" component={Partners} />
      <Route path="/contact" component={Contact} />
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
