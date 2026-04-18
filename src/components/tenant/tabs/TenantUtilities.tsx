
import React from 'react';
import { Home, Settings2, Sparkles, ShieldCheck, UtensilsCrossed, Search, Truck, MonitorSmartphone, UserRound, Bell, Crown } from 'lucide-react';
import { toast } from 'sonner';

interface UtilityCategoryProps {
  icon: React.ReactNode;
  title: string;
  tags: string;
  onClick: () => void;
}

const UtilityCategory = ({ icon, title, tags, onClick }: UtilityCategoryProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-5 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all text-left"
  >
    <div className="p-2 rounded-lg bg-secondary/30 mb-3">{icon}</div>
    <h3 className="font-semibold text-sm">{title}</h3>
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
    <div className="space-y-6">
      {/* Premium Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">Smart Layer Engine</p>
          <h2 className="text-xl sm:text-2xl font-bold">Your Personalized Bundles</h2>
          <p className="text-sm text-gray-300 mt-1">Bundle your utilities and save. Premium tenants get exclusive discounts.</p>
        </div>
        <button onClick={() => toast.info('Premium bundles — coming in the next update.')} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
          <Crown size={16} />
          View Premium Plan
        </button>
      </div>

      {/* Regional Service Registry */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="text-lg font-bold">Regional Service Registry</h3>
            <p className="text-sm text-muted-foreground">Available utilities are curated specifically for your property region by your Landlord and JengaSafe administrators.</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-primary font-medium">Westlands Region</span>
            <span className="flex items-center gap-1 text-amber-600 font-medium">
              <ShieldCheck size={14} /> Admin Curated
            </span>
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
