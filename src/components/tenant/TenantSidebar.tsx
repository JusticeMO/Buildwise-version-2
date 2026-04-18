
import React from 'react';
import { LogOut, Home, CreditCard, MessageSquare, Droplet, Trash2, History, AlertOctagon, Siren, MessageCircle, Zap, Wrench, FileText, Compass, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface TenantSidebarProps {
  onLogout: () => void;
  onNavChange: (tab: string) => void;
  activeTab: string;
}

const TenantSidebar = ({ onLogout, onNavChange, activeTab }: TenantSidebarProps) => {
  const mainNavItems = [
    { id: 'overview', label: 'Dashboard', icon: <Home size={18} /> },
    { id: 'notice', label: 'Give Notice', icon: <AlertOctagon size={18} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'history', label: 'Payment History', icon: <History size={18} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
  ];

  const utilityNavItems = [
    { id: 'utilities', label: 'Utilities Ecosystem', icon: <Zap size={18} /> },
    { id: 'water', label: 'Water Usage', icon: <Droplet size={18} /> },
    { id: 'garbage', label: 'Garbage Services', icon: <Trash2 size={18} /> },
    { id: 'emergency', label: 'Emergency Services', icon: <Siren size={18} /> },
    { id: 'complaints', label: 'File Complaint', icon: <AlertOctagon size={18} /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Wrench size={18} /> },
  ];

  const bottomNavItems = [
    { id: 'marketplace', label: 'Explore Properties', icon: <Compass size={18} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const renderNavItem = (item: { id: string; label: string; icon: React.ReactNode }) => (
    <li key={item.id}>
      <button
        onClick={() => onNavChange(item.id)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          activeTab === item.id
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
      >
        {item.icon}
        {item.label}
      </button>
    </li>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <Link to="/" className="text-xl font-bold flex items-center gap-1.5 group">
          <img src="/logo.png" alt="JengaSafe Logo" className="h-7 w-7 object-contain group-hover:scale-105 transition-transform" />
          <div className="flex">
            <span className="text-kenya-red">Jenga</span>
            <span className="text-kenya-green">Safe</span>
          </div>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Tenant Portal</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {mainNavItems.map(renderNavItem)}
        </ul>
        
        <Separator className="my-3" />
        
        <ul className="space-y-1">
          {utilityNavItems.map(renderNavItem)}
        </ul>
        
        <Separator className="my-3" />
        
        <ul className="space-y-1">
          {bottomNavItems.map(renderNavItem)}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default TenantSidebar;
