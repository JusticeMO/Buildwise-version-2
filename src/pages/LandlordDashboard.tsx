
import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import Button from '@/components/shared/Button';
import { Menu, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "sonner";

// Import components
import LandlordSidebar from '../components/landlord/LandlordSidebar';
import LandlordOverview from '../components/landlord/tabs/LandlordOverview';
import LandlordProperties from '../components/landlord/tabs/LandlordProperties';
import LandlordTenants from '../components/landlord/tabs/LandlordTenants';
import LandlordPayments from '../components/landlord/tabs/LandlordPayments';
import LandlordReports from '../components/landlord/tabs/LandlordReports';
import PropertyDetails from '../components/landlord/tabs/PropertyDetails';

// Placeholder component for tabs that don't have dedicated components yet
const PlaceholderTab = ({ title }: { title: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-muted-foreground">This section is currently under development. Check back soon for updates!</p>
  </div>
);

// Landlord Dashboard component
const LandlordDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Check if location state has a tab to display
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/landlord/login');
  };
  
  // Handle navigation to property details
  const handlePropertyDetails = (propertyName) => {
    setActiveTab('property-details');
    // Pass the property name via state
    navigate('/landlord/dashboard', { 
      state: { activeTab: 'property-details', property: propertyName },
      replace: true 
    });
  };
  
  // Render the active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <LandlordOverview />;
      case 'properties':
        return <LandlordProperties onViewPropertyDetails={handlePropertyDetails} />;
      case 'tenants':
        return <LandlordTenants />;
      case 'payments':
        return <LandlordPayments />;
      case 'reports':
        return <LandlordReports />;
      case 'property-details':
        return <PropertyDetails />;
      case 'messages':
        return <PlaceholderTab title="Messages" />;
      case 'documents':
        return <PlaceholderTab title="Documents" />;
      case 'settings':
        return <PlaceholderTab title="Settings" />;
      default:
        return <LandlordOverview />;
    }
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Mobile Navigation - Using Drawer for better mobile experience */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <div className="fixed top-4 right-4 lg:hidden z-50">
          <Button size="lg" variant="outline" className="rounded-full h-12 w-12 shadow-lg bg-white" onClick={() => setDrawerOpen(!drawerOpen)}>
            <Menu />
          </Button>
        </div>
        <DrawerContent className="bg-white p-0">
          <div className="h-[80vh] overflow-auto">
            <LandlordSidebar onLogout={handleLogout} onNavChange={(tab) => {
              setActiveTab(tab);
              setDrawerOpen(false);
            }} activeTab={activeTab} />
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r min-h-screen">
        <LandlordSidebar onLogout={handleLogout} onNavChange={setActiveTab} activeTab={activeTab} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-secondary/10">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Landlord Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome James Smith</p>
            </div>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative">
                    <Bell size={20} />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-md">
                  <DialogTitle>Notifications</DialogTitle>
                  <div className="space-y-3 mt-4">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="text-amber-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">New rent payment received</p>
                          <p className="text-xs text-muted-foreground">John Doe paid KES 25,000 for July</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="text-blue-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">Maintenance request</p>
                          <p className="text-xs text-muted-foreground">Unit 5B reported a plumbing issue</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="text-green-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">New inquiry</p>
                          <p className="text-xs text-muted-foreground">Someone is interested in your vacant unit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <button 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
