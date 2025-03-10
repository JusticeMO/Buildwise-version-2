
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingTierProps {
  name: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  billingCycle: 'monthly' | 'yearly';
  contractTerm: number;
  onSelectPlan: () => void;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  price, 
  yearlyPrice, 
  features, 
  isPopular = false, 
  billingCycle, 
  contractTerm,
  onSelectPlan
}) => {
  const calculatedPrice = billingCycle === 'monthly' ? price : yearlyPrice;
  const discountedPrice = calculatedPrice * (1 - (contractTerm - 1) * 0.05);

  return (
    <div className={cn(
      "border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow",
      isPopular ? "border-primary" : "border-muted",
    )}>
      {isPopular && (
        <div className="bg-primary text-primary-foreground py-2 text-center font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold tracking-tight">
            KES {discountedPrice?.toFixed(0)}
          </span>
          <span className="text-muted-foreground">
            /{billingCycle === 'monthly' ? 'month' : 'year'}
          </span>
          {contractTerm > 1 && (
            <p className="text-xs text-green-600 mt-1">
              {contractTerm === 2 ? '5% discount' : '10% discount'} for {contractTerm}-year contract
            </p>
          )}
        </div>
        <ul className="mb-6 space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          className="w-full text-sm font-medium rounded-md py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onSelectPlan}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PricingTier;
