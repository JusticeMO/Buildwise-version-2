import React, { useState } from 'react';
import { User, Bell, Lock, Palette, Shield, CreditCard, ChevronRight, Save, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/shared/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const TenantSettings = () => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  
  const sections = [
    { id: 'profile', icon: <User size={18} />, title: 'Profile', description: 'Personal identity and contact' },
    { id: 'notifications', icon: <Bell size={18} />, title: 'Notifications', description: 'Filter system alerts' },
    { id: 'security', icon: <Lock size={18} />, title: 'Security', description: 'Institutional access control' },
    { id: 'billing', icon: <CreditCard size={18} />, title: 'Billing', description: 'Saved assets for payments' },
  ];

  const handleSave = () => {
    toast.success("Settings synchronized successfully.");
  };

  const renderActiveSection = () => {
    switch (activeSubTab) {
      case 'profile':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input defaultValue="john.doe@email.com" />
              </div>
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input defaultValue="+254 712 345 678" />
              </div>
              <div className="space-y-1">
                <Label>ID Number</Label>
                <Input defaultValue="29384XXX" disabled />
              </div>
            </div>
            <div className="pt-4 border-t flex justify-end">
              <Button onClick={handleSave} size="sm">Update Profile</Button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Email Updates</p>
                <p className="text-xs text-muted-foreground">Receive payment and policy notifications.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">SMS Alerts</p>
                <p className="text-xs text-muted-foreground">Critical maintenance and emergency alerts.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
              <Shield className="text-amber-500 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-semibold text-amber-900">MFA Required</p>
                <p className="text-xs text-amber-700">Multi-factor authentication is recommended for your account.</p>
              </div>
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">Reset Credential Layer</Button>
            </div>
          </div>
        );
      default:
        return <div className="text-center py-10 text-muted-foreground">Section integration in progress.</div>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-sans">Settings</h2>
          <p className="text-sm text-muted-foreground font-sans">Manage your account preferences.</p>
        </div>
        <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 flex items-center gap-2">
          <LogOut size={16} /> Disconnect
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSubTab(section.id)}
              className={`w-full p-3 flex items-center gap-3 rounded-lg transition-all text-left ${
                activeSubTab === section.id 
                ? 'bg-primary text-white shadow-md' 
                : 'hover:bg-secondary/50 text-slate-600'
              }`}
            >
              {section.icon}
              <div className="flex-1">
                <p className="text-sm font-semibold">{section.title}</p>
              </div>
              <ChevronRight size={14} className={activeSubTab === section.id ? 'text-white/50' : 'text-slate-300'} />
            </button>
          ))}
        </div>

        <Card className="md:col-span-3 p-6 bg-white border-border shadow-sm min-h-[350px]">
          <h3 className="text-lg font-bold border-b pb-2 mb-4">{sections.find(s => s.id === activeSubTab)?.title}</h3>
          {renderActiveSection()}
        </Card>
      </div>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1 block">{children}</label>
);

export default TenantSettings;
