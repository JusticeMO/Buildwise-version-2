
import React from 'react';
import { Card } from '@/components/ui/card';
import { Home, Users, CreditCard, AlertTriangle, Clock, Building } from 'lucide-react';
import Button from '@/components/shared/Button';

const LandlordOverview = () => {
  // Mock data for the overview
  const properties = [
    { id: 1, name: 'Riverside Apartments', units: 12, occupiedUnits: 10, rentCollected: 250000, rentDue: 50000 },
    { id: 2, name: 'Green Gardens Estate', units: 8, occupiedUnits: 7, rentCollected: 175000, rentDue: 25000 },
  ];

  const recentActivities = [
    { id: 1, activity: 'Rent payment received from John Doe', amount: 25000, date: '2023-07-01', status: 'success' },
    { id: 2, activity: 'Maintenance request from Unit 5B', date: '2023-06-30', status: 'pending' },
    { id: 3, activity: 'New lease signed for Unit 3A', date: '2023-06-28', status: 'success' },
    { id: 4, activity: 'Rent payment overdue for Unit 8C', amount: 30000, date: '2023-06-27', status: 'danger' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            icon={<Building size={16} />}
            iconPosition="left"
          >
            Add Property
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold mt-1">2</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Home className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">20 units total</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <p className="text-2xl font-bold mt-1">85%</p>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <Users className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">17 of 20 units occupied</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rent Collected</p>
              <p className="text-2xl font-bold mt-1">KES 425,000</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <CreditCard className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4">+12% from last month</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding Rent</p>
              <p className="text-2xl font-bold mt-1">KES 75,000</p>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-4">3 tenants with overdue rent</p>
        </Card>
      </div>

      {/* Properties List */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Your Properties</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/20">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Property</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Units</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Occupancy</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Collected</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Due</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b">
                  <td className="px-4 py-3">{property.name}</td>
                  <td className="px-4 py-3">{property.units} units</td>
                  <td className="px-4 py-3">{property.occupiedUnits}/{property.units} ({Math.round((property.occupiedUnits / property.units) * 100)}%)</td>
                  <td className="px-4 py-3">KES {property.rentCollected.toLocaleString()}</td>
                  <td className="px-4 py-3 text-red-600">KES {property.rentDue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 border-b pb-4">
              <div className={`p-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-100' : 
                activity.status === 'pending' ? 'bg-amber-100' : 'bg-red-100'
              }`}>
                {activity.status === 'success' ? 
                  <CreditCard className="text-green-600" size={16} /> : 
                  activity.status === 'pending' ? 
                  <Clock className="text-amber-600" size={16} /> :
                  <AlertTriangle className="text-red-600" size={16} />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.activity}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                  {activity.amount && (
                    <p className={`text-xs ${
                      activity.status === 'success' ? 'text-green-600' : 
                      activity.status === 'danger' ? 'text-red-600' : ''
                    }`}>KES {activity.amount.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full mt-2">View All Activity</Button>
        </div>
      </div>
    </div>
  );
};

export default LandlordOverview;
