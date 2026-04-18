import React, { useState } from 'react';
import { 
  Home, Settings2, Sparkles, ShieldCheck, UtensilsCrossed, Search, Truck, 
  MonitorSmartphone, UserRound, Bell, Crown, Plus, Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';
import AddVendorDialog from '@/components/shared/AddVendorDialog';

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
    <div className="p-2 rounded-lg bg-secondary/30 group-hover:bg-primary/10 transition-colors mb-3">{icon}</div>
    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{tags}</p>
  </button>
);

interface TenantUtilitiesProps {
  onNavigate: (tab: string) => void;
}

const TenantUtilities = ({ onNavigate }: TenantUtilitiesProps) => {
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <Badge className="bg-amber-400 text-black border-none font-bold text-[10px] mb-2">SMART LAYER</Badge>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Personalized Ecosystem Bundles</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-lg">Connect multiple utilities under a single settlement layer and save.</p>
        </div>
        <button onClick={() => toast.info('Premium bundles activation coming soon.')} className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap">
          <Crown size={16} className="text-amber-500" />
          Activate Premium
        </button>
      </div>

      {/* Regional Service Registry */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <h3 className="text-lg font-bold">Regional Service Registry</h3>
            <p className="text-sm text-muted-foreground">Available utilities curated specifically for your property region.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <AddVendorDialog 
              trigger={
                <Button variant="outline" className="flex items-center gap-2 text-primary border-primary/20 hover:bg-primary/5">
                  <Plus size={16} /> Recommend Vendor
                </Button>
              }
            />
            <div className="hidden sm:flex items-center gap-1.5 text-xs bg-slate-100 px-3 py-1.5 rounded-full border">
              <span className="font-bold text-slate-700">Westlands Region</span>
              <div className="w-1 h-1 rounded-full bg-slate-400"></div>
              <span className="flex items-center gap-1 text-primary font-bold italic">
                <ShieldCheck size={12} /> Curated
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <UtilityCategory
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              tags={cat.tags}
              onClick={() => onNavigate(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantUtilities;
