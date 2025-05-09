
import React from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useIsMobile } from '@/hooks/use-mobile';
import { BuildingMaterial } from '@/types/buildingMaterial';

interface BuildingMaterialCardProps {
  material: BuildingMaterial;
  onAddToCart: (material: BuildingMaterial) => void;
}

const BuildingMaterialCard = ({ material, onAddToCart }: BuildingMaterialCardProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="bg-secondary/20 w-full md:w-48 h-36 md:h-48 flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <img 
              src={material.image} 
              alt={material.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        
        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div>
              <h3 className="text-lg font-semibold">{material.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{material.supplier}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {material.categories.map((category, i) => (
                  <span key={i} className="px-2 py-1 bg-secondary text-xs rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              
              <p className="text-sm mb-4">{material.description}</p>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2">
              <div className="text-left md:text-right">
                <p className="text-xl md:text-2xl font-bold text-primary">{material.price}</p>
                <p className="text-xs text-muted-foreground">{material.unit}</p>
              </div>
              
              <div className="flex flex-row md:flex-col gap-2 w-auto">
                <Button 
                  onClick={() => onAddToCart(material)}
                  icon={<ShoppingCart size={16} />}
                  size={isMobile ? "sm" : "default"}
                  className="w-full md:w-auto"
                >
                  {isMobile ? "Add" : "Add to Cart"}
                </Button>
                {!isMobile && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full md:w-auto"
                    icon={<ExternalLink size={14} />}
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {isMobile && (
            <div className="mt-3 flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                icon={<ExternalLink size={14} />}
              >
                View Details
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BuildingMaterialCard;
