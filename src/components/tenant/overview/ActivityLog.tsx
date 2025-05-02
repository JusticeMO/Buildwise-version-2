
import React from 'react';
import { CheckCircle, AlertCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityLogProps {
  lease: any;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ lease }) => {
  return (
    <div>
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

export default ActivityLog;
