
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Home, Users, Plus, ArrowRight, Check, X } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Function component for LandlordProperties
const LandlordProperties = ({ onViewPropertyDetails }) => {
  const navigate = useNavigate();
  
  // Mock data for properties
  const properties = [
    { id: 1, name: 'Riverside Apartments', units: 12, occupiedUnits: 10, vacantUnits: 2, rentCollected: 250000, rentDue: 50000 },
    { id: 2, name: 'Green Gardens Estate', units: 8, occupiedUnits: 7, vacantUnits: 1, rentCollected: 175000, rentDue: 25000 },
    { id: 3, name: 'Sunrise Towers', units: 15, occupiedUnits: 12, vacantUnits: 3, rentCollected: 320000, rentDue: 60000 },
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

      {/* Property Statistics */}
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

      {/* Property Occupancy Table (Replacing Chart) */}
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

      {/* Properties List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Properties</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Occupancy</TableHead>
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
    </div>
  );
};

export default LandlordProperties;
