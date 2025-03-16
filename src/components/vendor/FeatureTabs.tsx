
import React from 'react';
import { Building2, BadgeDollarSign, Wrench, Users, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RentManagementTab from './RentManagementTab';
import PlaceholderTab from './PlaceholderTab';
import { RentFeature } from '@/data/rentFeatures';

interface FeatureTabsProps {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
  rentFeatures: RentFeature[];
  onOpenDialog: () => void;
}

const FeatureTabs = ({ activeFeature, setActiveFeature, rentFeatures, onOpenDialog }: FeatureTabsProps) => {
  return (
    <Tabs defaultValue="rent" className="w-full mb-16" onValueChange={setActiveFeature}>
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
        <TabsTrigger value="rent" className="flex items-center justify-center gap-2 py-3">
          <BadgeDollarSign size={18} />
          <span>Rent Management</span>
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center justify-center gap-2 py-3">
          <Wrench size={18} />
          <span>Maintenance</span>
        </TabsTrigger>
        <TabsTrigger value="community" className="flex items-center justify-center gap-2 py-3">
          <Users size={18} />
          <span>Tenant Community</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center justify-center gap-2 py-3">
          <BarChart3 size={18} />
          <span>Analytics</span>
        </TabsTrigger>
      </TabsList>

      {/* Rent Management Content */}
      <TabsContent value="rent" className="p-0">
        <RentManagementTab 
          features={rentFeatures} 
          onOpenDialog={onOpenDialog} 
        />
      </TabsContent>

      {/* Placeholder content for other tabs */}
      <TabsContent value="maintenance">
        <PlaceholderTab 
          icon={Wrench} 
          title="Maintenance Management" 
          description="Coming soon! Track and manage property maintenance with ease." 
        />
      </TabsContent>

      <TabsContent value="community">
        <PlaceholderTab 
          icon={Users} 
          title="Tenant Community Hub" 
          description="Coming soon! Build stronger relationships with your tenants." 
        />
      </TabsContent>

      <TabsContent value="analytics">
        <PlaceholderTab 
          icon={BarChart3} 
          title="Analytics Dashboard" 
          description="Coming soon! Get insights into your property performance." 
        />
      </TabsContent>
    </Tabs>
  );
};

export default FeatureTabs;
