
import React from 'react';
import { Phone, Check, MapPin, Award, Star, Sofa, Paintbrush, Lamp, ExternalLink } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { Supplier } from '@/types/supplier';
import { useNavigate } from 'react-router-dom';

interface SupplierCardProps {
  supplier: Supplier;
  onContactClick: (supplier: Supplier) => void;
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
const SpecializationTag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
    {label}
  </span>
);

// Icon component for supplier categories
const CategoryIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'furniture':
    case 'handcrafted furniture':
    case 'home decor':
      return <Sofa size={16} className="text-primary" />;
    case 'interior painting':
    case 'decorative finishes':
      return <Paintbrush size={16} className="text-primary" />;
    case 'lighting design':
    case 'electrical fixtures':
      return <Lamp size={16} className="text-primary" />;
    default:
      return <Check size={16} className="text-primary" />;
  }
};

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, onContactClick }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/providers/supplier-demo-1`);
  };

  return (
    <Card 
      variant="outline" 
      className="overflow-hidden animate-fade-in"
      withHover
      padding="none"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Supplier Logo/Image */}
          <div className="w-full md:w-40 h-40 bg-muted rounded-lg flex items-center justify-center shrink-0">
            <CategoryIcon category={supplier.specialization[0]} />
            <span className="text-2xl font-bold text-muted-foreground ml-2">
              {supplier.name.charAt(0)}
            </span>
          </div>
          
          {/* Supplier Details */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleViewProfile}
                    className="text-lg font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {supplier.name}
                    <ExternalLink size={16} />
                  </button>
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
                <SpecializationTag key={index} label={spec} />
              ))}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
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

export default SupplierCard;
