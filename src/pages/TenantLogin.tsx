
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Building, Lock, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const TenantLogin = () => {
  const [building, setBuilding] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!building || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      toast.success("Login successful!");
      // For tenants, specifically navigate to tenant dashboard
      navigate('/tenant/dashboard', { replace: true });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 bg-secondary/20">
        <div className="container px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Tenant Portal Login</h2>
                <p className="text-muted-foreground">
                  Access your rental account to manage payments, messages, and more
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="building" className="text-sm font-medium">
                    Building/Property
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      id="building"
                      type="text"
                      placeholder="Enter your building or property name"
                      className="pl-10"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      id="email"
                      type="text"
                      placeholder="you@example.com or +254..."
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Need help accessing your account?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Contact support
                  </a>
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-sm">For demonstration purposes:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter any building name, email and password to access the tenant dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TenantLogin;
