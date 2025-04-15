
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Building2, Users, MessageSquare, AlertTriangle, CheckCircle, Clock, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';
import { toast } from "sonner";

const PropertyDetails = () => {
  const location = useLocation();
  const [selectedProperty, setSelectedProperty] = useState('Riverside Apartments');
  
  // If a property was passed via navigation state, use it
  React.useEffect(() => {
    if (location.state?.property) {
      setSelectedProperty(location.state.property);
    }
  }, [location.state]);

  // Mock data for properties
  const properties = [
    { 
      id: 1, 
      name: 'Riverside Apartments', 
      address: '123 River Lane, Nairobi', 
      units: 12, 
      occupiedUnits: 10, 
      vacantUnits: 2, 
      rentCollected: 250000, 
      rentDue: 50000,
      maintenanceRequests: 3,
      complaints: 2,
      manager: 'John Mwangi',
      yearBuilt: 2018,
      description: 'Modern apartment complex with river views, featuring spacious units with balconies and modern amenities.'
    },
    { 
      id: 2, 
      name: 'Green Gardens Estate', 
      address: '45 Forest Road, Nairobi', 
      units: 8, 
      occupiedUnits: 7, 
      vacantUnits: 1, 
      rentCollected: 175000, 
      rentDue: 25000,
      maintenanceRequests: 1,
      complaints: 0,
      manager: 'Sarah Kamau',
      yearBuilt: 2020,
      description: 'Eco-friendly townhouse development with private gardens, solar power, and high-efficiency appliances.'
    },
    { 
      id: 3, 
      name: 'Sunrise Towers', 
      address: '78 Eastlands Way, Nairobi', 
      units: 15, 
      occupiedUnits: 12, 
      vacantUnits: 3, 
      rentCollected: 320000, 
      rentDue: 60000,
      maintenanceRequests: 5,
      complaints: 3,
      manager: 'David Ochieng',
      yearBuilt: 2015,
      description: 'High-rise apartment building with panoramic city views, featuring a rooftop garden and modern security system.'
    },
  ];

  // Mock data for tenants
  const tenantsByProperty = {
    'Riverside Apartments': [
      { id: 1, name: 'Mary Njeri', unit: '1A', rentStatus: 'paid', moveInDate: '2022-03-15', rentAmount: 25000, complaints: 0, contact: '+254 712 345 678', email: 'mary.n@example.com' },
      { id: 2, name: 'James Kimani', unit: '1B', rentStatus: 'paid', moveInDate: '2021-07-22', rentAmount: 25000, complaints: 1, contact: '+254 723 456 789', email: 'james.k@example.com' },
      { id: 3, name: 'Alice Wanjiku', unit: '2A', rentStatus: 'late', moveInDate: '2022-01-05', rentAmount: 28000, complaints: 0, contact: '+254 734 567 890', email: 'alice.w@example.com' },
      { id: 4, name: 'Robert Mutua', unit: '2B', rentStatus: 'paid', moveInDate: '2023-04-10', rentAmount: 28000, complaints: 0, contact: '+254 745 678 901', email: 'robert.m@example.com' },
      { id: 5, name: 'Jane Adhiambo', unit: '3A', rentStatus: 'pending', moveInDate: '2022-11-17', rentAmount: 25000, complaints: 1, contact: '+254 756 789 012', email: 'jane.a@example.com' },
      { id: 6, name: 'Michael Otieno', unit: '3B', rentStatus: 'paid', moveInDate: '2022-09-30', rentAmount: 25000, complaints: 0, contact: '+254 767 890 123', email: 'michael.o@example.com' },
      { id: 7, name: 'Grace Muthoni', unit: '4A', rentStatus: 'paid', moveInDate: '2023-02-14', rentAmount: 30000, complaints: 0, contact: '+254 778 901 234', email: 'grace.m@example.com' },
      { id: 8, name: 'Daniel Kipchoge', unit: '4B', rentStatus: 'overdue', moveInDate: '2022-05-25', rentAmount: 30000, complaints: 2, contact: '+254 789 012 345', email: 'daniel.k@example.com' },
      { id: 9, name: 'Faith Wangari', unit: '5A', rentStatus: 'paid', moveInDate: '2023-01-08', rentAmount: 25000, complaints: 0, contact: '+254 790 123 456', email: 'faith.w@example.com' },
      { id: 10, name: 'Peter Omondi', unit: '5B', rentStatus: 'paid', moveInDate: '2021-12-03', rentAmount: 25000, complaints: 1, contact: '+254 701 234 567', email: 'peter.o@example.com' }
    ],
    'Green Gardens Estate': [
      { id: 11, name: 'Elizabeth Maina', unit: 'Unit 1', rentStatus: 'paid', moveInDate: '2022-02-10', rentAmount: 35000, complaints: 0, contact: '+254 712 987 654', email: 'elizabeth.m@example.com' },
      { id: 12, name: 'Samuel Ndung\'u', unit: 'Unit 2', rentStatus: 'paid', moveInDate: '2022-08-15', rentAmount: 35000, complaints: 0, contact: '+254 723 876 543', email: 'samuel.n@example.com' },
      { id: 13, name: 'Christine Wairimu', unit: 'Unit 3', rentStatus: 'overdue', moveInDate: '2021-11-20', rentAmount: 35000, complaints: 1, contact: '+254 734 765 432', email: 'christine.w@example.com' },
      { id: 14, name: 'Brian Ochieng', unit: 'Unit 4', rentStatus: 'paid', moveInDate: '2023-03-05', rentAmount: 35000, complaints: 0, contact: '+254 745 654 321', email: 'brian.o@example.com' },
      { id: 15, name: 'Florence Akinyi', unit: 'Unit 5', rentStatus: 'paid', moveInDate: '2022-07-12', rentAmount: 32000, complaints: 0, contact: '+254 756 543 210', email: 'florence.a@example.com' },
      { id: 16, name: 'George Kamau', unit: 'Unit 6', rentStatus: 'late', moveInDate: '2022-10-08', rentAmount: 32000, complaints: 1, contact: '+254 767 432 109', email: 'george.k@example.com' },
      { id: 17, name: 'Nancy Wambui', unit: 'Unit 7', rentStatus: 'paid', moveInDate: '2023-01-15', rentAmount: 32000, complaints: 0, contact: '+254 778 321 098', email: 'nancy.w@example.com' }
    ],
    'Sunrise Towers': [
      { id: 18, name: 'Paul Njoroge', unit: 'Apt 101', rentStatus: 'paid', moveInDate: '2022-04-18', rentAmount: 28000, complaints: 0, contact: '+254 789 210 987', email: 'paul.n@example.com' },
      { id: 19, name: 'Monica Wanjiru', unit: 'Apt 102', rentStatus: 'paid', moveInDate: '2022-06-22', rentAmount: 28000, complaints: 1, contact: '+254 790 109 876', email: 'monica.w@example.com' },
      { id: 20, name: 'Richard Kipkoech', unit: 'Apt 103', rentStatus: 'overdue', moveInDate: '2021-09-14', rentAmount: 28000, complaints: 2, contact: '+254 701 098 765', email: 'richard.k@example.com' },
      { id: 21, name: 'Esther Moraa', unit: 'Apt 201', rentStatus: 'paid', moveInDate: '2022-12-05', rentAmount: 30000, complaints: 0, contact: '+254 712 987 654', email: 'esther.m@example.com' },
      { id: 22, name: 'Joseph Onyango', unit: 'Apt 202', rentStatus: 'late', moveInDate: '2023-02-20', rentAmount: 30000, complaints: 1, contact: '+254 723 876 543', email: 'joseph.o@example.com' },
      { id: 23, name: 'Catherine Nyambura', unit: 'Apt 203', rentStatus: 'paid', moveInDate: '2022-08-10', rentAmount: 30000, complaints: 0, contact: '+254 734 765 432', email: 'catherine.n@example.com' },
      { id: 24, name: 'Victor Kibet', unit: 'Apt 301', rentStatus: 'paid', moveInDate: '2022-11-12', rentAmount: 32000, complaints: 0, contact: '+254 745 654 321', email: 'victor.k@example.com' },
      { id: 25, name: 'Rebecca Atieno', unit: 'Apt 302', rentStatus: 'paid', moveInDate: '2023-01-25', rentAmount: 32000, complaints: 0, contact: '+254 756 543 210', email: 'rebecca.a@example.com' },
      { id: 26, name: 'Stephen Muriithi', unit: 'Apt 303', rentStatus: 'pending', moveInDate: '2022-07-30', rentAmount: 32000, complaints: 1, contact: '+254 767 432 109', email: 'stephen.m@example.com' },
      { id: 27, name: 'Sandra Chebet', unit: 'Apt 401', rentStatus: 'paid', moveInDate: '2022-10-15', rentAmount: 35000, complaints: 0, contact: '+254 778 321 098', email: 'sandra.c@example.com' },
      { id: 28, name: 'Kevin Mwangi', unit: 'Apt 402', rentStatus: 'overdue', moveInDate: '2021-12-18', rentAmount: 35000, complaints: 3, contact: '+254 789 210 987', email: 'kevin.m@example.com' },
      { id: 29, name: 'Linda Akoth', unit: 'Apt 403', rentStatus: 'paid', moveInDate: '2022-05-22', rentAmount: 35000, complaints: 0, contact: '+254 790 109 876', email: 'linda.a@example.com' }
    ]
  };

  // Find the selected property
  const selectedPropertyData = properties.find(p => p.name === selectedProperty);
  const tenants = tenantsByProperty[selectedProperty] || [];

  // Get counts for different statuses
  const paidCount = tenants.filter(t => t.rentStatus === 'paid').length;
  const pendingCount = tenants.filter(t => t.rentStatus === 'pending').length;
  const lateCount = tenants.filter(t => t.rentStatus === 'late').length;
  const overdueCount = tenants.filter(t => t.rentStatus === 'overdue').length;

  const handlePropertySelect = (propertyName) => {
    setSelectedProperty(propertyName);
  };

  const handleContactTenant = (tenant) => {
    toast.info(`Contacting ${tenant.name}...`);
  };

  const handleViewComplaints = (tenant) => {
    if (tenant.complaints > 0) {
      toast.info(`Viewing ${tenant.complaints} complaint(s) from ${tenant.name}`);
    } else {
      toast.info(`No complaints from ${tenant.name}`);
    }
  };

  const getRentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pending</Badge>;
      case 'late':
        return <Badge className="bg-amber-600">Late</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Property Details</h2>
      
      {/* Property Selection Tabs */}
      <Tabs defaultValue={selectedProperty} onValueChange={handlePropertySelect} value={selectedProperty}>
        <TabsList className="bg-muted/50 w-full flex overflow-x-auto">
          {properties.map(property => (
            <TabsTrigger 
              key={property.id} 
              value={property.name}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {property.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {properties.map(property => (
          <TabsContent key={property.id} value={property.name} className="mt-6">
            {/* Property Overview Card */}
            {property.name === selectedProperty && selectedPropertyData && (
              <Card className="mb-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedPropertyData.name}</h3>
                    <p className="text-muted-foreground mb-4">{selectedPropertyData.address}</p>
                    <p className="mb-4">{selectedPropertyData.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-primary" />
                        <span className="text-sm">Year built: {selectedPropertyData.yearBuilt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary" />
                        <span className="text-sm">Property Manager: {selectedPropertyData.manager}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-3 bg-muted/20">
                        <p className="text-xs text-muted-foreground">Total Units</p>
                        <p className="text-xl font-bold">{selectedPropertyData.units}</p>
                      </Card>
                      <Card className="p-3 bg-muted/20">
                        <p className="text-xs text-muted-foreground">Occupancy</p>
                        <p className="text-xl font-bold">{Math.round((selectedPropertyData.occupiedUnits / selectedPropertyData.units) * 100)}%</p>
                      </Card>
                      <Card className="p-3 bg-muted/20">
                        <p className="text-xs text-muted-foreground">Rent Collected</p>
                        <p className="text-xl font-bold">KES {selectedPropertyData.rentCollected.toLocaleString()}</p>
                      </Card>
                      <Card className="p-3 bg-muted/20">
                        <p className="text-xs text-muted-foreground">Rent Due</p>
                        <p className="text-xl font-bold text-red-500">KES {selectedPropertyData.rentDue.toLocaleString()}</p>
                      </Card>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-500" />
                        <span className="text-sm">{selectedPropertyData.maintenanceRequests} maintenance requests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-red-500" />
                        <span className="text-sm">{selectedPropertyData.complaints} complaints</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Tenant Information */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tenants</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm">{paidCount} Paid</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-amber-500" />
                    <span className="text-sm">{pendingCount + lateCount} Pending/Late</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <X size={16} className="text-red-500" />
                    <span className="text-sm">{overdueCount} Overdue</span>
                  </div>
                </div>
              </div>
              
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Move In</TableHead>
                        <TableHead>Rent Amount</TableHead>
                        <TableHead>Rent Status</TableHead>
                        <TableHead>Complaints</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell className="font-medium">{tenant.name}</TableCell>
                          <TableCell>{tenant.unit}</TableCell>
                          <TableCell>{new Date(tenant.moveInDate).toLocaleDateString()}</TableCell>
                          <TableCell>KES {tenant.rentAmount.toLocaleString()}</TableCell>
                          <TableCell>{getRentStatusBadge(tenant.rentStatus)}</TableCell>
                          <TableCell>
                            {tenant.complaints > 0 ? (
                              <Badge variant="outline" className="bg-red-50 text-red-500 hover:bg-red-100">
                                {tenant.complaints}
                              </Badge>
                            ) : (
                              <Check size={16} className="text-green-500" />
                            )}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">{tenant.contact}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleContactTenant(tenant)}
                                className="text-xs h-7"
                              >
                                Contact
                              </Button>
                              <Button 
                                variant={tenant.complaints > 0 ? "outline" : "ghost"} 
                                size="sm" 
                                onClick={() => handleViewComplaints(tenant)}
                                className={`text-xs h-7 ${tenant.complaints > 0 ? "border-red-200 text-red-500 hover:bg-red-50" : ""}`}
                              >
                                {tenant.complaints > 0 ? "View Issues" : "No Issues"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
