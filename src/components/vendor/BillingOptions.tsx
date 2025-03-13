
import React from 'react';
import { Calendar } from 'lucide-react';

interface BillingOptionsProps {
  billingPeriod: 'monthly' | 'yearly';
  selectedYears: 1 | 2 | 3;
}

const BillingOptions: React.FC<BillingOptionsProps> = ({ billingPeriod, selectedYears }) => {
  return (
    <div className="flex items-center space-x-2">
      {billingPeriod === 'yearly' && (
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Save 15%</span>
      )}
      <Calendar className="text-muted-foreground" size={16} />
      <span className="text-sm">{selectedYears} {selectedYears === 1 ? 'year' : 'years'}</span>
    </div>
  );
};

export default BillingOptions;
