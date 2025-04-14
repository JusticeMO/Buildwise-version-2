
import React from 'react';
import { LogOut, Home, CreditCard, MessageSquare, Users, Building, BarChart, Settings, Bell, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandlordSidebarProps {
  onLogout: () => void;
  onNavChange: (tab: string) => void;
  activeTab: string;
}

const LandlordSidebar = ({ onLogout, onNavChange, activeTab }: LandlordSidebarProps) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <Home size={18} /> },
    { id: 'properties', label: 'Properties', icon: <Building size={18} /> },
    { id: 'tenants', label: 'Tenants', icon: <Users size={18} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart size={18} /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Shield size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-kenya-red">Jenga</span>
          <span className="text-kenya-green">Safe</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Landlord Portal</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
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
          ))}
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

export default LandlordSidebar;
