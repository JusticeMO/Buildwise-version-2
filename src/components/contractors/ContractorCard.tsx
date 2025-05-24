
import React from 'react';
import { Phone, Check, MapPin, Award, Star, Users, ExternalLink } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useToast } from '@/hooks/use-toast';
import { Contractor } from '@/types/contractor';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ContractorCardProps {
  contractor: Contractor;
  onContactClick: (contractor: Contractor) => void;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: () => void;
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

const ContractorCard: React.FC<ContractorCardProps> = ({ 
  contractor, 
  onContactClick, 
  isSelected = false,
  selectable = false,
  onSelect
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/vendors/${contractor.id}`);
  };

  return (
    <Card 
      variant="outline" 
      className={cn(
        "overflow-hidden animate-fade-in",
        isSelected && "border-primary border-2"
      )}
      withHover
      padding="none"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Contractor Logo/Image */}
          <div className="w-full md:w-40 h-40 bg-muted rounded-lg flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-muted-foreground">
              {contractor.name.charAt(0)}
            </span>
          </div>
          
          {/* Contractor Details */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleViewProfile}
                    className="text-lg font-medium hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {contractor.name}
                    <ExternalLink size={16} />
                  </button>
                  {contractor.verified && (
                    <div className="bg-green-100 text-green-800 rounded-full p-0.5" title="Verified Contractor">
                      <Check size={14} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <StarRating rating={contractor.rating} />
                  <span className="text-sm text-muted-foreground">
                    {contractor.reviewCount} reviews
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {selectable && (
                  <Button 
                    size="sm"
                    variant={isSelected ? "primary" : "outline"}
                    className="shrink-0"
                    onClick={onSelect}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} className="mr-1" /> Selected
                      </>
                    ) : (
                      "Select"
                    )}
                  </Button>
                )}
                <Button 
                  size="sm"
                  variant="outline"
                  icon={<Phone size={16} />}
                  className="shrink-0"
                  onClick={() => onContactClick(contractor)}
                >
                  Contact
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {contractor.specialization.map((spec, index) => (
                <SpecializationTag key={index} label={spec} />
              ))}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{contractor.location}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {contractor.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>{contractor.completedProjects} projects completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-600" />
                <span>Featured: {contractor.featuredProject}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContractorCard;
