
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const nearbyPlaces = [
  { name: 'Westgate Shopping Mall', category: 'Shopping', distance: '1.2 km', rating: 4.3 },
  { name: 'Sarit Centre', category: 'Shopping', distance: '0.8 km', rating: 4.1 },
  { name: 'Westlands Health Centre', category: 'Healthcare', distance: '0.5 km', rating: 4.0 },
  { name: 'Parklands Sports Club', category: 'Recreation', distance: '1.5 km', rating: 4.4 },
  { name: 'ABC Place', category: 'Dining', distance: '0.3 km', rating: 4.2 },
  { name: 'Diamond Plaza', category: 'Shopping', distance: '1.0 km', rating: 3.9 },
];

const TenantExplore = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Explore Your Area</h2>
        <p className="text-muted-foreground text-sm">Discover nearby amenities and points of interest around your property</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyPlaces.map((place, idx) => (
          <div key={idx} className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm">{place.name}</h3>
              <div className="flex items-center gap-0.5">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-medium">{place.rating}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs mb-3">{place.category}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} /> {place.distance} away
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantExplore;
