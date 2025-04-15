
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Download, Filter, ChartPieIcon, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
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
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ComposedChart
} from 'recharts';
import { toast } from "sonner";

const LandlordReports = () => {
  const [reportPeriod, setReportPeriod] = useState('year');
  
  // Revenue data by month
  const revenueData = [
    { month: 'Jan', revenue: 1050000, expenses: 350000, profit: 700000 },
    { month: 'Feb', revenue: 1100000, expenses: 320000, profit: 780000 },
    { month: 'Mar', revenue: 1080000, expenses: 330000, profit: 750000 },
    { month: 'Apr', revenue: 1120000, expenses: 340000, profit: 780000 },
    { month: 'May', revenue: 1100000, expenses: 350000, profit: 750000 },
    { month: 'Jun', revenue: 1150000, expenses: 360000, profit: 790000 },
    { month: 'Jul', revenue: 1250000, expenses: 380000, profit: 870000 },
    { month: 'Aug', revenue: 1280000, expenses: 400000, profit: 880000 },
    { month: 'Sep', revenue: 1300000, expenses: 410000, profit: 890000 },
    { month: 'Oct', revenue: 1350000, expenses: 420000, profit: 930000 },
    { month: 'Nov', revenue: 1400000, expenses: 430000, profit: 970000 },
    { month: 'Dec', revenue: 1450000, expenses: 450000, profit: 1000000 },
  ];

  // Property performance data
  const propertyPerformanceData = [
    { name: 'Riverside Apartments', revenue: 750000, expenses: 220000, occupancy: 83 },
    { name: 'Green Gardens Estate', revenue: 420000, expenses: 150000, occupancy: 88 },
    { name: 'Sunrise Towers', revenue: 680000, expenses: 200000, occupancy: 80 },
  ];

  // Expenses breakdown
  const expensesData = [
    { name: 'Maintenance', value: 180000, color: '#3B82F6' },
    { name: 'Utilities', value: 95000, color: '#10B981' },
    { name: 'Insurance', value: 65000, color: '#F59E0B' },
    { name: 'Property Tax', value: 120000, color: '#8B5CF6' },
    { name: 'Management', value: 85000, color: '#EC4899' },
    { name: 'Other', value: 45000, color: '#6B7280' },
  ];

  // Occupancy trend
  const occupancyTrendData = [
    { month: 'Jan', occupancy: 78 },
    { month: 'Feb', occupancy: 80 },
    { month: 'Mar', occupancy: 82 },
    { month: 'Apr', occupancy: 81 },
    { month: 'May', occupancy: 84 },
    { month: 'Jun', occupancy: 83 },
    { month: 'Jul', occupancy: 85 },
    { month: 'Aug', occupancy: 87 },
    { month: 'Sep', occupancy: 85 },
    { month: 'Oct', occupancy: 84 },
    { month: 'Nov', occupancy: 85 },
    { month: 'Dec', occupancy: 86 },
  ];

  // Calculate total values
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0);

  // Chart configuration
  const areaChartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8B5CF6"
    },
    expenses: {
      label: "Expenses",
      color: "#F87171"
    },
    profit: {
      label: "Profit",
      color: "#10B981"
    }
  };

  // Format number to KES
  const formatKES = (value) => {
    if (value >= 1000000) {
      return `KES ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `KES ${(value / 1000).toFixed(1)}K`;
    }
    return `KES ${value}`;
  };

  // Handle button clicks
  const handleExport = () => {
    toast.success("Report exported successfully");
  };

  const handleFilter = () => {
    toast.info("Filter options opened");
  };

  const handlePeriodChange = (period) => {
    setReportPeriod(period);
    toast.info(`Report period changed to ${period}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <div className="flex items-center gap-2">
          <div className="border rounded-md overflow-hidden flex">
            <button 
              className={`px-4 py-1.5 text-sm ${reportPeriod === 'month' ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => handlePeriodChange('month')}
            >
              Month
            </button>
            <button 
              className={`px-4 py-1.5 text-sm ${reportPeriod === 'quarter' ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => handlePeriodChange('quarter')}
            >
              Quarter
            </button>
            <button 
              className={`px-4 py-1.5 text-sm ${reportPeriod === 'year' ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => handlePeriodChange('year')}
            >
              Year
            </button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExport}
          >
            <Download size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">KES {(totalRevenue / 1000000).toFixed(2)}M</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
            <span>+8.2% from previous {reportPeriod}</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold mt-1">KES {(totalExpenses / 1000000).toFixed(2)}M</p>
          <div className="flex items-center text-xs text-amber-600 mt-2">
            <span>+5.4% from previous {reportPeriod}</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Net Profit</p>
          <p className="text-2xl font-bold mt-1">KES {(totalProfit / 1000000).toFixed(2)}M</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
            <span>+10.1% from previous {reportPeriod}</span>
          </div>
        </Card>
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Revenue vs Expenses</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleFilter}>
              <Filter size={14} className="mr-1" /> 
              Filter
            </Button>
          </div>
        </div>
        <div className="h-64">
          <ChartContainer config={areaChartConfig}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, undefined]} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                fill="#8B5CF6" 
                stroke="#8B5CF6"
                fillOpacity={0.2}
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                fill="#F87171" 
                stroke="#F87171"
                fillOpacity={0.2}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            </ComposedChart>
          </ChartContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Property Performance</h3>
          <div className="h-56">
            <ChartContainer config={{}}>
              <BarChart data={propertyPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, undefined]} />
                <Legend />
                <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" />
                <Bar dataKey="expenses" fill="#F87171" name="Expenses" />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Expenses Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expenses Breakdown</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="name" width={90} />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, undefined]} />
                <Bar dataKey="value" name="Amount">
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
            {expensesData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Occupancy Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Occupancy Trend</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={occupancyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
              <Area 
                type="monotone" 
                dataKey="occupancy" 
                stroke="#3B82F6" 
                fill="#93C5FD" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default LandlordReports;
