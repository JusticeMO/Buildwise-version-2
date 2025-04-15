
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Building2, Users, MessageCircle, AlertCircle, CreditCard, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

// Define property data types
interface Tenant {
  id: number;
  name: string;
  unit: string;
  phone: string;
  email: string;
  moveInDate: string;
  leaseEnd: string;
  rentStatus: 'paid' | 'pending' | 'overdue';
  complaints: number;
  lastPaymentAmount: number;
  lastPaymentDate: string;
}

interface Property {
  id: number;
  name: string;
  address: string;
  units: number;
  occupiedUnits: number;
  vacantUnits: number;
  rentCollected: number;
  rentDue: number;
  tenants: Tenant[];
}

const PropertyDetails = () => {
  const [activeProperty, setActiveProperty] = useState<number>(1);
  
  // Sample properties data
  const properties: Property[] = [
    {
      id: 1, 
      name: 'Riverside Apartments',
      address: '123 River Road, Nairobi',
      units: 12, 
      occupiedUnits: 10, 
      vacantUnits: 2, 
      rentCollected: 250000, 
      rentDue: 50000,
      tenants: [
        { id: 1, name: 'John Doe', unit: 'A1', phone: '0712345678', email: 'john@example.com', moveInDate: '2023-01-15', leaseEnd: '2024-01-15', rentStatus: 'paid', complaints: 0, lastPaymentAmount: 25000, lastPaymentDate: '2023-12-05' },
        { id: 2, name: 'Jane Smith', unit: 'A2', phone: '0723456789', email: 'jane@example.com', moveInDate: '2022-08-10', leaseEnd: '2023-12-31', rentStatus: 'pending', complaints: 1, lastPaymentAmount: 25000, lastPaymentDate: '2023-11-30' },
        { id: 3, name: 'Robert Johnson', unit: 'B1', phone: '0734567890', email: 'robert@example.com', moveInDate: '2022-11-01', leaseEnd: '2023-12-31', rentStatus: 'overdue', complaints: 2, lastPaymentAmount: 22000, lastPaymentDate: '2023-10-18' },
        { id: 4, name: 'Lisa Wong', unit: 'B2', phone: '0745678901', email: 'lisa@example.com', moveInDate: '2023-05-01', leaseEnd: '2024-05-01', rentStatus: 'paid', complaints: 0, lastPaymentAmount: 25000, lastPaymentDate: '2023-12-01' },
      ]
    },
    {
      id: 2,
      name: 'Green Gardens Estate',
      address: '456 Garden Lane, Nairobi',
      units: 8,
      occupiedUnits: 7,
      vacantUnits: 1,
      rentCollected: 175000,
      rentDue: 25000,
      tenants: [
        { id: 5, name: 'Michael Brown', unit: 'G1', phone: '0756789012', email: 'michael@example.com', moveInDate: '2023-03-15', leaseEnd: '2024-03-15', rentStatus: 'paid', complaints: 0, lastPaymentAmount: 30000, lastPaymentDate: '2023-12-02' },
        { id: 6, name: 'Sarah Kimani', unit: 'G2', phone: '0767890123', email: 'sarah@example.com', moveInDate: '2023-02-01', leaseEnd: '2024-02-01', rentStatus: 'paid', complaints: 1, lastPaymentAmount: 30000, lastPaymentDate: '2023-12-03' },
        { id: 7, name: 'David Ochieng', unit: 'G3', phone: '0778901234', email: 'david@example.com', moveInDate: '2022-12-15', leaseEnd: '2023-12-15', rentStatus: 'pending', complaints: 0, lastPaymentAmount: 30000, lastPaymentDate: '2023-11-28' },
      ]
    },
    {
      id: 3,
      name: 'Sunrise Towers',
      address: '789 Sunrise Avenue, Nairobi',
      units: 15,
      occupiedUnits: 12,
      vacantUnits: 3,
      rentCollected: 320000,
      rentDue: 60000,
      tenants: [
        { id: 8, name: 'James Mwangi', unit: 'S1', phone: '0789012345', email: 'james@example.com', moveInDate: '2023-06-01', leaseEnd: '2024-06-01', rentStatus: 'paid', complaints: 0, lastPaymentAmount: 28000, lastPaymentDate: '2023-12-01' },
        { id: 9, name: 'Mary Wanjiku', unit: 'S2', phone: '0790123456', email: 'mary@example.com', moveInDate: '2023-01-15', leaseEnd: '2024-01-15', rentStatus: 'overdue', complaints: 3, lastPaymentAmount: 28000, lastPaymentDate: '2023-10-20' },
        { id: 10, name: 'Peter Njoroge', unit: 'S3', phone: '0701234567', email: 'peter@example.com', moveInDate: '2023-04-01', leaseEnd: '2024-04-01', rentStatus: 'paid', complaints: 1, lastPaymentAmount: 28000, lastPaymentDate: '2023-12-05' },
        { id: 11, name: 'Agnes Wairimu', unit: 'S4', phone: '0712345678', email: 'agnes@example.com', moveInDate: '2022-09-15', leaseEnd: '2023-12-15', rentStatus: 'pending', complaints: 0, lastPaymentAmount: 28000, lastPaymentDate: '2023-11-28' },
        { id: 12, name: 'Stephen Kamau', unit: 'S5', phone: '0723456789', email: 'stephen@example.com', moveInDate: '2023-07-01', leaseEnd: '2024-07-01', rentStatus: 'paid', complaints: 0, lastPaymentAmount: 28000, lastPaymentDate: '2023-12-03' },
      ]
    }
  ];

  const handleViewTenantDetails = (tenantId: number) => {
    toast.info(`Viewing details for tenant ID: ${tenantId}`);
  };

  const handleContactTenant = (tenantId: number) => {
    toast.info(`Contacting tenant ID: ${tenantId}`);
  };

  const handleViewComplaints = (tenantId: number) => {
    toast.info(`Viewing complaints for tenant ID: ${tenantId}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Property & Tenant Details</h2>
      
      <Tabs defaultValue={properties[0].id.toString()} onValueChange={(val) => setActiveProperty(parseInt(val))}>
        <TabsList className="mb-4 bg-white">
          {properties.map(property => (
            <TabsTrigger key={property.id} value={property.id.toString()} className="px-4 py-2">
              {property.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {properties.map(property => (
          <TabsContent key={property.id} value={property.id.toString()} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-md font-medium mt-1">{property.address}</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-md">
                    <Building2 className="text-purple-600" size={20} />
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Units</p>
                    <p className="text-2xl font-bold mt-1">{property.units}</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs">{property.occupiedUnits}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                      <span className="text-xs">{property.vacantUnits}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {Math.round((property.occupiedUnits / property.units) * 100)}% occupancy rate
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rent Collected</p>
                    <p className="text-2xl font-bold mt-1">KES {property.rentCollected.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-md">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-4">Current month</p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rent Due</p>
                    <p className="text-2xl font-bold mt-1">KES {property.rentDue.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-100 p-2 rounded-md">
                    <XCircle className="text-red-600" size={20} />
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-4">Outstanding balance</p>
              </Card>
            </div>
            
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Tenant List ({property.tenants.length})</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Overdue</span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Lease Period</TableHead>
                      <TableHead>Rent Status</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Complaints</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {property.tenants.map(tenant => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">{tenant.unit}</TableCell>
                        <TableCell>{tenant.name}</TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center text-xs">
                              <span className="mr-2">📱</span> {tenant.phone}
                            </div>
                            <div className="flex items-center text-xs mt-1">
                              <span className="mr-2">📧</span> {tenant.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>From: {tenant.moveInDate}</div>
                            <div>To: {tenant.leaseEnd}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              tenant.rentStatus === 'paid' ? 'bg-green-500' :
                              tenant.rentStatus === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                            }`}></div>
                            <span className="capitalize">{tenant.rentStatus}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>KES {tenant.lastPaymentAmount.toLocaleString()}</div>
                            <div className="text-muted-foreground">{tenant.lastPaymentDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {tenant.complaints > 0 ? (
                              <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {tenant.complaints}
                              </div>
                            ) : (
                              <span className="text-green-600 text-xs">None</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-2 text-xs"
                              onClick={() => handleViewTenantDetails(tenant.id)}
                            >
                              Details
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8" 
                              onClick={() => handleContactTenant(tenant.id)}
                            >
                              <MessageCircle size={15} />
                            </Button>
                            {tenant.complaints > 0 && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600"
                                onClick={() => handleViewComplaints(tenant.id)}
                              >
                                <AlertCircle size={15} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
