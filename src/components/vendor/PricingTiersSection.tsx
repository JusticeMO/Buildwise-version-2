
import React from 'react';
import PricingTier from './PricingTier';

interface PricingTiersSectionProps {
  billingCycle: 'monthly' | 'yearly';
  contractTerm: number;
  onSelectPlan: (planName: string) => void;
}

const PricingTiersSection: React.FC<PricingTiersSectionProps> = ({ 
  billingCycle, 
  contractTerm, 
  onSelectPlan 
}) => {
  // Pricing tiers data
  const tiers = [
    {
      name: "Basic",
      price: 4900,
      yearlyPrice: 49000,
      features: [
        "Access to basic leads",
        "Standard profile features",
        "Up to 5 project listings"
      ]
    },
    {
      name: "Pro",
      price: 9900,
      yearlyPrice: 99000,
      features: [
        "Access to premium leads",
        "Enhanced profile features",
        "Unlimited project listings",
        "Priority support"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: 19900,
      yearlyPrice: 199000,
      features: [
        "Exclusive leads",
        "Custom profile features",
        "Unlimited project listings",
        "Dedicated account manager",
        "Advanced analytics"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier) => (
        <PricingTier
          key={tier.name}
          {...tier}
          billingCycle={billingCycle}
          contractTerm={contractTerm}
          onSelectPlan={() => onSelectPlan(tier.name)}
        />
      ))}
    </div>
  );
};

export default PricingTiersSection;
