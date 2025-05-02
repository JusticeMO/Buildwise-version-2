
import React from 'react';
import { useTenantData } from '@/hooks/useTenantData';

// Import refactored components
import LoadingState from '../overview/LoadingState';
import NoLease from '../overview/NoLease';
import KeyInfoCards from '../overview/KeyInfoCards';
import LeaseInformation from '../overview/LeaseInformation';
import QuickActions from '../overview/QuickActions';
import ActivityLog from '../overview/ActivityLog';

// Define possible payment status types
type PaymentStatus = 'pending' | 'paid' | 'overdue';

const TenantOverview = () => {
  const { lease, payments, isLoading } = useTenantData();
  
  if (isLoading) {
    return <LoadingState />;
  }

  // Check if lease data exists
  if (!lease) {
    return <NoLease />;
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
  
  // Calculate payment status for current month
  const paymentStatus = "pending" as PaymentStatus; // Default to pending
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Key Info Cards */}
      <KeyInfoCards 
        lease={lease} 
        paymentStatus={paymentStatus} 
        formattedDueDate={formattedDueDate} 
      />
      
      {/* Lease Information */}
      <LeaseInformation 
        lease={lease} 
        daysUntilExpiry={daysUntilExpiry} 
        leaseProgressPercent={leaseProgressPercent} 
      />
      
      {/* Quick Actions */}
      <QuickActions formattedDueDate={formattedDueDate} />
      
      {/* Recent Activity */}
      <ActivityLog lease={lease} />
    </div>
  );
};

export default TenantOverview;
