
import React, { useState } from 'react';
import { PricingPlan } from '@/types/vendor';
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/shared/Button';

interface PricingTiersSectionProps {
  pricingPlans: PricingPlan[];
  billingPeriod: 'monthly' | 'yearly';
  setBillingPeriod: (period: 'monthly' | 'yearly') => void;
  selectedYears: 1 | 2 | 3;
  setSelectedYears: (years: 1 | 2 | 3) => void;
  formatPrice: (price: number) => string;
  calculateMonthlySavings: (plan: PricingPlan) => string;
}

const PricingTier = ({ 
  plan, 
  billingPeriod, 
  formatPrice, 
  calculateMonthlySavings 
}: { 
  plan: PricingPlan, 
  billingPeriod: 'monthly' | 'yearly',
  formatPrice: (price: number) => string,
  calculateMonthlySavings: (plan: PricingPlan) => string
}) => {
  return (
    <div 
      className={`flex flex-col justify-between relative rounded-lg border ${
        plan.recommended 
          ? 'border-primary shadow-lg' 
          : 'border-border shadow-sm'
      } p-6 bg-card`}
    >
      {plan.recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
          Recommended
        </div>
      )}
      
      <div>
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <p className="text-muted-foreground mb-4">{plan.description}</p>
        
        <div className="mb-6">
          <span className="text-3xl font-bold">
            {formatPrice(billingPeriod === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12))}
          </span>
          <span className="text-muted-foreground">/month</span>
          
          {billingPeriod === 'yearly' && (
            <div className="text-sm text-emerald-600 mt-1">
              Save {calculateMonthlySavings(plan)}/month
            </div>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="text-primary mr-2 shrink-0 mt-1" size={16} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button
        variant={plan.recommended ? 'primary' : 'outline'}
        fullWidth
        onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Get Started
      </Button>
    </div>
  );
};

const PricingTiersSection: React.FC<PricingTiersSectionProps> = ({
  pricingPlans,
  billingPeriod,
  setBillingPeriod,
  selectedYears,
  setSelectedYears,
  formatPrice,
  calculateMonthlySavings
}) => {
  const [selectedVendorType, setSelectedVendorType] = useState<'all' | 'contractor' | 'supplier' | 'consultant'>('all');
  
  const filteredPlans = pricingPlans.filter(plan => 
    selectedVendorType === 'all' || plan.vendorType === 'all' || plan.vendorType === selectedVendorType
  );

  return (
    <section id="pricing" className="py-16 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Choose the plan that fits your business needs and growth goals</p>
          
          <div className="flex justify-center items-center mt-8 mb-8 space-x-4">
            <span className={`font-medium ${billingPeriod === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                billingPeriod === 'yearly' ? 'bg-primary' : 'bg-input'
              }`}
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-background transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${billingPeriod === 'yearly' ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly <span className="text-xs text-emerald-500 ml-1">Save 15%</span>
            </span>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedYears(1)}
              className={`px-4 py-2 rounded-md ${selectedYears === 1 ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              1 Year
            </button>
            <button
              onClick={() => setSelectedYears(2)}
              className={`px-4 py-2 rounded-md ${selectedYears === 2 ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              2 Years <span className="text-xs text-emerald-500 ml-1">10% off</span>
            </button>
            <button
              onClick={() => setSelectedYears(3)}
              className={`px-4 py-2 rounded-md ${selectedYears === 3 ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              3 Years <span className="text-xs text-emerald-500 ml-1">20% off</span>
            </button>
          </div>
          
          <div className="flex justify-center space-x-2 mb-8">
            <button
              onClick={() => setSelectedVendorType('all')}
              className={`px-4 py-2 rounded-md ${selectedVendorType === 'all' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              All Vendors
            </button>
            <button
              onClick={() => setSelectedVendorType('contractor')}
              className={`px-4 py-2 rounded-md ${selectedVendorType === 'contractor' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              Contractors
            </button>
            <button
              onClick={() => setSelectedVendorType('supplier')}
              className={`px-4 py-2 rounded-md ${selectedVendorType === 'supplier' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              Suppliers
            </button>
            <button
              onClick={() => setSelectedVendorType('consultant')}
              className={`px-4 py-2 rounded-md ${selectedVendorType === 'consultant' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
            >
              Consultants
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPlans.map((plan) => (
            <PricingTier 
              key={plan.id} 
              plan={plan} 
              billingPeriod={billingPeriod} 
              formatPrice={formatPrice} 
              calculateMonthlySavings={calculateMonthlySavings} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiersSection;
