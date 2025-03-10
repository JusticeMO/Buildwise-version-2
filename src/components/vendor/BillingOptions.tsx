
import React from 'react';
import { cn } from '@/lib/utils';

interface BillingOptionsProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  contractTerm: number;
  setContractTerm: (term: number) => void;
}

const BillingOptions: React.FC<BillingOptionsProps> = ({
  billingCycle,
  setBillingCycle,
  contractTerm,
  setContractTerm
}) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-bold mb-6">Choose Your Membership Plan</h2>
      
      <div className="flex flex-col sm:flex-row gap-6 mb-6 w-full max-w-md">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Billing Cycle</label>
          <div className="flex rounded-lg overflow-hidden border">
            <button
              className={cn(
                "flex-1 py-2 px-4 text-sm font-medium transition-colors",
                billingCycle === 'monthly' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={cn(
                "flex-1 py-2 px-4 text-sm font-medium transition-colors",
                billingCycle === 'yearly' 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
          {billingCycle === 'yearly' && (
            <p className="text-xs text-green-600 mt-1">Save 16% with annual billing</p>
          )}
        </div>
        
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Contract Term</label>
          <div className="flex rounded-lg overflow-hidden border">
            {[1, 2, 3].map(term => (
              <button
                key={term}
                className={cn(
                  "flex-1 py-2 px-4 text-sm font-medium transition-colors",
                  contractTerm === term 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
                onClick={() => setContractTerm(term)}
              >
                {term} {term === 1 ? 'Year' : 'Years'}
              </button>
            ))}
          </div>
          {contractTerm > 1 && (
            <p className="text-xs text-green-600 mt-1">
              {contractTerm === 2 ? '5% discount' : '10% discount'} for {contractTerm}-year contract
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingOptions;
