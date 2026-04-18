import React, { useState } from 'react';
import { User, Bell, Lock, Palette, Shield, Building2, Paintbrush, Globe, Save, ChevronRight, LogOut, Verified } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/shared/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const LandlordSettings = () => {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  
  const sections = [
    { id: 'profile', icon: <User size={18} />, title: 'Profile', description: 'Personal identity and details' },
    { id: 'branding', icon: <Paintbrush size={18} />, title: 'Branding', description: 'Tenant portal customization' },
    { id: 'notifications', icon: <Bell size={18} />, title: 'Notifications', description: 'Alert and routing levels' },
    { id: 'security', icon: <Lock size={18} />, title: 'Security', description: 'Admin access and logs' },
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  const renderActiveSection = () => {
    switch (activeSubTab) {
      case 'profile':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Business Entity Name</Label>
                <Input defaultValue="Buildwise Real Estate" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Tax ID (KRA PIN)</Label>
                <Input defaultValue="P051XXXXXXZ" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Operational Email</Label>
                <Input defaultValue="admin@buildwise.co.ke" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Location</Label>
                <Input defaultValue="Nairobi, Kenya" />
              </div>
            </div>
            <div className="pt-4 border-t flex justify-end">
              <Button onClick={handleSave} size="sm">Save Changes</Button>
            </div>
          </div>
        );
      case 'branding':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-slate-50 border rounded-lg">
              <p className="text-sm font-semibold mb-3">Portal Theme</p>
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-primary rounded border"></div>
                <div className="h-10 w-10 bg-slate-900 rounded border"></div>
                <div className="h-10 w-10 bg-white rounded border"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">"Institutional Light" Aesthetic</p>
                <p className="text-xs text-muted-foreground">Standard theme for all tenant portals.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Tenant Inquiries</p>
                <p className="text-xs text-muted-foreground">Notify property managers for new messages.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Maintenance Overrides</p>
                <p className="text-xs text-muted-foreground">Owner approval for high-cost repairs.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        );
      default:
        return <div className="text-center py-10 text-muted-foreground">Section in progress.</div>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage global system parameters.</p>
        </div>
        <Badge variant="outline" className="flex gap-1.5 items-center">
          <Shield size={12} className="text-green-500" /> Secure
        </Badge>
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
              <span className="text-sm font-medium">{section.title}</span>
            </button>
          ))}
        </div>

        <Card className="md:col-span-3 p-6 bg-white border-border shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold border-b pb-2 mb-4">{sections.find(s => s.id === activeSubTab)?.title}</h3>
          {renderActiveSection()}
        </Card>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <label className={`text-xs font-semibold text-slate-500 uppercase tracking-wider ${className}`}>{children}</label>
);

export default LandlordSettings;
