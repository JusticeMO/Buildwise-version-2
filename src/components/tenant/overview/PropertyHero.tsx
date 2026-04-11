
import React from 'react';

interface PropertyHeroProps {
  lease: any;
}

const PropertyHero: React.FC<PropertyHeroProps> = ({ lease }) => {
  const propertyName = lease?.unit?.property?.title || 'Westlands Heights';

  return (
    <div className="relative rounded-xl overflow-hidden mb-6 h-48 sm:h-64 bg-foreground/5">
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 to-foreground/40" />
      <img
        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
        alt="Property"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
      />
      
      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70 font-medium mb-1">
          Authenticated Institutional Asset
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">{propertyName}</h2>
      </div>
    </div>
  );
};

export default PropertyHero;
