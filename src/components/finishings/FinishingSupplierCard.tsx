
import React from 'react';
import { Phone, Check, MapPin, Award, Star, Paintbrush, Grid, Lamp } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { Supplier } from '@/types/supplier';
import { cn } from '@/lib/utils';

interface FinishingSupplierCardProps {
  supplier: Supplier;
  onContactClick: (supplier: Supplier) => void;
  onSpecializationClick: (specialization: string) => void;
  onLocationClick: (location: string) => void;
}

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= Math.round(rating) ? "currentColor" : "none"}
            className={star <= Math.round(rating) ? "" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Specialization tag component
const SpecializationTag = ({ label, onClick }: { label: string, onClick?: () => void }) => (
  <span 
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground",
      onClick && "cursor-pointer hover:bg-primary/10 transition-colors"
    )}
    onClick={onClick}
  >
    {label}
  </span>
);

// Icon for finishing category
const FinishingIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'interior painting':
    case 'exterior painting':
      return <Paintbrush size={32} className="text-primary opacity-50" />;
    case 'lighting design':
    case 'light fixtures':
      return <Lamp size={32} className="text-primary opacity-50" />;
    case 'ceramic tiles':
    case 'porcelain flooring':
      return <Grid size={32} className="text-primary opacity-50" />;
    default:
      return <Lamp size={32} className="text-primary opacity-50" />;
  }
};

const FinishingSupplierCard: React.FC<FinishingSupplierCardProps> = ({ 
  supplier, 
  onContactClick,
  onSpecializationClick,
  onLocationClick
}) => {
  return (
    <Card 
      key={supplier.id} 
      variant="outline" 
      className="overflow-hidden"
      withHover
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Supplier Logo/Image */}
          <div className="w-full md:w-40 h-40 bg-muted rounded-lg flex items-center justify-center shrink-0">
            <FinishingIcon category={supplier.specialization[0]} />
          </div>
          
          {/* Supplier Details */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{supplier.name}</h3>
                  {supplier.verified && (
                    <div className="bg-green-100 text-green-800 rounded-full p-0.5" title="Verified Supplier">
                      <Check size={14} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <StarRating rating={supplier.rating} />
                  <span className="text-sm text-muted-foreground">
                    {supplier.reviewCount} reviews
                  </span>
                </div>
              </div>
              <Button 
                size="sm"
                variant="outline"
                icon={<Phone size={16} />}
                className="shrink-0"
                onClick={() => onContactClick(supplier)}
              >
                Contact
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {supplier.specialization.map((spec, index) => (
                <SpecializationTag 
                  key={index} 
                  label={spec} 
                  onClick={() => onSpecializationClick(spec)}
                />
              ))}
              <div 
                className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => onLocationClick(supplier.location)}
              >
                <MapPin size={14} />
                <span>{supplier.location}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {supplier.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>{supplier.completedProjects} projects completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-600" />
                <span>Featured: {supplier.featuredProject}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinishingSupplierCard;
