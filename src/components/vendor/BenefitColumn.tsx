
import React from 'react';

interface BenefitItemProps {
  number: number;
  title: string;
  description: string;
}

interface BenefitColumnProps {
  title: React.ReactNode;
  items: BenefitItemProps[];
}

const BenefitColumn = ({ title, items }: BenefitColumnProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold flex items-center gap-2">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-semibold">{item.number}</span>
            </div>
            <div>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitColumn;
