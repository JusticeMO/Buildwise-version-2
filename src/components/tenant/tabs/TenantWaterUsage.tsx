
import React from 'react';
import { Badge } from '@/components/ui/badge';

const TenantWaterUsage = () => {
  const waterData = [
    { month: 'January', units: 5, amount: 1000 },
    { month: 'February', units: 5.5, amount: 1100 },
    { month: 'March', units: 4.8, amount: 960 },
    { month: 'April', units: 5.2, amount: 1040 },
    { month: 'May', units: 5.8, amount: 1160 },
    { month: 'June', units: 6, amount: 1200 }
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Water Usage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Month Usage</p>
          <p className="text-2xl font-bold">6 Units</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>June 2023</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Bill Amount</p>
          <p className="text-2xl font-bold">KES 1,200</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Due with July Rent</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Average Monthly Usage</p>
          <p className="text-2xl font-bold">5.4 Units</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Last 6 Months</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="font-medium mb-4">Monthly Water Consumption</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {waterData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-400 rounded-t-sm"
                style={{ height: `${(data.units / 6) * 180}px` }}
              ></div>
              <p className="text-xs font-medium mt-2">{data.month}</p>
              <p className="text-xs text-muted-foreground">{data.units} units</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-medium mb-4">Water Usage History</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium">Month</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Units Used</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Amount (KES)</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {waterData.map((data, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm">{data.month} 2023</td>
                  <td className="py-3 px-4 text-sm">{data.units}</td>
                  <td className="py-3 px-4 text-sm">{data.amount}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Paid
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantWaterUsage;
