
import React from 'react';
import { LogOut, Home, CreditCard, MessageSquare, Users, ClipboardList, Settings, PieChart, Building2, Wrench, ShieldAlert, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTeamMembers } from '@/data/sharedMockData';

interface LandlordSidebarProps {
  onLogout: () => void;
  onNavChange: (tab: string) => void;
  activeTab: string;
}

const LandlordSidebar = ({ onLogout, onNavChange, activeTab }: LandlordSidebarProps) => {
  // In a real app, this would come from a useAuth hook
  // Mocking the "Active Team Member" - change 'team-1' to 'team-3' to see RBAC in action
  const activeMemberId = 'team-1'; 
  const activeMember = getTeamMembers().find(m => m.id === activeMemberId) || getTeamMembers()[0];
  const perms = activeMember.permissions;

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <Home size={18} />, hidden: !perms.canViewOverview },
    { id: 'properties', label: 'Properties', icon: <Building2 size={18} />, hidden: !perms.canManageProperties },
    { id: 'tenants', label: 'Tenants', icon: <Users size={18} />, hidden: !perms.canManageTenants },
    { id: 'maintenance', label: 'Maintenance', icon: <Wrench size={18} />, hidden: !perms.canManageMaintenance },
    { id: 'payments', label: 'Rent Collection', icon: <CreditCard size={18} />, hidden: !perms.canManagePayments },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, hidden: !perms.canManageMessages },
    { id: 'complaints', label: 'Complaints', icon: <ShieldAlert size={18} />, hidden: !perms.canManageMessages }, // Uses message perms as proxy
    { id: 'utilities', label: 'Utilities Ecosystem', icon: <Zap size={18} />, hidden: !perms.canManageUtilities },
    { id: 'team', label: 'Team', icon: <UserGroup size={18} />, hidden: !perms.canManageTeam },
    { id: 'reports', label: 'Reports', icon: <PieChart size={18} />, hidden: !perms.canViewReports },
    { id: 'documents', label: 'Documents', icon: <ClipboardList size={18} />, hidden: false },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} />, hidden: false },
  ];

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
        <div className="mt-1 flex flex-col">
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Portal Access</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-bold text-slate-700">{activeMember.role.toUpperCase()}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.filter(item => !item.hidden).map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 font-bold'
                    : 'hover:bg-secondary/80 text-slate-600'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t bg-slate-50/50">
        <div className="mb-4 p-2 bg-white rounded border border-border shadow-sm">
          <p className="text-[10px] font-bold text-muted-foreground mb-1">LOGGED IN AS</p>
          <p className="text-xs font-bold truncate">{activeMember.name}</p>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const UserGroup = ({ size }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default LandlordSidebar;
