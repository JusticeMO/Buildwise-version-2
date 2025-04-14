
import React from 'react';
import { Card } from '@/components/ui/card';
import { CreditCard, TrendingUp, ArrowUpRight, Calendar, AlertTriangle } from 'lucide-react';
import Button from '@/components/shared/Button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

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

  // Chart configuration
  const lineChartConfig = {
    collected: {
      label: "Collected",
      color: "#8B5CF6"
    },
    expected: {
      label: "Expected",
      color: "#94A3B8"
    }
  };

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

      {/* Monthly Payment Trends */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Monthly Payment Trends</h3>
        <div className="h-80">
          <ChartContainer config={lineChartConfig}>
            <LineChart data={monthlyPayments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, undefined]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="collected" 
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="expected" 
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Status Chart */}
        <Card className="p-6 col-span-1">
          <h3 className="text-lg font-semibold mb-6">Payment Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} tenants`, name]} />
              </PieChart>
            </ResponsiveContainer>
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
