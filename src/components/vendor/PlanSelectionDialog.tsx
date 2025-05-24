
import React from 'react';
import { PricingPlan } from '@/types/vendor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import BillingOptions from '@/components/vendor/BillingOptions';

interface PlanSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  businessType: string;
  pricingPlans: PricingPlan[];
  billingPeriod: 'monthly' | 'yearly';
  selectedYears: 1 | 2 | 3;
  formatPrice: (price: number) => string;
  onPlanSelect: (plan: PricingPlan) => void;
}

const PlanSelectionDialog: React.FC<PlanSelectionDialogProps> = ({
  isOpen,
  onOpenChange,
  businessType,
  pricingPlans,
  billingPeriod,
  selectedYears,
  formatPrice,
  onPlanSelect
}) => {
  const getFilteredPlans = () => {
    return pricingPlans.filter(plan => plan.vendorType === businessType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
          <DialogDescription>
            Select the plan that best suits your {businessType} business
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {getFilteredPlans().map((plan) => {
            const basePrice = billingPeriod === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12);
            let discount = 0;
            if (selectedYears === 2) discount = 0.1;
            if (selectedYears === 3) discount = 0.2;
            const discountedPrice = basePrice * (1 - discount);
            
            return (
              <button
                key={plan.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  plan.recommended ? 'border-primary' : 'border-border'
                } hover:bg-accent transition-colors`}
                onClick={() => onPlanSelect(plan)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{plan.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(discountedPrice)}/month
                  </span>
                  {discount > 0 && (
                    <span className="text-xs text-emerald-600">
                      {Math.round(discount * 100)}% discount applied
                    </span>
                  )}
                </div>
                <BillingOptions billingPeriod={billingPeriod} selectedYears={selectedYears} />
              </button>
            );
          })}
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground mb-2 flex items-center">
            You'll be contacted to complete the payment after your application is approved
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSelectionDialog;
