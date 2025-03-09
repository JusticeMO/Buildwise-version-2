
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { useToast } from '@/hooks/use-toast';
import FinishingSupplierCard from '@/components/finishings/FinishingSupplierCard';
import FinishingSearchFilters from '@/components/finishings/FinishingSearchFilters';
import ContactModal from '@/components/contractors/ContactModal';

// Import data for finishing suppliers
import { mockFinishingSuppliers, getUniqueLocations, getUniqueSpecializations } from '@/data/finishingSuppliers';
import { Supplier } from '@/types/supplier';

const Finishings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [specializationFilter, setSpecializationFilter] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  
  // Get unique locations and specializations
  const locations = getUniqueLocations();
  const specializations = getUniqueSpecializations();
  
  // Filter suppliers based on search term and filters
  const filteredSuppliers = mockFinishingSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? supplier.location === locationFilter : true;
    const matchesSpecialization = specializationFilter ? 
      supplier.specialization.includes(specializationFilter) : true;
    return matchesSearch && matchesLocation && matchesSpecialization;
  });
  
  // Handle contact click
  const handleContactClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setContactModalOpen(true);
    
    // Track engagement
    toast({
      title: `Contacting ${supplier.name}`,
      description: "Opening contact options...",
      duration: 2000,
    });
  };

  // Handle specialization click
  const handleSpecializationClick = (specialization: string) => {
    setSpecializationFilter(specialization);
  };

  // Handle location click
  const handleLocationClick = (location: string) => {
    setLocationFilter(location);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Home Finishing Suppliers in Kenya</h1>
            <p className="text-muted-foreground">
              Discover specialized suppliers for all your home finishing needs - from paints and wallpapers to lighting, tiles, and decorative elements
            </p>
          </div>
          
          {/* Search and Filters */}
          <FinishingSearchFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            specializationFilter={specializationFilter}
            setSpecializationFilter={setSpecializationFilter}
            locations={locations}
            specializations={specializations}
          />
          
          {/* Suppliers List */}
          <div className="space-y-6 animate-fade-in stagger-1">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <FinishingSupplierCard 
                  key={supplier.id}
                  supplier={supplier}
                  onContactClick={handleContactClick}
                  onSpecializationClick={handleSpecializationClick}
                  onLocationClick={handleLocationClick}
                />
              ))
            ) : (
              <Card className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No finishing suppliers found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter(null);
                    setSpecializationFilter(null);
                  }}
                >
                  Clear filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        entity={selectedSupplier}
      />
      
      <Footer />
    </div>
  );
};

export default Finishings;
