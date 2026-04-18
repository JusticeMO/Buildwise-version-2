
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Home, Users, CreditCard, AlertTriangle, Clock, Building, Plus, MapPin } from 'lucide-react';
import Button from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PropertyData {
  id: number;
  name: string;
  units: number;
  occupiedUnits: number;
  rentCollected: number;
  rentDue: number;
  location?: string;
  type?: string;
}

const LandlordOverview = () => {
  const [properties, setProperties] = useState<PropertyData[]>([
    { id: 1, name: 'Riverside Apartments', units: 12, occupiedUnits: 10, rentCollected: 250000, rentDue: 50000, location: 'Westlands, Nairobi', type: 'Apartment' },
    { id: 2, name: 'Green Gardens Estate', units: 8, occupiedUnits: 7, rentCollected: 175000, rentDue: 25000, location: 'Kilimani, Nairobi', type: 'Estate' },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '', location: '', type: 'apartment', units: '', description: ''
  });

  const recentActivities = [
    { id: 1, activity: 'Rent payment received from John Doe', amount: 25000, date: '2023-07-01', status: 'success' },
    { id: 2, activity: 'Maintenance request from Unit 5B', date: '2023-06-30', status: 'pending' },
    { id: 3, activity: 'New lease signed for Unit 3A', date: '2023-06-28', status: 'success' },
    { id: 4, activity: 'Rent payment overdue for Unit 8C', amount: 30000, date: '2023-06-27', status: 'danger' },
  ];

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.location || !newProperty.units) {
      toast.error('Please fill in all required fields');
      return;
    }

    const unitCount = parseInt(newProperty.units);
    if (isNaN(unitCount) || unitCount <= 0) {
      toast.error('Please enter a valid number of units');
      return;
    }

    const newProp: PropertyData = {
      id: Date.now(),
      name: newProperty.name,
      units: unitCount,
      occupiedUnits: 0,
      rentCollected: 0,
      rentDue: 0,
      location: newProperty.location,
      type: newProperty.type,
    };

    setProperties(prev => [...prev, newProp]);
    toast.success(`"${newProperty.name}" has been registered successfully!`);
    setShowAddDialog(false);
    setNewProperty({ name: '', location: '', type: 'apartment', units: '', description: '' });
  };

  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const totalOccupied = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const totalCollected = properties.reduce((sum, p) => sum + p.rentCollected, 0);
  const totalDue = properties.reduce((sum, p) => sum + p.rentDue, 0);
  const occupancyRate = totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            icon={<Building size={16} />}
            iconPosition="left"
            onClick={() => setShowAddDialog(true)}
          >
            Add Property
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl font-bold mt-1">{properties.length}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Home className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{totalUnits} units total</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <p className="text-2xl font-bold mt-1">{occupancyRate}%</p>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <Users className="text-green-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{totalOccupied} of {totalUnits} units occupied</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rent Collected</p>
              <p className="text-2xl font-bold mt-1">KES {totalCollected.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-md">
              <CreditCard className="text-purple-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4">+12% from last month</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding Rent</p>
              <p className="text-2xl font-bold mt-1">KES {totalDue.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
          <p className="text-xs text-red-600 mt-4">{properties.filter(p => p.rentDue > 0).length} properties with overdue rent</p>
        </Card>
      </div>

      {/* Properties List */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Your Properties</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/20">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Property</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Units</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Occupancy</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Collected</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Due</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{property.name}</p>
                      {property.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin size={10} /> {property.location}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{property.units} units</td>
                  <td className="px-4 py-3">{property.occupiedUnits}/{property.units} ({Math.round((property.occupiedUnits / property.units) * 100)}%)</td>
                  <td className="px-4 py-3">KES {property.rentCollected.toLocaleString()}</td>
                  <td className="px-4 py-3 text-red-600">KES {property.rentDue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Viewing details for ${property.name}`)}>View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 border-b pb-4">
              <div className={`p-2 rounded-full ${
                activity.status === 'success' ? 'bg-green-100' : 
                activity.status === 'pending' ? 'bg-amber-100' : 'bg-red-100'
              }`}>
                {activity.status === 'success' ? 
                  <CreditCard className="text-green-600" size={16} /> : 
                  activity.status === 'pending' ? 
                  <Clock className="text-amber-600" size={16} /> :
                  <AlertTriangle className="text-red-600" size={16} />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.activity}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                  {activity.amount && (
                    <p className={`text-xs ${
                      activity.status === 'success' ? 'text-green-600' : 
                      activity.status === 'danger' ? 'text-red-600' : ''
                    }`}>KES {activity.amount.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full mt-2" onClick={() => toast.info('Full activity log — coming in the next update.')}>View All Activity</Button>
        </div>
      </div>

      {/* Add Property Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-white sm:max-w-lg">
          <DialogTitle className="flex items-center gap-2">
            <Building size={20} /> Register New Property
          </DialogTitle>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm font-medium">Property Name *</Label>
              <Input
                value={newProperty.name}
                onChange={(e) => setNewProperty(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Sunrise Towers"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Location *</Label>
              <Input
                value={newProperty.location}
                onChange={(e) => setNewProperty(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Westlands, Nairobi"
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Property Type</Label>
                <Select value={newProperty.type} onValueChange={(v) => setNewProperty(prev => ({ ...prev, type: v }))}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                    <SelectItem value="maisonette">Maisonette</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Number of Units *</Label>
                <Input
                  type="number"
                  value={newProperty.units}
                  onChange={(e) => setNewProperty(prev => ({ ...prev, units: e.target.value }))}
                  placeholder="e.g. 12"
                  className="mt-1.5"
                  min="1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Description (Optional)</Label>
              <Textarea
                value={newProperty.description}
                onChange={(e) => setNewProperty(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the property..."
                rows={3}
                className="mt-1.5"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                icon={<Plus size={16} />}
                iconPosition="left"
                onClick={handleAddProperty}
              >
                Register Property
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordOverview;
