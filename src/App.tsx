
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectCreate from "./pages/ProjectCreate";
import Contractors from "./pages/Contractors";
import Furniture from "./pages/Furniture";
import Finishings from "./pages/Finishings";
import Materials from "./pages/Materials";
import VendorApplication from "./pages/VendorApplication";
import About from "./pages/About";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import TenantLogin from "./pages/TenantLogin";
import TenantDashboard from "./pages/TenantDashboard";
import BankFinancing from "./pages/BankFinancing";
import MortgageCalculator from "./pages/MortgageCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/finishings" element={<Finishings />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/vendor-application" element={<VendorApplication />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:category" element={<BlogCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/tenant/login" element={<TenantLogin />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/financing" element={<BankFinancing />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
