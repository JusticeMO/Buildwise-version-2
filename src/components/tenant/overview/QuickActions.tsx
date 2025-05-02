
import React from 'react';
import { CheckCircle, AlertCircle, CalendarDays, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  formattedDueDate: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ formattedDueDate }) => {
  return (
    <div>
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
    </div>
  );
};

export default QuickActions;
