
import React from 'react';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';
import { ChevronRight, CreditCard, Upload, MessageSquare, FileText, CheckCircle, Droplet, Bell } from 'lucide-react';

const TenantOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Rent</p>
          <p className="text-2xl font-bold">KES 25,000</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Due: July 1, 2023</span>
            <Badge variant={new Date() > new Date('2023-07-01') ? 'destructive' : 'outline'}>
              {new Date() > new Date('2023-07-01') ? 'Overdue' : '3 days left'}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Water Bill</p>
          <p className="text-2xl font-bold">KES 1,200</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Usage: 6 units</span>
            <Badge variant="outline">Current Month</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Garbage Fee</p>
          <p className="text-2xl font-bold">KES 500</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Monthly Fee</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Unread Messages</p>
          <p className="text-2xl font-bold">2</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>From: Property Manager</span>
            <button className="text-primary hover:underline flex items-center gap-1">
              View <ChevronRight size={14} />
            </button>
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
