
import React from 'react';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NoLease: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Building size={40} className="mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No active lease found</h3>
      <p className="text-muted-foreground mt-2 mb-4">
        We couldn't find any active lease agreement for your account
      </p>
      <Button>Contact Property Manager</Button>
    </div>
  );
};

export default NoLease;
