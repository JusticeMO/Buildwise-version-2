
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type PaymentStatus = 'pending' | 'paid' | 'overdue';

interface KeyInfoCardsProps {
  lease: any;
  paymentStatus: PaymentStatus;
  formattedDueDate: string;
}

const KeyInfoCards: React.FC<KeyInfoCardsProps> = ({ lease, paymentStatus, formattedDueDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <h3 className="text-sm text-muted-foreground">Current Rent</h3>
            <p className="text-2xl font-bold mt-1">KES {lease.rentAmount.toLocaleString()}</p>
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
  );
};

export default KeyInfoCards;
