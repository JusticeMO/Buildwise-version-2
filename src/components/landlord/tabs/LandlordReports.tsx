import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Download, Filter, ArrowRight } from 'lucide-react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const LandlordReports = () => {
  const navigate = useNavigate();
  const [reportPeriod, setReportPeriod] = useState('year');
  
  // Revenue data by period with more realistic figures
  const monthlyRevenueData = [
    { month: 'Week 1', revenue: 85000, expenses: 32000, profit: 53000 },
    { month: 'Week 2', revenue: 82000, expenses: 30000, profit: 52000 },
    { month: 'Week 3', revenue: 87000, expenses: 33500, profit: 53500 },
    { month: 'Week 4', revenue: 84000, expenses: 31000, profit: 53000 },
  ];

  const quarterlyRevenueData = [
    { month: 'Jan', revenue: 245000, expenses: 92000, profit: 153000 },
    { month: 'Feb', revenue: 260000, expenses: 95000, profit: 165000 },
    { month: 'Mar', revenue: 252000, expenses: 94000, profit: 158000 },
  ];
  
  // Full year revenue data with more realistic figures
  const yearlyRevenueData = [
    { month: 'Jan', revenue: 245000, expenses: 92000, profit: 153000 },
    { month: 'Feb', revenue: 260000, expenses: 95000, profit: 165000 },
    { month: 'Mar', revenue: 252000, expenses: 94000, profit: 158000 },
    { month: 'Apr', revenue: 258000, expenses: 96000, profit: 162000 },
    { month: 'May', revenue: 255000, expenses: 94500, profit: 160500 },
    { month: 'Jun', revenue: 262000, expenses: 97000, profit: 165000 },
    { month: 'Jul', revenue: 275000, expenses: 100000, profit: 175000 },
    { month: 'Aug', revenue: 280000, expenses: 102000, profit: 178000 },
    { month: 'Sep', revenue: 285000, expenses: 103000, profit: 182000 },
    { month: 'Oct', revenue: 290000, expenses: 105000, profit: 185000 },
    { month: 'Nov', revenue: 295000, expenses: 106000, profit: 189000 },
    { month: 'Dec', revenue: 305000, expenses: 110000, profit: 195000 },
  ];

  // Get the appropriate revenue data based on the selected period
  const getRevenueData = () => {
    switch(reportPeriod) {
      case 'month':
        return monthlyRevenueData;
      case 'quarter':
        return quarterlyRevenueData;
      default:
        return yearlyRevenueData;
    }
  };
  
  const revenueData = getRevenueData();

  // Property performance data with realistic figures
  const propertyPerformanceData = [
    { name: 'Riverside Apartments', revenue: 120000, expenses: 45000, occupancy: 83, units: 12 },
    { name: 'Green Gardens Estate', revenue: 95000, expenses: 35000, occupancy: 88, units: 8 },
    { name: 'Sunrise Towers', revenue: 142000, expenses: 52000, occupancy: 80, units: 15 },
  ];

  // Expenses breakdown with realistic figures
  const expensesData = [
    { name: 'Maintenance', value: 42000, color: '#3B82F6' },
    { name: 'Utilities', value: 23000, color: '#10B981' },
    { name: 'Insurance', value: 18000, color: '#F59E0B' },
    { name: 'Property Tax', value: 35000, color: '#8B5CF6' },
    { name: 'Management', value: 21000, color: '#EC4899' },
    { name: 'Other', value: 12000, color: '#6B7280' },
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

  // Calculate total values based on the selected period
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = revenueData.reduce((sum, item) => sum + item.profit, 0);

  // Calculate percentage change from previous period
  const getChangePercentage = () => {
    switch(reportPeriod) {
      case 'month':
        return { revenue: 3.2, expenses: 2.4, profit: 4.1 };
      case 'quarter':
        return { revenue: 5.8, expenses: 3.6, profit: 7.5 };
      default:
        return { revenue: 8.2, expenses: 5.4, profit: 10.1 };
    }
  };
  
  const changePercentage = getChangePercentage();

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

  const expensesChartConfig = {
    value: {
      label: "Amount",
      color: "#8B5CF6"
    }
  };

  const occupancyChartConfig = {
    occupancy: {
      label: "Occupancy Rate",
      color: "#3B82F6"
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

  const handleViewPropertyDetails = (propertyName) => {
    toast.info(`Viewing details for ${propertyName}`);
    navigate('/landlord/dashboard', { state: { activeTab: 'property-details', property: propertyName } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
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
          <p className="text-2xl font-bold mt-1">{formatKES(totalRevenue)}</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
            <span>+{changePercentage.revenue}% from previous {reportPeriod}</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Expenses</p>
          <p className="text-2xl font-bold mt-1">{formatKES(totalExpenses)}</p>
          <div className="flex items-center text-xs text-amber-600 mt-2">
            <span>+{changePercentage.expenses}% from previous {reportPeriod}</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Net Profit</p>
          <p className="text-2xl font-bold mt-1">{formatKES(totalProfit)}</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
            <span>+{changePercentage.profit}% from previous {reportPeriod}</span>
          </div>
        </Card>
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Revenue vs Expenses</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleFilter}>
              <Filter size={14} className="mr-1" /> 
              Filter
            </Button>
          </div>
        </div>
        <div className="h-[240px] w-full">
          <ChartContainer config={areaChartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} 
                  domain={[0, 'dataMax + 50000']} 
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="top" height={36} />
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
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>

      {/* Property Performance and Expenses side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Property Performance</h3>
          <div className="h-[280px]">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" width={140} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#F87171" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyPerformanceData.map((property) => (
                  <TableRow key={property.name}>
                    <TableCell className="font-medium">{property.name}</TableCell>
                    <TableCell>{property.units}</TableCell>
                    <TableCell>{property.occupancy}%</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewPropertyDetails(property.name)}
                      >
                        Details <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Expenses Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expenses Breakdown</h3>
          <div className="h-[280px]">
            <ChartContainer config={expensesChartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" name="Amount">
                    {expensesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 border-t pt-4">
            {expensesData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}: {formatKES(item.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Occupancy Trend */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Occupancy Trend</h3>
        <div className="h-[240px]">
          <ChartContainer config={occupancyChartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#3B82F6" 
                  fill="#93C5FD" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
};

export default LandlordReports;
