import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Home, Users, Plus, ArrowRight, Check, X, UserPlus, Eye } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LandlordProperties = ({ onViewPropertyDetails }) => {
  const navigate = useNavigate();
  const [selectedTenant, setSelectedTenant] = React.useState(null);
  const [tenantDetailsOpen, setTenantDetailsOpen] = React.useState(false);
  
  const properties = [
    { id: 1, name: 'Riverside Apartments', units: 12, occupiedUnits: 10, vacantUnits: 2, rentCollected: 250000, rentDue: 50000, tenants: 18 },
    { id: 2, name: 'Green Gardens Estate', units: 8, occupiedUnits: 7, vacantUnits: 1, rentCollected: 175000, rentDue: 25000, tenants: 12 },
    { id: 3, name: 'Sunrise Towers', units: 15, occupiedUnits: 12, vacantUnits: 3, rentCollected: 320000, rentDue: 60000, tenants: 20 },
  ];

  const tenants = [
    { id: 1, name: 'John Doe', property: 'Riverside Apartments', unit: 'A1', status: 'active', leaseEnd: '2024-09-15', paymentStatus: 'paid', phone: '+254 712 345 678', email: 'john.doe@example.com', moveInDate: '2023-09-15' },
    { id: 2, name: 'Jane Smith', property: 'Green Gardens Estate', unit: 'B3', status: 'active', leaseEnd: '2024-06-10', paymentStatus: 'paid', phone: '+254 723 456 789', email: 'jane.smith@example.com', moveInDate: '2023-06-10' },
    { id: 3, name: 'Robert Johnson', property: 'Sunrise Towers', unit: 'C2', status: 'expiring', leaseEnd: '2024-05-20', paymentStatus: 'overdue', phone: '+254 734 567 890', email: 'robert.johnson@example.com', moveInDate: '2023-05-20' },
    { id: 4, name: 'Lisa Wong', property: 'Riverside Apartments', unit: 'A4', status: 'active', leaseEnd: '2025-01-15', paymentStatus: 'paid', phone: '+254 745 678 901', email: 'lisa.wong@example.com', moveInDate: '2023-01-15' },
    { id: 5, name: 'Michael Brown', property: 'Green Gardens Estate', unit: 'B1', status: 'active', leaseEnd: '2024-12-01', paymentStatus: 'pending', phone: '+254 756 789 012', email: 'michael.brown@example.com', moveInDate: '2022-12-01' },
  ];

  const handleAddProperty = () => {
    toast.info("Add property functionality will be implemented soon");
  };

  const handleViewDetails = (propertyId, propertyName) => {
    toast.info(`Viewing details for ${propertyName}`);
    if (onViewPropertyDetails) {
      onViewPropertyDetails(propertyName);
    }
  };

  const handleViewTenant = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      setSelectedTenant(tenant);
      setTenantDetailsOpen(true);
    }
  };

  const handleAddTenant = () => {
    toast.info("Add tenant functionality will be implemented soon");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleAddProperty}
        >
          <Plus size={16} className="mr-1" />
          Add New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold mt-1">{properties.length}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Building2 className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Manage all your real estate</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Units</p>
              <p className="text-2xl font-bold mt-1">{properties.reduce((sum, prop) => sum + prop.units, 0)}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <Home className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Across all properties</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Occupancy</p>
              <p className="text-2xl font-bold mt-1">
                {Math.round((properties.reduce((sum, prop) => sum + prop.occupiedUnits, 0) / 
                  properties.reduce((sum, prop) => sum + prop.units, 0)) * 100)}%
              </p>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <Users className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Current occupancy rate</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Property Occupancy</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Total Units</TableHead>
                <TableHead>Occupied</TableHead>
                <TableHead>Vacant</TableHead>
                <TableHead>Occupancy Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.units}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Check size={16} className="text-green-500 mr-1" /> {property.occupiedUnits}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <X size={16} className="text-red-500 mr-1" /> {property.vacantUnits}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${Math.round((property.occupiedUnits / property.units) * 100)}%` }}
                        ></div>
                      </div>
                      <span>{Math.round((property.occupiedUnits / property.units) * 100)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Tenants</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddTenant}
          >
            <UserPlus size={16} className="mr-1" />
            Add Tenant
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.property}</TableCell>
                  <TableCell>{tenant.unit}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      tenant.status === 'active' ? 'bg-green-100 text-green-800' :
                      tenant.status === 'expiring' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tenant.status === 'active' ? 'Active' : 
                       tenant.status === 'expiring' ? 'Expiring Soon' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      tenant.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      tenant.paymentStatus === 'pending' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tenant.paymentStatus === 'paid' ? 'Paid' : 
                       tenant.paymentStatus === 'pending' ? 'Pending' : 'Overdue'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewTenant(tenant.id)}
                    >
                      <Eye size={16} className="mr-1" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Properties</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Tenants</TableHead>
                <TableHead>Collected</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id} className="border-b">
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.units} units</TableCell>
                  <TableCell>{property.occupiedUnits}/{property.units} ({Math.round((property.occupiedUnits / property.units) * 100)}%)</TableCell>
                  <TableCell>{property.tenants} tenants</TableCell>
                  <TableCell>KES {property.rentCollected.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">KES {property.rentDue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(property.id, property.name)}
                    >
                      View Details <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={tenantDetailsOpen} onOpenChange={setTenantDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedTenant.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unit</p>
                  <p className="font-medium">{selectedTenant.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property</p>
                  <p className="font-medium">{selectedTenant.property}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      selectedTenant.status === 'active' ? 'bg-green-100 text-green-800' :
                      selectedTenant.status === 'expiring' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedTenant.status === 'active' ? 'Active' : 
                       selectedTenant.status === 'expiring' ? 'Expiring Soon' : 'Inactive'}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      selectedTenant.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      selectedTenant.paymentStatus === 'pending' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedTenant.paymentStatus === 'paid' ? 'Paid' : 
                       selectedTenant.paymentStatus === 'pending' ? 'Pending' : 'Overdue'}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Move In Date</p>
                  <p className="font-medium">{new Date(selectedTenant.moveInDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Ends</p>
                  <p className="font-medium">{new Date(selectedTenant.leaseEnd).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedTenant.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedTenant.email}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setTenantDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast.info(`Contacting ${selectedTenant.name}...`);
                    setTenantDetailsOpen(false);
                  }}
                >
                  Contact Tenant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordProperties;
