
import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import Button from '@/components/shared/Button';
import { Menu, Bell, UserCircle, ChevronDown, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "sonner";
import { getTeamMembers } from '@/data/sharedMockData';

// Import components
import LandlordSidebar from '../components/landlord/LandlordSidebar';
import LandlordOverview from '../components/landlord/tabs/LandlordOverview';
import LandlordProperties from '../components/landlord/tabs/LandlordProperties';
import LandlordTenants from '../components/landlord/tabs/LandlordTenants';
import LandlordPayments from '../components/landlord/tabs/LandlordPayments';
import LandlordReports from '../components/landlord/tabs/LandlordReports';
import PropertyDetails from '../components/landlord/tabs/PropertyDetails';
import LandlordMaintenance from '../components/landlord/tabs/LandlordMaintenance';
import LandlordMessages from '../components/landlord/tabs/LandlordMessages';
import LandlordComplaints from '../components/landlord/tabs/LandlordComplaints';
import LandlordTeam from '../components/landlord/tabs/LandlordTeam';
import LandlordUtilities from '../components/landlord/tabs/LandlordUtilities';
import LandlordSettings from '../components/landlord/tabs/LandlordSettings';

// Placeholder component for tabs still under development
const PlaceholderTab = ({ title }: { title: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm animate-fade-in">
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

  // Mocking "Active User Selection" for RBAC testing
  // team-1: Owner (Full Access)
  // team-3: Maintenance (Restricted Access)
  const [activeUserId, setActiveUserId] = useState('team-1');
  const teamMembers = getTeamMembers();
  const activeUser = teamMembers.find(m => m.id === activeUserId) || teamMembers[0];
  const perms = activeUser.permissions;

  // Check if location state has a tab to display
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // If the active user doesn't have permission for current tab, switch back to one they have access to
  useEffect(() => {
    const isForbidden = (
      (activeTab === 'overview' && !perms.canViewOverview) ||
      (activeTab === 'properties' && !perms.canManageProperties) ||
      (activeTab === 'tenants' && !perms.canManageTenants) ||
      (activeTab === 'maintenance' && !perms.canManageMaintenance) ||
      (activeTab === 'payments' && !perms.canManagePayments) ||
      (activeTab === 'messages' && !perms.canManageMessages) ||
      (activeTab === 'complaints' && !perms.canManageMessages) ||
      (activeTab === 'utilities' && !perms.canManageUtilities) ||
      (activeTab === 'team' && !perms.canManageTeam)
    );

    if (isForbidden) {
      if (perms.canViewOverview) setActiveTab('overview');
      else if (perms.canManageMaintenance) setActiveTab('maintenance');
      else if (perms.canManageMessages) setActiveTab('messages');
      else setActiveTab('settings');
    }
  }, [activeUserId, activeTab, perms]);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/landlord/login');
  };

  const handlePropertyDetails = (propertyName: string) => {
    setActiveTab('property-details');
    navigate('/landlord/dashboard', {
      state: { activeTab: 'property-details', property: propertyName },
      replace: true
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return perms.canViewOverview ? <LandlordOverview /> : <PlaceholderTab title="Dashboard Restricted" />;
      case 'properties': return perms.canManageProperties ? <LandlordProperties onViewPropertyDetails={handlePropertyDetails} /> : <PlaceholderTab title="Access Denied" />;
      case 'tenants': return perms.canManageTenants ? <LandlordTenants /> : <PlaceholderTab title="Access Denied" />;
      case 'payments': return perms.canManagePayments ? <LandlordPayments /> : <PlaceholderTab title="Access Denied" />;
      case 'reports': return perms.canViewReports ? <LandlordReports /> : <PlaceholderTab title="Access Denied" />;
      case 'property-details': return <PropertyDetails />;
      case 'maintenance': return perms.canManageMaintenance ? <LandlordMaintenance /> : <PlaceholderTab title="Access Denied" />;
      case 'messages': return perms.canManageMessages ? <LandlordMessages /> : <PlaceholderTab title="Access Denied" />;
      case 'complaints': return perms.canManageMessages ? <LandlordComplaints /> : <PlaceholderTab title="Access Denied" />;
      case 'utilities': return perms.canManageUtilities ? <LandlordUtilities /> : <PlaceholderTab title="Access Denied" />;
      case 'team': return perms.canManageTeam ? <LandlordTeam /> : <PlaceholderTab title="Access Denied" />;
      case 'documents': return <PlaceholderTab title="Documents" />;
      case 'settings': return <LandlordSettings />;
      default: return <LandlordOverview />;
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
            <LandlordSidebar
              onLogout={handleLogout}
              onNavChange={(tab) => {
                setActiveTab(tab);
                setDrawerOpen(false);
              }}
              activeTab={activeTab}
            />
          </div>
        </DrawerContent>
      </Drawer>

      <div className="hidden lg:block w-64 bg-white border-r min-h-screen">
        <LandlordSidebar onLogout={handleLogout} onNavChange={setActiveTab} activeTab={activeTab} />
      </div>

      <div className="flex-1 bg-secondary/10">
        <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-30">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                Landlord Portal
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold border border-slate-200">
                  INSTITUTIONAL v2.0
                </span>
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Active Environment: <span className="font-bold text-slate-700">Production</span>
              </p>
            </div>

            <div className="flex items-center gap-6">
              {/* RBAC Tester Toolkit */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">View As:</span>
                <select
                  className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
                  value={activeUserId}
                  onChange={(e) => {
                    setActiveUserId(e.target.value);
                    toast.info(`Switched to ${teamMembers.find(m => m.id === e.target.value)?.role} view`);
                  }}
                >
                  {teamMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-primary hover:text-primary/70">
                      <ShieldCheck size={14} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogTitle className="text-sm font-bold uppercase tracking-wider">Active Permissions</DialogTitle>
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {Object.entries(perms).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs py-1 border-b">
                          <span className="text-muted-foreground capitalize">{k.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}</span>
                          <Badge variant={v ? 'default' : 'secondary'} className="text-[9px] uppercase tracking-tighter">
                            {v ? 'Granted' : 'Restricted'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-4 border-l pl-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="relative p-1 hover:bg-secondary rounded-full transition-colors">
                      <Bell size={20} />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center border-2 border-white shadow-sm">5</Badge>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white sm:max-w-md">
                    <DialogTitle>Audit Notifications</DialogTitle>
                    <div className="space-y-3 mt-4">
                      <div className="bg-secondary/20 p-3 rounded-lg border-l-4 border-amber-500">
                        <div className="flex items-start gap-2">
                          <Bell className="text-amber-500 mt-0.5" size={18} />
                          <div>
                            <p className="text-sm font-bold">New Formal Complaint</p>
                            <p className="text-xs text-muted-foreground">Unit 3B (John Doe) submitted a noise complaint.</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-secondary/20 p-3 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start gap-2">
                          <Bell className="text-blue-500 mt-0.5" size={18} />
                          <div>
                            <p className="text-sm font-bold">Maintenance Assigned</p>
                            <p className="text-xs text-muted-foreground">Leaking kitchen faucet assigned to David Kamau.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('settings')}>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <UserCircle size={20} />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold leading-none">{activeUser.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 capitalize font-medium">{activeUser.role}</p>
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 min-h-[calc(100vh-80px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
