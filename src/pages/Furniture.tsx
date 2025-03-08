
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
  Sofa, 
  Award, 
  Phone, 
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock furniture suppliers data
const mockFurnitureSuppliers = [
  {
    id: 1,
    name: "Modern Kenya Furniture",
    rating: 4.8,
    reviewCount: 52,
    verified: true,
    specialization: ["Living Room", "Office Furniture"],
    location: "Nairobi",
    description: "Premium contemporary furniture manufacturer specializing in locally-sourced materials with modern design aesthetics for both homes and offices.",
    completedProjects: 87,
    featuredProject: "Executive Office Building, Westlands",
    contactPhone: "+254 712 345 678"
  },
  {
    id: 2,
    name: "Artisan Wood Creations",
    rating: 4.9,
    reviewCount: 63,
    verified: true,
    specialization: ["Handcrafted Furniture", "Custom Designs"],
    location: "Nakuru",
    description: "Master craftsmen creating bespoke wooden furniture with traditional techniques and sustainable local hardwoods for unique home pieces.",
    completedProjects: 112,
    featuredProject: "Safari Lodge Collection, Maasai Mara",
    contactPhone: "+254 723 456 789"
  },
  {
    id: 3,
    name: "Coastal Rattan Designs",
    rating: 4.6,
    reviewCount: 41,
    verified: true,
    specialization: ["Outdoor Furniture", "Rattan & Wicker"],
    location: "Mombasa",
    description: "Specializing in weather-resistant rattan and wicker furniture perfect for patios, verandas, and coastal homes with elegant, lightweight designs.",
    completedProjects: 64,
    featuredProject: "Beach Resort Furnishing, Diani",
    contactPhone: "+254 734 567 890"
  },
  {
    id: 4,
    name: "Urban Metal Works",
    rating: 4.7,
    reviewCount: 38,
    verified: true,
    specialization: ["Metal Furniture", "Industrial Designs"],
    location: "Nairobi",
    description: "Contemporary metal furniture with industrial styling, perfect for modern homes and commercial spaces seeking durability with aesthetic appeal.",
    completedProjects: 59,
    featuredProject: "Tech Startup Headquarters, Kilimani",
    contactPhone: "+254 745 678 901"
  },
  {
    id: 5,
    name: "EcoHome Furnishings",
    rating: 4.8,
    reviewCount: 47,
    verified: true,
    specialization: ["Sustainable Furniture", "Bedroom Sets"],
    location: "Kisumu",
    description: "Environmentally conscious furniture manufacturer using reclaimed materials and eco-friendly production methods for sustainable living solutions.",
    completedProjects: 73,
    featuredProject: "Green Living Apartment Complex, Karen",
    contactPhone: "+254 756 789 012"
  },
  {
    id: 6,
    name: "Luxury Upholstery Kenya",
    rating: 4.9,
    reviewCount: 56,
    verified: true,
    specialization: ["Upholstered Furniture", "Luxury Pieces"],
    location: "Nairobi",
    description: "Premium upholstery services and luxury furniture creations featuring imported and local fabrics with expert craftsmanship for discerning clients.",
    completedProjects: 94,
    featuredProject: "Diplomatic Residence, Muthaiga",
    contactPhone: "+254 767 890 123"
  }
];

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
const SpecializationTag = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
    {label}
  </span>
);

const Furniture = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [specializationFilter, setSpecializationFilter] = useState<string | null>(null);
  
  // Filter suppliers based on search term and filters
  const filteredSuppliers = mockFurnitureSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? supplier.location === locationFilter : true;
    const matchesSpecialization = specializationFilter ? 
      supplier.specialization.includes(specializationFilter) : true;
    return matchesSearch && matchesLocation && matchesSpecialization;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Furniture Suppliers in Kenya</h1>
            <p className="text-muted-foreground">
              Discover quality furniture suppliers and artisans to transform your living and working spaces with beautiful, functional pieces
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
                  placeholder="Search furniture suppliers..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <div className="relative">
                  <button 
                    className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-background hover:bg-accent transition-colors duration-200"
                  >
                    <MapPin size={18} />
                    <span>Location</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
                
                <div className="relative">
                  <button 
                    className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-background hover:bg-accent transition-colors duration-200"
                  >
                    <Sofa size={18} />
                    <span>Specialization</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
                
                <Button
                  variant="outline"
                  icon={<Filter size={18} />}
                >
                  More Filters
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
                        <Sofa size={32} className="text-primary opacity-50" />
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
                          >
                            Contact
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {supplier.specialization.map((spec, index) => (
                            <SpecializationTag key={index} label={spec} />
                          ))}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                <p className="text-muted-foreground mb-4">No furniture suppliers found matching your criteria</p>
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
      
      <Footer />
    </div>
  );
};

export default Furniture;
