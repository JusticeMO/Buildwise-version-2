
import React from 'react';
import { Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TenantGarbageServices = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Garbage Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Monthly Fee</p>
          <p className="text-2xl font-bold">KES 500</p>
          <div className="mt-2 text-sm">
            <Badge variant="secondary" className="bg-green-100 text-green-800">Paid for June</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Collection Schedule</p>
          <p className="text-2xl font-bold">Tuesday, Friday</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Between 8 AM - 11 AM</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Next Collection</p>
          <p className="text-2xl font-bold">July 4, 2023</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Tuesday</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="font-medium mb-4">Service Details</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mt-1">
              <Trash2 size={16} />
            </div>
            <div>
              <p className="font-medium">Regular Waste Collection</p>
              <p className="text-sm text-muted-foreground">
                Household waste collected twice weekly. Please ensure trash is properly bagged and placed
                in the designated collection area by 8 AM on collection days.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mt-1">
              <Calendar size={16} />
            </div>
            <div>
              <p className="font-medium">Recycling Program</p>
              <p className="text-sm text-muted-foreground">
                Recycling materials (paper, plastic, glass) are collected every Friday. 
                Please sort your recyclables according to the guidelines provided.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mt-1">
              <AlertCircle size={16} />
            </div>
            <div>
              <p className="font-medium">Special Waste Disposal</p>
              <p className="text-sm text-muted-foreground">
                For large items or hazardous waste, please contact property management to arrange special disposal.
                Additional fees may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-medium mb-4">Payment History</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium">Month</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Amount (KES)</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Payment Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">June 2023</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">June 3, 2023</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">May 2023</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">May 5, 2023</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">April 2023</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">April 2, 2023</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantGarbageServices;
