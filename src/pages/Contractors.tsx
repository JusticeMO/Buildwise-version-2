
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Sofa } from 'lucide-react';
import Button from '@/components/shared/Button';
import { useToast } from '@/hooks/use-toast';

// Import components
import ContractorCard from '@/components/contractors/ContractorCard';
import SupplierCard from '@/components/contractors/SupplierCard';
import SearchFilters from '@/components/contractors/SearchFilters';
import ContactModal from '@/components/contractors/ContactModal';

// Import data and types
import { mockContractors, getUniqueLocations as getContractorLocations, getUniqueSpecializations as getContractorSpecializations } from '@/data/contractors';
import { mockSuppliers, getUniqueLocations as getSupplierLocations, getUniqueSpecializations as getSupplierSpecializations } from '@/data/suppliers';
import { Contractor } from '@/types/contractor';
import { Supplier } from '@/types/supplier';

const Contractors = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [specializationFilter, setSpecializationFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("contractors");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Contractor | Supplier | null>(null);
  
  // Get unique locations and specializations based on active tab
  const locations = activeTab === 'contractors' 
    ? getContractorLocations() 
    : getSupplierLocations();
  
  const specializations = activeTab === 'contractors' 
    ? getContractorSpecializations() 
    : getSupplierSpecializations();
  
  // Handle clear filters
  const clearFilters = () => {
    setLocationFilter(null);
    setSpecializationFilter(null);
    setSearchTerm('');
  };
  
  // Open contact modal for contractor
  const handleContactClick = (entity: Contractor | Supplier) => {
    setSelectedEntity(entity);
    setContactModalOpen(true);
    
    // Track engagement
    toast({
      title: `Contacting ${entity.name}`,
      description: "Opening contact options...",
      duration: 2000,
    });
  };
  
  // Filter contractors based on search term and filters
  const filteredContractors = mockContractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? contractor.location === locationFilter : true;
    const matchesSpecialization = specializationFilter ? 
      contractor.specialization.includes(specializationFilter) : true;
    return matchesSearch && matchesLocation && matchesSpecialization;
  });
  
  // Filter suppliers based on search term and filters
  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? supplier.location === locationFilter : true;
    const matchesSpecialization = specializationFilter ? 
      supplier.specialization.includes(specializationFilter) : true;
    return matchesSearch && matchesLocation && matchesSpecialization;
  });
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    clearFilters();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Verified Service Providers</h1>
            <p className="text-muted-foreground">
              Connect with pre-vetted, reliable contractors and suppliers in Kenya who can bring your construction project to life
            </p>
          </div>
          
          {/* Tabs Navigation */}
          <Tabs defaultValue="contractors" value={activeTab} onValueChange={handleTabChange} className="mb-8 animate-fade-in">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="contractors" className="text-base">
                  <Building size={18} className="mr-2" /> Contractors
                </TabsTrigger>
                <TabsTrigger value="suppliers" className="text-base">
                  <Sofa size={18} className="mr-2" /> Furnishing & Finishing
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Search and Filters */}
            <SearchFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              locationFilter={locationFilter}
              onLocationChange={setLocationFilter}
              specializationFilter={specializationFilter}
              onSpecializationChange={setSpecializationFilter}
              clearFilters={clearFilters}
              activeTab={activeTab}
              locations={locations}
              specializations={specializations}
            />
            
            {/* Contractors List Tab */}
            <TabsContent value="contractors" className="animate-fade-in">
              <div className="space-y-6 animate-fade-in stagger-1">
                {filteredContractors.length > 0 ? (
                  filteredContractors.map((contractor) => (
                    <ContractorCard
                      key={contractor.id}
                      contractor={contractor}
                      onContactClick={handleContactClick}
                    />
                  ))
                ) : (
                  <Card className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No contractors found matching your criteria</p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            {/* Suppliers List Tab */}
            <TabsContent value="suppliers" className="animate-fade-in">
              <div className="space-y-6 animate-fade-in stagger-1">
                {filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map((supplier) => (
                    <SupplierCard
                      key={supplier.id}
                      supplier={supplier}
                      onContactClick={handleContactClick}
                    />
                  ))
                ) : (
                  <Card className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No suppliers found matching your criteria</p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        entity={selectedEntity}
      />
      
      <Footer />
    </div>
  );
};

export default Contractors;
