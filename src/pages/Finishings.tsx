
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { 
  SearchIcon, 
  Star, 
  MapPin, 
  Check, 
  Filter, 
  Lamp, 
  Award, 
  Phone, 
  ChevronDown,
  Paintbrush,
  Grid,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Import data for finishing suppliers
import { mockFinishingSuppliers, getUniqueLocations, getUniqueSpecializations } from '@/data/finishingSuppliers';

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= Math.round(rating) ? "currentColor" : "none"}
            className={star <= Math.round(rating) ? "" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Specialization tag component
const SpecializationTag = ({ label, onClick }: { label: string, onClick?: () => void }) => (
  <span 
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground",
      onClick && "cursor-pointer hover:bg-primary/10 transition-colors"
    )}
    onClick={onClick}
  >
    {label}
  </span>
);

// Icon for finishing category
const FinishingIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'interior painting':
    case 'exterior painting':
      return <Paintbrush size={32} className="text-primary opacity-50" />;
    case 'lighting design':
    case 'light fixtures':
      return <Lamp size={32} className="text-primary opacity-50" />;
    case 'ceramic tiles':
    case 'porcelain flooring':
      return <Grid size={32} className="text-primary opacity-50" />;
    default:
      return <Lamp size={32} className="text-primary opacity-50" />;
  }
};

const ContactModal = ({ isOpen, onClose, supplier }: { 
  isOpen: boolean, 
  onClose: () => void, 
  supplier: any 
}) => {
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!supplier) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully",
        description: `Your message has been sent to ${supplier.name}. They will contact you shortly.`,
      });
      setMessage('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Contact {supplier.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{supplier.contactPhone}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Send a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="message" className="text-sm text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 border rounded-md h-24 focus:ring-1 focus:ring-primary"
                      placeholder={`Hello, I'm interested in your services for my project...`}
                      required
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      icon={<Phone size={16} />}
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Finishings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [specializationFilter, setSpecializationFilter] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  
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
  const handleContactClick = (supplier: any) => {
    setSelectedSupplier(supplier);
    setContactModalOpen(true);
    
    // Track engagement
    toast({
      title: `Contacting ${supplier.name}`,
      description: "Opening contact options...",
      duration: 2000,
    });
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
          <Card className="mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search finishing suppliers..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                {/* Location Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button 
                      className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-background hover:bg-accent transition-colors duration-200"
                    >
                      <MapPin size={18} />
                      <span>{locationFilter || "Location"}</span>
                      <ChevronDown size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="p-2">
                      <div className="space-y-1">
                        {locationFilter && (
                          <button
                            onClick={() => setLocationFilter(null)}
                            className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded hover:bg-accent"
                          >
                            <span>Clear filter</span>
                            <X size={14} />
                          </button>
                        )}
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => setLocationFilter(location)}
                            className={cn(
                              "flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent",
                              locationFilter === location && "bg-primary/10"
                            )}
                          >
                            <MapPin size={14} className="mr-2" />
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Specialization Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button 
                      className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-background hover:bg-accent transition-colors duration-200"
                    >
                      <Paintbrush size={18} />
                      <span>{specializationFilter || "Specialization"}</span>
                      <ChevronDown size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="p-2">
                      <div className="space-y-1">
                        {specializationFilter && (
                          <button
                            onClick={() => setSpecializationFilter(null)}
                            className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded hover:bg-accent"
                          >
                            <span>Clear filter</span>
                            <X size={14} />
                          </button>
                        )}
                        {specializations.map((specialization) => (
                          <button
                            key={specialization}
                            onClick={() => setSpecializationFilter(specialization)}
                            className={cn(
                              "flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent",
                              specializationFilter === specialization && "bg-primary/10"
                            )}
                          >
                            <Paintbrush size={14} className="mr-2" />
                            {specialization}
                          </button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button
                  variant="outline"
                  icon={<Filter size={18} />}
                  onClick={() => {
                    setLocationFilter(null);
                    setSpecializationFilter(null);
                    setSearchTerm('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Suppliers List */}
          <div className="space-y-6 animate-fade-in stagger-1">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <Card 
                  key={supplier.id} 
                  variant="outline" 
                  className="overflow-hidden"
                  withHover
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Supplier Logo/Image */}
                      <div className="w-full md:w-40 h-40 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <FinishingIcon category={supplier.specialization[0]} />
                      </div>
                      
                      {/* Supplier Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{supplier.name}</h3>
                              {supplier.verified && (
                                <div className="bg-green-100 text-green-800 rounded-full p-0.5" title="Verified Supplier">
                                  <Check size={14} />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <StarRating rating={supplier.rating} />
                              <span className="text-sm text-muted-foreground">
                                {supplier.reviewCount} reviews
                              </span>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            variant="outline"
                            icon={<Phone size={16} />}
                            className="shrink-0"
                            onClick={() => handleContactClick(supplier)}
                          >
                            Contact
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {supplier.specialization.map((spec, index) => (
                            <SpecializationTag 
                              key={index} 
                              label={spec} 
                              onClick={() => setSpecializationFilter(spec)}
                            />
                          ))}
                          <div 
                            className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                            onClick={() => setLocationFilter(supplier.location)}
                          >
                            <MapPin size={14} />
                            <span>{supplier.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          {supplier.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Check size={16} className="text-green-600" />
                            <span>{supplier.completedProjects} projects completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award size={16} className="text-amber-600" />
                            <span>Featured: {supplier.featuredProject}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
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
        supplier={selectedSupplier}
      />
      
      <Footer />
    </div>
  );
};

export default Finishings;
