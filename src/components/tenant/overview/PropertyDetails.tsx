
import React from 'react';

interface PropertyDetailsRowProps {
  lease: any;
}

const PropertyDetailsRow: React.FC<PropertyDetailsRowProps> = ({ lease }) => {
  const propertyName = lease?.unit?.property?.title || 'Westlands Heights';
  const unitNumber = lease?.unit?.unitNumber || '3B';
  const rentAmount = lease?.rentAmount || 25000;
  const registryCode = `PROP-WH001`;

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-border">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">Property</p>
          <p className="text-sm font-medium">{propertyName}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">Agreement ID</p>
          <p className="text-sm font-medium">{registryCode}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">Unit</p>
          <p className="text-sm font-medium">Apartment {unitNumber}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1">Monthly Rent</p>
          <p className="text-sm font-medium text-amber-600">Ksh {rentAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsRow;
