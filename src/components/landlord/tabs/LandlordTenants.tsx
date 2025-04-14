
import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, UserPlus, Calendar, Phone, Mail, Search } from 'lucide-react';
import Button from '@/components/shared/Button';
import {
  ChartContainer,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const LandlordTenants = () => {
  // Mock data for tenant summary
  const tenantSummary = {
    totalTenants: 50,
    newTenants: 3,
    averageTenancy: 14, // months
    occupancyRate: 85,
  };

  // Mock data for tenant demographics
  const tenantDemographics = [
    { name: 'Families', value: 22, color: '#8B5CF6' },
    { name: 'Singles', value: 15, color: '#3B82F6' },
    { name: 'Couples', value: 8, color: '#10B981' },
    { name: 'Students', value: 5, color: '#F59E0B' },
  ];
  
  // Mock data for lease expiry
  const leaseExpiryData = [
    { name: '0-1 Month', tenants: 4, color: '#F87171' },
    { name: '1-3 Months', tenants: 7, color: '#FBBF24' },
    { name: '3-6 Months', tenants: 12, color: '#34D399' },
    { name: '6-12 Months', tenants: 18, color: '#60A5FA' },
    { name: '>12 Months', tenants: 9, color: '#A78BFA' },
  ];

  // Mock data for tenants list
  const tenants = [
    { id: 1, name: 'John Doe', unit: 'A1 - Riverside', phone: '0712345678', email: 'john@example.com', moveInDate: '2022-03-15', leaseEnd: '2023-12-15', status: 'active' },
    { id: 2, name: 'Jane Smith', unit: 'B3 - Green Gardens', phone: '0723456789', email: 'jane@example.com', moveInDate: '2021-08-10', leaseEnd: '2024-02-10', status: 'active' },
    { id: 3, name: 'Robert Johnson', unit: 'C2 - Sunrise Towers', phone: '0734567890', email: 'robert@example.com', moveInDate: '2022-11-01', leaseEnd: '2023-11-01', status: 'expiring' },
    { id: 4, name: 'Lisa Wong', unit: 'A4 - Riverside', phone: '0745678901', email: 'lisa@example.com', moveInDate: '2023-01-15', leaseEnd: '2024-01-15', status: 'active' },
    { id: 5, name: 'Michael Brown', unit: 'B1 - Green Gardens', phone: '0756789012', email: 'michael@example.com', moveInDate: '2023-05-01', leaseEnd: '2024-05-01', status: 'active' },
    { id: 6, name: 'Sarah Kimani', unit: 'A2 - Riverside', phone: '0767890123', email: 'sarah@example.com', moveInDate: '2023-08-01', leaseEnd: '2024-08-01', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tenants</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search tenants..." 
              className="pl-9 pr-4 py-2 rounded-md border border-input bg-transparent text-sm"
            />
          </div>
          <Button 
            variant="default" 
            size="sm"
            icon={<UserPlus size={16} />}
            iconPosition="left"
          >
            Add Tenant
          </Button>
        </div>
      </div>

      {/* Tenant Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tenants</p>
              <p className="text-2xl font-bold mt-1">{tenantSummary.totalTenants}</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-md">
              <Users className="text-indigo-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Across all properties</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Tenants</p>
              <p className="text-2xl font-bold mt-1">{tenantSummary.newTenants}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <UserPlus className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Last 30 days</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Tenancy</p>
              <p className="text-2xl font-bold mt-1">{tenantSummary.averageTenancy} months</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Calendar className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Tenant retention</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <p className="text-2xl font-bold mt-1">{tenantSummary.occupancyRate}%</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <Home className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4">+5% from last quarter</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tenant Demographics Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Tenant Demographics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tenantDemographics}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tenantDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tenants`, undefined]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {tenantDemographics.map((demographic) => (
              <div key={demographic.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: demographic.color }}></div>
                <span className="text-xs">{demographic.name}: {demographic.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Lease Expiry Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Lease Expiry Timeline</h3>
          <div className="h-64">
            <ChartContainer config={{}}>
              <BarChart data={leaseExpiryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tenants">
                  {leaseExpiryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </div>

      {/* Tenants List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tenant List</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/20">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Unit</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Contact</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Move-In Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Lease End</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{tenant.name}</td>
                  <td className="px-4 py-3">{tenant.unit}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm">{tenant.phone}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Mail size={14} className="mr-1 text-muted-foreground" />
                        <span className="text-sm">{tenant.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{tenant.moveInDate}</td>
                  <td className="px-4 py-3">{tenant.leaseEnd}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                      tenant.status === 'expiring' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tenant.status === 'active' ? 'Active' : 
                       tenant.status === 'expiring' ? 'Expiring Soon' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm">View Profile</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Fix missing Home icon import
import { Home } from 'lucide-react';

export default LandlordTenants;
