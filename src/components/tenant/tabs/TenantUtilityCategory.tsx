
import React from 'react';
import { ArrowLeft, Star, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getUtilityProvidersByCategory } from '@/data/sharedMockData';

interface TenantUtilityCategoryProps {
  categoryId: string;
  onBack: () => void;
}

const categoryNames: Record<string, string> = {
  'utility-home': 'Home Essentials',
  'utility-maintenance': 'Maintenance',
  'utility-cleaning': 'Cleaning & Laundry',
  'utility-security': 'Security & Safety',
  'utility-kitchen': 'Kitchen & Food',
  'utility-shops': 'Local Shops',
  'utility-moving': 'Moving & Logistics',
  'utility-installations': 'Installations',
  'utility-personal': 'Personal Services',
  'utility-community': 'Community Dashboard',
};

const TenantUtilityCategory = ({ categoryId, onBack }: TenantUtilityCategoryProps) => {
  const providers = getUtilityProvidersByCategory(categoryId);
  const title = categoryNames[categoryId] || 'Service Category';

  if (!providers.length && !title) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Category not found.</p>
        <button onClick={onBack} className="text-primary mt-4 text-sm hover:underline">← Back to Utilities</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={16} /> Back to Utilities Ecosystem
      </button>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">Institutional-grade curated services for your property.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
            {provider.isRecommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-amber-500 text-[10px] font-bold px-3 py-1 text-black flex items-center gap-1 rounded-bl-lg">
                  <Star size={10} className="fill-black" />
                  RECOMMENDED
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">{provider.name}</h3>
                <Badge variant="secondary" className="text-xs mt-1">{provider.category}</Badge>
              </div>
              <div className="flex items-center gap-1 pr-6">
                {provider.verified && (
                  <Badge className="bg-green-100 text-green-700 text-xs border-green-200">
                    <ShieldCheck size={10} className="mr-1" />
                    Verified
                  </Badge>
                )}
                <div className="flex items-center gap-0.5 ml-2">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} /> {provider.location}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={14} /> {provider.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={14} /> {provider.hours}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-primary text-primary-foreground text-sm py-2 rounded-lg hover:opacity-90 transition-opacity">
                Contact
              </button>
              <button className="flex-1 border border-border text-sm py-2 rounded-lg hover:bg-secondary/50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantUtilityCategory;
