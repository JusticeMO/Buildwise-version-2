import React from 'react';
import { Home, Settings2, Sparkles, ShieldCheck, UtensilsCrossed, Search, Truck, MonitorSmartphone, UserRound, Bell, Crown, Zap, Plus, Settings } from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/shared/Button';
import { Badge } from '@/components/ui/badge';
import { serviceProviders } from '@/data/sharedMockData';

interface UtilityCategoryProps {
  icon: React.ReactNode;
  title: string;
  tags: string;
  onClick: () => void;
}

const UtilityCategory = ({ icon, title, tags, onClick }: UtilityCategoryProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-5 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all text-left group"
  >
    <div className="flex justify-between w-full mb-3">
      <div className="p-2 rounded-lg bg-secondary/30 group-hover:bg-primary/10 transition-colors">{icon}</div>
      <Badge variant="outline" className="text-[10px] h-5">Manage</Badge>
    </div>
    <h3 className="font-semibold text-sm">{title}</h3>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{tags}</p>
  </button>
);

const LandlordUtilities = () => {
  const categories = [
    { id: 'utility-home', icon: <Home size={22} className="text-primary" />, title: 'Home Essentials', tags: 'Internet, Water, Electricity, Gas' },
    { id: 'utility-maintenance', icon: <Settings2 size={22} className="text-muted-foreground" />, title: 'Maintenance', tags: 'Plumbing, Repairs, Handyman' },
    { id: 'utility-cleaning', icon: <Sparkles size={22} className="text-green-600" />, title: 'Cleaning & Laundry', tags: 'Deep Clean, Sofa Washing' },
    { id: 'utility-security', icon: <ShieldCheck size={22} className="text-red-500" />, title: 'Security & Safety', tags: 'CCTV, Alarm, Smart Locks' },
    { id: 'utility-kitchen', icon: <UtensilsCrossed size={22} className="text-orange-500" />, title: 'Kitchen & Food', tags: 'Groceries, Butcheries' },
    { id: 'utility-shops', icon: <Search size={22} className="text-muted-foreground" />, title: 'Local Shops', tags: 'Hardware, Furnitures' },
    { id: 'utility-moving', icon: <Truck size={22} className="text-blue-500" />, title: 'Moving & Logistics', tags: 'Trucks, Storage' },
    { id: 'utility-installations', icon: <MonitorSmartphone size={22} className="text-teal-500" />, title: 'Installations', tags: 'Solar, Painting' },
    { id: 'utility-personal', icon: <UserRound size={22} className="text-pink-500" />, title: 'Personal Services', tags: 'Tutors, Fitness' },
    { id: 'utility-community', icon: <Bell size={22} className="text-muted-foreground" />, title: 'Community Dashboard', tags: 'Local Events, Alerts' },
  ];

  const handleManageCategory = (title: string) => {
    toast.info(`Managing service providers for ${title}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-amber-500" />
            Utilities Ecosystem
          </h2>
          <p className="text-sm text-muted-foreground">Manage the services and utilities available to your tenants.</p>
        </div>
        <Button onClick={() => toast.success('Provider invitation sent!')} className="flex items-center gap-2">
          <Plus size={16} /> Add Custom Provider
        </Button>
      </div>

      {/* Analytics Banner */}
      <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Curated Ecosystem</h3>
            <p className="text-sm text-muted-foreground">You currently have {serviceProviders.length} verified vendors accessible to your tenants.</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => toast.info('Opening ecosystem settings')} className="flex items-center gap-2">
          <Settings size={16} /> Ecosystem Settings
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4">Service Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <UtilityCategory
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              tags={cat.tags}
              onClick={() => handleManageCategory(cat.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandlordUtilities;
