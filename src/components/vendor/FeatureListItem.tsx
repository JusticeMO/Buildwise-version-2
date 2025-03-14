
import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureListItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <li className="flex gap-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
};

export default FeatureListItem;
