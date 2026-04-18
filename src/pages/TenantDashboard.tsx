
import React, { useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import Button from '@/components/shared/Button';
import { Menu, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "sonner";

// Import components
import TenantSidebar from '../components/tenant/TenantSidebar';
import TenantOverview from '../components/tenant/tabs/TenantOverview';
import TenantPayments from '../components/tenant/tabs/TenantPayments';
import TenantMessages from '../components/tenant/tabs/TenantMessages';
import TenantChat from '../components/tenant/tabs/TenantChat';
import TenantWaterUsage from '../components/tenant/tabs/TenantWaterUsage';
import TenantGarbageServices from '../components/tenant/tabs/TenantGarbageServices';
import TenantComplaints from '../components/tenant/tabs/TenantComplaints';
import TenantHistory from '../components/tenant/tabs/TenantHistory';
import TenantEmergencyServices from '../components/tenant/tabs/TenantEmergencyServices';
import TenantUtilities from '../components/tenant/tabs/TenantUtilities';
import TenantUtilityCategory from '../components/tenant/tabs/TenantUtilityCategory';
import TenantMaintenance from '../components/tenant/tabs/TenantMaintenance';
import TenantDocuments from '../components/tenant/tabs/TenantDocuments';
import TenantExplore from '../components/tenant/tabs/TenantExplore';
import TenantSettings from '../components/tenant/tabs/TenantSettings';
import TenantGiveNotice from '../components/tenant/tabs/TenantGiveNotice';
import TenantMarketplace from '../components/tenant/tabs/TenantMarketplace';

const TenantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [utilityCategory, setUtilityCategory] = useState<string | null>(null);
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/tenant/login');
  };

  const handleNavChange = (tab: string) => {
    if (tab.startsWith('utility-')) {
      setUtilityCategory(tab);
      setActiveTab('utility-category');
    } else {
      setUtilityCategory(null);
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <TenantOverview onNavigate={handleNavChange} />;
      case 'payments': return <TenantPayments />;
      case 'messages': return <TenantMessages />;
      case 'chat': return <TenantChat />;
      case 'water': return <TenantWaterUsage />;
      case 'garbage': return <TenantGarbageServices />;
      case 'emergency': return <TenantEmergencyServices />;
      case 'complaints': return <TenantComplaints />;
      case 'history': return <TenantHistory />;
      case 'utilities': return <TenantUtilities onNavigate={handleNavChange} />;
      case 'utility-category': return utilityCategory ? <TenantUtilityCategory categoryId={utilityCategory} onBack={() => setActiveTab('utilities')} /> : <TenantUtilities onNavigate={handleNavChange} />;
      case 'maintenance': return <TenantMaintenance />;
      case 'documents': return <TenantDocuments />;
      case 'explore': return <TenantExplore />;
      case 'marketplace': return <TenantMarketplace />;
      case 'notice': return <TenantGiveNotice />;
      case 'settings': return <TenantSettings />;
      default: return <TenantOverview />;
    }
  };
  
  return (
    <div className="min-h-screen flex">
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <div className="fixed top-4 right-4 lg:hidden z-50">
          <Button size="lg" variant="outline" className="rounded-full h-12 w-12 shadow-lg bg-white" onClick={() => setDrawerOpen(!drawerOpen)}>
            <Menu />
          </Button>
        </div>
        <DrawerContent className="bg-white p-0">
          <div className="h-[80vh] overflow-auto">
            <TenantSidebar onLogout={handleLogout} onNavChange={(tab) => {
              handleNavChange(tab);
              setDrawerOpen(false);
            }} activeTab={activeTab === 'utility-category' ? 'utilities' : activeTab} />
          </div>
        </DrawerContent>
      </Drawer>
      
      <div className="hidden lg:block w-64 bg-white border-r min-h-screen">
        <TenantSidebar onLogout={handleLogout} onNavChange={handleNavChange} activeTab={activeTab === 'utility-category' ? 'utilities' : activeTab} />
      </div>
      
      <div className="flex-1 bg-secondary/10">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Tenant Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome John Doe</p>
            </div>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative">
                    <Bell size={20} />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-md">
                  <DialogTitle>Notifications</DialogTitle>
                  <div className="space-y-3 mt-4">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="text-amber-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">Rent due in 3 days</p>
                          <p className="text-xs text-muted-foreground">Your monthly rent of KES 25,000 is due on July 1st</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="text-blue-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">Water bill updated</p>
                          <p className="text-xs text-muted-foreground">Your water bill for June is KES 1,200</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Bell className="text-green-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">New message from property manager</p>
                          <p className="text-xs text-muted-foreground">Regarding your maintenance request</p>
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
