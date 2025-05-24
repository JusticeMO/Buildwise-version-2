
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/guards/PrivateRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectCreate from "./pages/ProjectCreate";
import Contractors from "./pages/Contractors";
import Furniture from "./pages/Furniture";
import Finishings from "./pages/Finishings";
import Materials from "./pages/Materials";
import VendorApplication from "./pages/VendorApplication";
import VendorProfiles from "./pages/VendorProfiles";
import VendorProfileSetupPage from "./pages/VendorProfileSetup";
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
import LandlordLogin from "./pages/LandlordLogin";
import LandlordDashboard from "./pages/LandlordDashboard";
import Cart from "./pages/Cart";

// Create a new QueryClient instance outside the component to prevent re-creation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Create an AuthProviderWithRouter component that gets the navigate function inside the Router context
const AuthProviderWithRouter = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProviderWithRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tenant/login" element={<TenantLogin />} />
              <Route path="/landlord/login" element={<LandlordLogin />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/category/:category" element={<BlogCategory />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* Service provider profile routes - accessible to all */}
              <Route path="/providers/:providerId" element={<VendorProfiles />} />
              <Route path="/providers/:providerId/setup" element={<PrivateRoute><VendorProfileSetupPage /></PrivateRoute>} />
              
              {/* Legacy vendor routes for backward compatibility */}
              <Route path="/vendors/:vendorId" element={<VendorProfiles />} />
              <Route path="/vendors/:vendorId/setup" element={<PrivateRoute><VendorProfileSetupPage /></PrivateRoute>} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/projects/create" element={<PrivateRoute><ProjectCreate /></PrivateRoute>} />
              <Route path="/contractors" element={<PrivateRoute><Contractors /></PrivateRoute>} />
              <Route path="/furniture" element={<PrivateRoute><Furniture /></PrivateRoute>} />
              <Route path="/finishings" element={<PrivateRoute><Finishings /></PrivateRoute>} />
              <Route path="/materials" element={<PrivateRoute><Materials /></PrivateRoute>} />
              <Route path="/vendor-application" element={<PrivateRoute><VendorApplication /></PrivateRoute>} />
              <Route path="/tenant/dashboard" element={<PrivateRoute><TenantDashboard /></PrivateRoute>} />
              <Route path="/landlord/dashboard" element={<PrivateRoute><LandlordDashboard /></PrivateRoute>} />
              <Route path="/financing" element={<PrivateRoute><BankFinancing /></PrivateRoute>} />
              <Route path="/mortgage-calculator" element={<PrivateRoute><MortgageCalculator /></PrivateRoute>} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProviderWithRouter>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
