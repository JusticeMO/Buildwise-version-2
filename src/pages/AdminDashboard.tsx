import React, { useState } from 'react';
import { 
  BarChart3, Users, Building2, Zap, Settings, Bell, Search, 
  Menu, LogOut, ShieldCheck, ListFilter
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';
import LandlordUtilities from '@/components/landlord/tabs/LandlordUtilities';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('ecosystem');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Successfully logged out.");
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'landlords', label: 'Landlords', icon: <Building2 size={18} /> },
    { id: 'tenants', label: 'Tenants', icon: <Users size={18} /> },
    { id: 'ecosystem', label: 'Utilities', icon: <Zap size={18} /> },
    { id: 'audit', label: 'Audit Logs', icon: <ShieldCheck size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r transition-all duration-300 flex flex-col z-50 shadow-sm`}>
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck className="text-white" size={18} />
          </div>
          {isSidebarOpen && <span className="font-bold text-lg text-slate-900 tracking-tight">Admin Portal</span>}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                activeTab === item.id 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-border px-8 flex items-center justify-between z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              <Menu size={18} />
            </button>
            <h1 className="text-sm font-bold text-slate-700 uppercase tracking-widest px-4 border-l">System Management</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-border w-48">
              <Search size={14} className="text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none text-xs ml-2 w-full" />
            </div>
            <button className="relative p-2 text-slate-400">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {activeTab === 'ecosystem' ? (
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Global Utilities Registry</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage service providers across all regions.</p>
                  </div>
                  <Badge variant="outline" className="bg-white">Master Layer</Badge>
                </div>
                
                <div className="bg-white rounded-xl border border-border shadow-sm p-6 mt-6">
                  <LandlordUtilities />
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                <h3 className="text-lg font-bold">Module Under Construction</h3>
                <p className="text-slate-500 text-sm mt-1">This section is currently being integrated.</p>
                <Button variant="outline" className="mt-6" onClick={() => setActiveTab('ecosystem')}>
                  Return to Utilities
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
