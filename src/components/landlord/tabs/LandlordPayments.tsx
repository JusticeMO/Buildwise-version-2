
import React from 'react';
import { Card } from '@/components/ui/card';
import { CreditCard, TrendingUp, ArrowUpRight, Calendar, AlertTriangle, Circle } from 'lucide-react';
import Button from '@/components/shared/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const LandlordPayments = () => {
  // Mock data for payments summary
  const paymentSummary = {
    totalCollected: 1450000,
    outstanding: 210000,
    overdue: 135000,
    collectionRate: 87,
  };

  // Mock data for monthly payments
  const monthlyPayments = [
    { month: 'Jan', collected: 950000, expected: 1100000 },
    { month: 'Feb', collected: 1050000, expected: 1100000 },
    { month: 'Mar', collected: 1080000, expected: 1100000 },
    { month: 'Apr', collected: 1100000, expected: 1100000 },
    { month: 'May', collected: 1100000, expected: 1100000 },
    { month: 'Jun', collected: 1090000, expected: 1100000 },
    { month: 'Jul', collected: 1250000, expected: 1300000 }, // Added more units
    { month: 'Aug', collected: 1280000, expected: 1300000 },
    { month: 'Sep', collected: 1300000, expected: 1300000 },
    { month: 'Oct', collected: 1350000, expected: 1450000 }, // Added more units
    { month: 'Nov', collected: 1300000, expected: 1450000 },
    { month: 'Dec', collected: 1450000, expected: 1450000 },
  ];

  // Mock data for payment status
  const paymentStatus = [
    { name: 'Paid', value: 38, color: '#4ade80' },
    { name: 'Pending', value: 7, color: '#facc15' },
    { name: 'Overdue', value: 5, color: '#f87171' },
  ];

  // Recent payments
  const recentPayments = [
    { id: 1, tenant: 'John Doe', unit: 'A1 - Riverside', amount: 35000, date: '2023-11-01', status: 'completed' },
    { id: 2, tenant: 'Jane Smith', unit: 'B3 - Green Gardens', amount: 28000, date: '2023-11-01', status: 'completed' },
    { id: 3, tenant: 'Robert Johnson', unit: 'C2 - Sunrise Towers', amount: 42000, date: '2023-10-30', status: 'completed' },
    { id: 4, tenant: 'Lisa Wong', unit: 'A4 - Riverside', amount: 35000, date: '2023-10-28', status: 'completed' },
    { id: 5, tenant: 'Michael Brown', unit: 'B1 - Green Gardens', amount: 28000, date: '2023-10-15', status: 'completed' },
  ];

  // Format number to KES
  const formatKES = (value) => {
    return `KES ${value.toLocaleString()}`;
  };

  // Calculate collection rate for each month
  const calculateCollectionRate = (collected, expected) => {
    return Math.round((collected / expected) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rent Collection</h2>
        <Button 
          variant="outline" 
          size="sm"
          icon={<Calendar size={16} />}
          iconPosition="left"
        >
          Payment Schedule
        </Button>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Collected</p>
              <p className="text-2xl font-bold mt-1">KES {paymentSummary.totalCollected.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <CreditCard className="text-green-600" size={20} />
            </div>
          </div>
          <div className="flex items-center text-xs text-green-600 mt-4">
            <TrendingUp size={14} className="mr-1" />
            <span>+8.2% from last month</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <p className="text-2xl font-bold mt-1">KES {paymentSummary.outstanding.toLocaleString()}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-md">
              <Calendar className="text-amber-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Due this month</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold mt-1">KES {paymentSummary.overdue.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-4">5 tenants with overdue rent</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-2xl font-bold mt-1">{paymentSummary.collectionRate}%</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <ArrowUpRight className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4">+2% from last month</p>
        </Card>
      </div>

      {/* Monthly Payment Trends Table (Replacing Chart) */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Monthly Payment Trends</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Collected</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Collection Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyPayments.map((payment) => (
                <TableRow key={payment.month}>
                  <TableCell className="font-medium">{payment.month}</TableCell>
                  <TableCell>{formatKES(payment.collected)}</TableCell>
                  <TableCell>{formatKES(payment.expected)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${calculateCollectionRate(payment.collected, payment.expected) >= 90 ? 'bg-green-500' : calculateCollectionRate(payment.collected, payment.expected) >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} 
                          style={{ width: `${calculateCollectionRate(payment.collected, payment.expected)}%` }}
                        ></div>
                      </div>
                      <span>{calculateCollectionRate(payment.collected, payment.expected)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Status (Replacing Chart) */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-semibold mb-6">Payment Status</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentStatus.map((status) => {
                const total = paymentStatus.reduce((sum, item) => sum + item.value, 0);
                const percentage = ((status.value / total) * 100).toFixed(1);
                
                return (
                  <TableRow key={status.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                        <span>{status.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{status.value}</TableCell>
                    <TableCell>{percentage}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {paymentStatus.map((status, index) => {
                  const total = paymentStatus.reduce((sum, item) => sum + item.value, 0);
                  const percentage = (status.value / total) * 100;
                  
                  // Calculate start and end angles for the pie segment
                  let startAngle = 0;
                  for (let i = 0; i < index; i++) {
                    startAngle += (paymentStatus[i].value / total) * 360;
                  }
                  const endAngle = startAngle + (percentage * 3.6);
                  
                  // Convert angles to radians and calculate path
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);
                  
                  const largeArc = percentage > 50 ? 1 : 0;
                  
                  // Create SVG path
                  const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
                  
                  return (
                    <path
                      key={status.name}
                      d={path}
                      fill={status.color}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
              <div className="absolute">
                <p className="text-xs text-center">Total Units</p>
                <p className="text-xl font-bold text-center">
                  {paymentStatus.reduce((sum, item) => sum + item.value, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-4">
            {paymentStatus.map((status) => (
              <div key={status.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: status.color }}></div>
                <span className="text-xs">{status.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Payments */}
        <Card className="p-6 col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/20">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium">Tenant</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Unit</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Amount</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-3 py-2 text-sm">{payment.tenant}</td>
                    <td className="px-3 py-2 text-sm">{payment.unit}</td>
                    <td className="px-3 py-2 text-sm">KES {payment.amount.toLocaleString()}</td>
                    <td className="px-3 py-2 text-sm">{payment.date}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Button variant="ghost" size="sm">View All Payments</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandlordPayments;
