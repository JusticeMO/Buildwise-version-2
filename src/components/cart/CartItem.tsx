
import React from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: 'service' | 'material';
  supplier?: string;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ 
  id, 
  name, 
  price, 
  quantity, 
  image, 
  type,
  supplier,
  onIncrease, 
  onDecrease, 
  onRemove 
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 bg-secondary/20 rounded-md flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="h-12 w-12 object-contain" />
          ) : (
            <div className="text-xl font-bold text-gray-300">{name.substring(0, 1)}</div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          {supplier && (
            <p className="text-xs text-muted-foreground">by {supplier}</p>
          )}
          <div className="flex items-center mt-1">
            <p className="text-sm text-muted-foreground">KES {price.toLocaleString()}</p>
            {type === 'material' && (
              <Badge variant="outline" className="ml-2 text-xs">Material</Badge>
            )}
            {type === 'service' && (
              <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/20">Service</Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 p-0 rounded-r-none"
            onClick={() => onDecrease(id)}
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 p-0 rounded-l-none"
            onClick={() => onIncrease(id)}
          >
            <Plus size={14} />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onRemove(id)}
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
