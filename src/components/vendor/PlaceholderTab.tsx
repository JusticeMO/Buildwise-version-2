
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderTabProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PlaceholderTab = ({ icon: Icon, title, description }: PlaceholderTabProps) => {
  return (
    <div className="text-center py-12">
      <Icon size={48} className="mx-auto text-primary mb-4" />
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default PlaceholderTab;
