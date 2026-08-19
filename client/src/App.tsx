import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AmbientMusic } from "@/components/AmbientMusic";
import { AnalyticsConsentBanner } from "@/components/AnalyticsConsentBanner";
import Home from "@/pages/Home";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/analytics" component={AnalyticsDashboard} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Router />
      <AmbientMusic />
      <AnalyticsConsentBanner />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
