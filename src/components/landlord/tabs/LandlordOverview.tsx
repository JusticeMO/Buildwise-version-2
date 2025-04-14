
import React from 'react';
import { Card } from '@/components/ui/card';
import { Building, Users, CreditCard, AlertTriangle } from 'lucide-react';

const LandlordOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Landlord Dashboard</h2>
      <p className="text-muted-foreground mb-6">
        Manage all your properties and tenants from one central location
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-700">
              <Building size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Properties</p>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-700">
              <Users size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tenants</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full text-purple-700">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Revenue</p>
              <p className="text-2xl font-semibold">KES 245,000</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full text-amber-700">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Pending Issues</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: "Tenant John Doe paid rent", time: "Today, 9:30 AM" },
              { text: "Maintenance request submitted", time: "Yesterday, 4:15 PM" },
              { text: "New tenant application received", time: "Apr 12, 11:00 AM" },
              { text: "Property inspection completed", time: "Apr 10, 2:30 PM" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                <p>{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Payments</h3>
          <div className="space-y-4">
            {[
              { tenant: "Jane Smith", property: "Apartment 3B", amount: "KES 35,000", date: "Apr 15, 2025" },
              { tenant: "Michael Johnson", property: "House 7", amount: "KES 45,000", date: "Apr 20, 2025" },
              { tenant: "Sarah Williams", property: "Apartment 5A", amount: "KES 28,000", date: "Apr 30, 2025" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{item.tenant}</p>
                  <p className="text-xs text-muted-foreground">{item.property}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.amount}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandlordOverview;
