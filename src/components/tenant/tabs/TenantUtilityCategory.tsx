
import React from 'react';
import { ArrowLeft, Star, MapPin, Phone, Globe, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Provider {
  name: string;
  rating: number;
  category: string;
  location: string;
  phone: string;
  hours: string;
  description: string;
  verified: boolean;
}

const providersByCategory: Record<string, { title: string; description: string; providers: Provider[] }> = {
  'utility-home': {
    title: 'Home Essentials',
    description: 'Internet, Water, Electricity & Gas providers in your area',
    providers: [
      { name: 'Safaricom Home Fibre', rating: 4.5, category: 'Internet', location: 'Westlands', phone: '+254 722 000 000', hours: '24/7', description: 'High-speed fiber internet with packages starting from KES 2,999/month.', verified: true },
      { name: 'Kenya Power', rating: 3.8, category: 'Electricity', location: 'Nationwide', phone: '+254 203 201 000', hours: '8AM-5PM', description: 'National electricity provider. Token purchases and outage reporting.', verified: true },
      { name: 'Nairobi Water', rating: 3.5, category: 'Water', location: 'Nairobi', phone: '+254 20 272 2000', hours: '8AM-5PM', description: 'Municipal water supply and billing services.', verified: true },
      { name: 'Total Energies Gas', rating: 4.2, category: 'Gas', location: 'Westlands', phone: '+254 711 000 000', hours: '7AM-8PM', description: 'LPG gas delivery and refills. Same-day delivery available.', verified: false },
    ],
  },
  'utility-maintenance': {
    title: 'Maintenance',
    description: 'Plumbing, Repairs & Handyman services',
    providers: [
      { name: 'FixIt Kenya', rating: 4.7, category: 'General Repairs', location: 'Westlands', phone: '+254 733 100 200', hours: '7AM-7PM', description: 'Professional handyman services for all home repairs.', verified: true },
      { name: 'PipeMasters Plumbing', rating: 4.4, category: 'Plumbing', location: 'Kilimani', phone: '+254 700 300 400', hours: '24/7', description: 'Emergency and scheduled plumbing services.', verified: true },
      { name: 'Sparky Electricals', rating: 4.1, category: 'Electrical', location: 'Westlands', phone: '+254 712 500 600', hours: '8AM-6PM', description: 'Licensed electricians for installations and repairs.', verified: false },
    ],
  },
  'utility-cleaning': {
    title: 'Cleaning & Laundry',
    description: 'Deep cleaning, sofa washing and laundry services',
    providers: [
      { name: 'Pristine Cleaners', rating: 4.8, category: 'Deep Clean', location: 'Westlands', phone: '+254 720 111 222', hours: '7AM-6PM', description: 'Professional deep cleaning for apartments and offices.', verified: true },
      { name: 'FreshSofa Kenya', rating: 4.5, category: 'Sofa Washing', location: 'Lavington', phone: '+254 733 222 333', hours: '8AM-5PM', description: 'Upholstery and carpet cleaning specialists.', verified: true },
      { name: 'QuickWash Laundry', rating: 4.3, category: 'Laundry', location: 'Westlands', phone: '+254 700 444 555', hours: '7AM-8PM', description: 'Same-day laundry and dry cleaning pickup & delivery.', verified: false },
    ],
  },
  'utility-security': {
    title: 'Security & Safety',
    description: 'CCTV, alarm systems and smart lock providers',
    providers: [
      { name: 'SecureHome KE', rating: 4.6, category: 'CCTV', location: 'Westlands', phone: '+254 722 600 700', hours: '24/7', description: 'CCTV installation and monitoring services for residential properties.', verified: true },
      { name: 'G4S Kenya', rating: 4.4, category: 'Security Systems', location: 'Nationwide', phone: '+254 20 699 0000', hours: '24/7', description: 'Comprehensive security solutions including alarms and patrols.', verified: true },
      { name: 'SmartLock Nairobi', rating: 4.2, category: 'Smart Locks', location: 'Nairobi', phone: '+254 711 800 900', hours: '9AM-6PM', description: 'Smart lock installation and keyless entry systems.', verified: false },
    ],
  },
  'utility-kitchen': {
    title: 'Kitchen & Food',
    description: 'Groceries, butcheries and food delivery',
    providers: [
      { name: 'Naivas Supermarket', rating: 4.3, category: 'Groceries', location: 'Westlands', phone: '+254 20 271 0000', hours: '8AM-9PM', description: 'Full grocery store with home delivery options.', verified: true },
      { name: 'Kenyatta Market Butchery', rating: 4.5, category: 'Butchery', location: 'Westlands', phone: '+254 722 300 400', hours: '7AM-7PM', description: 'Fresh meat and poultry. Bulk orders available.', verified: false },
      { name: 'Mama Mboga Express', rating: 4.1, category: 'Fresh Produce', location: 'Westlands', phone: '+254 700 500 600', hours: '6AM-6PM', description: 'Daily fresh vegetables and fruits delivered to your door.', verified: false },
    ],
  },
  'utility-shops': {
    title: 'Local Shops',
    description: 'Hardware stores and furniture shops near you',
    providers: [
      { name: 'Tuskys Hardware', rating: 4.0, category: 'Hardware', location: 'Westlands', phone: '+254 720 700 800', hours: '8AM-6PM', description: 'Building and home improvement supplies.', verified: true },
      { name: 'Victoria Furnitures', rating: 4.3, category: 'Furniture', location: 'Mombasa Road', phone: '+254 733 900 100', hours: '9AM-6PM', description: 'Quality furniture for home and office at competitive prices.', verified: true },
    ],
  },
  'utility-moving': {
    title: 'Moving & Logistics',
    description: 'Trucks, movers and storage facilities',
    providers: [
      { name: 'Movers Kenya', rating: 4.6, category: 'Moving', location: 'Nairobi', phone: '+254 722 100 200', hours: '7AM-7PM', description: 'Professional moving services. Packing included.', verified: true },
      { name: 'SafeStore Nairobi', rating: 4.2, category: 'Storage', location: 'Industrial Area', phone: '+254 711 300 400', hours: '24/7', description: 'Secure self-storage units of various sizes.', verified: true },
    ],
  },
  'utility-installations': {
    title: 'Installations',
    description: 'Solar panels, painting and installation services',
    providers: [
      { name: 'SolarPoa Kenya', rating: 4.7, category: 'Solar', location: 'Nairobi', phone: '+254 733 500 600', hours: '8AM-5PM', description: 'Solar panel installation and maintenance for residential properties.', verified: true },
      { name: 'PaintPro Nairobi', rating: 4.4, category: 'Painting', location: 'Westlands', phone: '+254 700 700 800', hours: '7AM-6PM', description: 'Interior and exterior painting with premium finishes.', verified: true },
    ],
  },
  'utility-personal': {
    title: 'Personal Services',
    description: 'Tutors, fitness trainers and personal services',
    providers: [
      { name: 'TutorMe Kenya', rating: 4.5, category: 'Tutors', location: 'Online/Westlands', phone: '+254 722 900 100', hours: 'Flexible', description: 'Private tutoring for all levels. Online and in-person.', verified: true },
      { name: 'FitZone Personal Training', rating: 4.6, category: 'Fitness', location: 'Westlands', phone: '+254 711 200 300', hours: '6AM-9PM', description: 'Certified personal trainers. Home and gym sessions.', verified: false },
    ],
  },
  'utility-community': {
    title: 'Community Dashboard',
    description: 'Local events, alerts and community notices',
    providers: [
      { name: 'Westlands Community Board', rating: 4.3, category: 'Community', location: 'Westlands', phone: '+254 720 400 500', hours: 'Online', description: 'Stay updated with local events, security alerts and community news.', verified: true },
    ],
  },
};

interface TenantUtilityCategoryProps {
  categoryId: string;
  onBack: () => void;
}

const TenantUtilityCategory = ({ categoryId, onBack }: TenantUtilityCategoryProps) => {
  const data = providersByCategory[categoryId];

  if (!data) {
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
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-muted-foreground">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.providers.map((provider, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">{provider.name}</h3>
                <Badge variant="secondary" className="text-xs mt-1">{provider.category}</Badge>
              </div>
              <div className="flex items-center gap-1">
                {provider.verified && (
                  <Badge className="bg-green-100 text-green-700 text-xs">Verified</Badge>
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
