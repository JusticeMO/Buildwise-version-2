
import React from 'react';
import { Building2, Users } from 'lucide-react';
import BenefitColumn from './BenefitColumn';
import { BenefitItem } from '@/data/benefitData';

interface BenefitColumnsProps {
  propertyOwnerBenefits: BenefitItem[];
  tenantBenefits: BenefitItem[];
}

const BenefitColumns = ({ propertyOwnerBenefits, tenantBenefits }: BenefitColumnsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-10 mb-16">
      <BenefitColumn 
        title={<><Building2 className="text-primary" /> For Property Owners</>} 
        items={propertyOwnerBenefits} 
      />
      <BenefitColumn 
        title={<><Users className="text-primary" /> For Tenants</>} 
        items={tenantBenefits} 
      />
    </div>
  );
};

export default BenefitColumns;
