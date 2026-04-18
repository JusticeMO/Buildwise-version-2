
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LeaseInformationProps {
  lease: any;
  daysUntilExpiry: number;
  leaseProgressPercent: number;
}

const LeaseInformation: React.FC<LeaseInformationProps> = ({ lease, daysUntilExpiry, leaseProgressPercent }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium">Lease Information</h3>
            <p className="text-muted-foreground">
              {lease.unit.property.title}, Unit {lease.unit.unitNumber}
            </p>
          </div>
          <Badge 
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Active
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Lease Period</p>
            <p className="mb-4">
              {new Date(lease.startDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} - {new Date(lease.endDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
            
            <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
            <p className="mb-4">KES {lease.rentAmount.toLocaleString()}</p>
            
            <p className="text-sm text-muted-foreground mb-1">Security Deposit</p>
            <p className="mb-4">KES {lease.depositAmount ? lease.depositAmount.toLocaleString() : 'N/A'}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Lease Expiry</p>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{daysUntilExpiry} days remaining</span>
                <span className="text-sm">{Math.round(leaseProgressPercent)}%</span>
              </div>
              <Progress value={leaseProgressPercent} className="h-2" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-1">Property Address</p>
            <p className="mb-4">{lease.unit.property.address || 'Address not available'}</p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View Full Lease
                  <ArrowRight className="ml-1" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogTitle>Lease Agreement</DialogTitle>
                <div className="mt-4">
                  <p>Lease agreement details would be displayed here...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseInformation;
