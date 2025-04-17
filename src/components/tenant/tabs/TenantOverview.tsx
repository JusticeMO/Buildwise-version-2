
import React from 'react';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';
import { CreditCard, Upload, MessageSquare, FileText, CheckCircle, Droplet, Bell } from 'lucide-react';
import { useTenantData } from '@/hooks/useTenantData';
import { format } from 'date-fns';

const TenantOverview = () => {
  const { lease, payments, isLoading } = useTenantData();

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!lease) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">No Active Lease</h2>
        <p className="text-muted-foreground">You currently don't have an active lease.</p>
      </div>
    );
  }

  const currentRent = lease.rent_amount;
  const latestPayment = payments?.[0];
  const dueDate = new Date(lease.start_date);
  dueDate.setDate(1); // Assuming rent is due on the 1st of each month
  const isOverdue = new Date() > dueDate;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Rent</p>
          <p className="text-2xl font-bold">KES {currentRent.toLocaleString()}</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Due: {format(dueDate, 'MMM d, yyyy')}</span>
            <Badge variant={isOverdue ? 'destructive' : 'outline'}>
              {isOverdue ? 'Overdue' : '3 days left'}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Unit Details</p>
          <p className="text-2xl font-bold">{lease.unit.unit_number}</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>{lease.unit.property.title}</span>
            <Badge variant="outline">Current</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Lease Status</p>
          <p className="text-2xl font-bold">{lease.status}</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Until: {format(new Date(lease.end_date), 'MMM d, yyyy')}</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Latest Payment</p>
          <p className="text-2xl font-bold">
            {latestPayment ? `KES ${latestPayment.amount.toLocaleString()}` : 'No payments'}
          </p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>
              {latestPayment ? format(new Date(latestPayment.payment_date), 'MMM d, yyyy') : 'N/A'}
            </span>
            {latestPayment && (
              <Badge variant="outline" className="capitalize">{latestPayment.status}</Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <CreditCard size={24} />
              <span>Pay Rent</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <Upload size={24} />
              <span>Upload Payment</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <MessageSquare size={24} />
              <span>New Message</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <FileText size={24} />
              <span>View Receipt</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                <CheckCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Rent payment confirmed</p>
                <p className="text-xs text-muted-foreground">June 1, 2023 • KES 25,000</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <Droplet size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Water bill generated</p>
                <p className="text-xs text-muted-foreground">June 15, 2023 • KES 1,200</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <Bell size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Rent reminder sent</p>
                <p className="text-xs text-muted-foreground">June 28, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantOverview;
