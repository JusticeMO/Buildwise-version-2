
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  recommended?: boolean;
  vendorType?: 'contractor' | 'supplier' | 'consultant' | 'all';
}
