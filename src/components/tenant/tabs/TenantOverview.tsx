
import React from 'react';
import { ArrowRight, CheckCircle, AlertCircle, CalendarDays, Building, Home } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTenantData } from '@/hooks/useTenantData';

// Define possible payment status types
type PaymentStatus = 'pending' | 'paid' | 'overdue';

const TenantOverview = () => {
  const { lease, payments, isLoading } = useTenantData();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading your data...</p>
        </div>
      </div>
    );
  }

  // Check if lease data exists
  if (!lease) {
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
  }

  // Calculate rent due date from the lease
  const currentDate = new Date();
  const leaseStartDate = new Date(lease.start_date);
  const leaseEndDate = new Date(lease.end_date);
  
  // Calculate days until lease expiry
  const daysUntilExpiry = Math.ceil((leaseEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine current month's due date - assume rent is due on the same day as lease start date
  const nextDueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), leaseStartDate.getDate());
  if (nextDueDate < currentDate) {
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);
  }
  
  // Format date
  const formattedDueDate = nextDueDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Calculate lease progress
  const totalLeaseDays = Math.ceil((leaseEndDate.getTime() - leaseStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((currentDate.getTime() - leaseStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const leaseProgressPercent = Math.min(Math.max((daysElapsed / totalLeaseDays) * 100, 0), 100);
  
  // Calculate payment status for current month - changed to a compatible type
  const paymentStatus: PaymentStatus = "pending"; // Default to pending, replace with actual status from lease data when available
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Key Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <h3 className="text-sm text-muted-foreground">Current Rent</h3>
              <p className="text-2xl font-bold mt-1">KES {lease.rent_amount.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <p className="text-sm text-muted-foreground">Due: {formattedDueDate}</p>
                <Badge 
                  variant={paymentStatus === "paid" ? "outline" : "secondary"} 
                  className={`ml-2 ${
                    paymentStatus === "paid" 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {paymentStatus === "paid" ? "Paid" : "Due"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <h3 className="text-sm text-muted-foreground">Water Bill</h3>
              <p className="text-2xl font-bold mt-1">KES 1,200</p>
              <p className="text-sm text-muted-foreground mt-2">Usage: 6 units</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <h3 className="text-sm text-muted-foreground">Garbage Fee</h3>
              <p className="text-2xl font-bold mt-1">KES 500</p>
              <p className="text-sm text-muted-foreground mt-2">Monthly Fee</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <h3 className="text-sm text-muted-foreground">Unread Messages</h3>
              <p className="text-2xl font-bold mt-1">2</p>
              <p className="text-sm text-muted-foreground mt-2">From: Property Manager</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Lease Information */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium">Lease Information</h3>
              <p className="text-muted-foreground">
                {lease.unit.property.title}, Unit {lease.unit.unit_number}
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
                {new Date(lease.start_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })} - {new Date(lease.end_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
              
              <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
              <p className="mb-4">KES {lease.rent_amount.toLocaleString()}</p>
              
              <p className="text-sm text-muted-foreground mb-1">Security Deposit</p>
              <p className="mb-4">KES {lease.deposit_amount ? lease.deposit_amount.toLocaleString() : 'N/A'}</p>
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
      
      {/* Quick Actions */}
      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button 
          variant="outline" 
          className="h-auto p-6 justify-start"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">Pay Rent</p>
              <p className="text-xs text-muted-foreground">Due: {formattedDueDate}</p>
            </div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-6 justify-start"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">Report Issue</p>
              <p className="text-xs text-muted-foreground">Maintenance request</p>
            </div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-6 justify-start"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">Book Amenity</p>
              <p className="text-xs text-muted-foreground">Common areas</p>
            </div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-6 justify-start"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">View Documents</p>
              <p className="text-xs text-muted-foreground">Contracts & receipts</p>
            </div>
          </div>
        </Button>
      </div>
      
      {/* Recent Activity */}
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h4 className="font-medium">Activity Log</h4>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        
        <div>
          <div className="flex items-center p-4 border-b">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p>Rent payment confirmed</p>
              <p className="text-sm text-muted-foreground">June 1, 2023 • KES {lease.rent_amount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 border-b">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p>Water bill generated</p>
              <p className="text-sm text-muted-foreground">June 15, 2023 • KES 1,200</p>
            </div>
          </div>
          
          <div className="flex items-center p-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <CalendarDays className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p>Rent reminder sent</p>
              <p className="text-sm text-muted-foreground">June 28, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantOverview;
