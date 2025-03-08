
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
  Building, 
  Award, 
  Phone, 
  ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock contractor data
const mockContractors = [
  {
    id: 1,
    name: "Simba Builders Ltd",
    rating: 4.8,
    reviewCount: 45,
    verified: true,
    specialization: ["Residential", "Commercial"],
    location: "Nairobi",
    description: "Experienced construction company specializing in modern residential homes and commercial buildings with over 15 years of experience.",
    completedProjects: 56,
    featuredProject: "Elite Apartments, Kilimani",
    contactPhone: "+254 712 345 678"
  },
  {
    id: 2,
    name: "Modern Constructions",
    rating: 4.5,
    reviewCount: 38,
    verified: true,
    specialization: ["Residential", "Interior Design"],
    location: "Mombasa",
    description: "Quality-focused contractors specializing in coastal properties and interior renovations with competitive pricing.",
    completedProjects: 42,
    featuredProject: "Ocean View Villas, Nyali",
    contactPhone: "+254 723 456 789"
  },
  {
    id: 3,
    name: "Apex Developers",
    rating: 4.9,
    reviewCount: 62,
    verified: true,
    specialization: ["Commercial", "Industrial"],
    location: "Nairobi",
    description: "Premier construction firm focusing on large-scale commercial and industrial projects with expertise in modern architecture.",
    completedProjects: 78,
    featuredProject: "Tech Park Offices, Westlands",
    contactPhone: "+254 734 567 890"
  },
  {
    id: 4,
    name: "GreenBuild Kenya",
    rating: 4.6,
    reviewCount: 29,
    verified: true,
    specialization: ["Residential", "Eco-friendly"],
    location: "Nakuru",
    description: "Sustainable construction solutions using eco-friendly materials and energy-efficient designs for modern living.",
    completedProjects: 35,
    featuredProject: "Solar Homes Estate, Naivasha",
    contactPhone: "+254 745 678 901"
  },
  {
    id: 5,
    name: "Precision Engineers",
    rating: 4.7,
    reviewCount: 41,
    verified: true,
    specialization: ["Commercial", "Architectural Design"],
    location: "Kisumu",
    description: "Combining engineering expertise with architectural excellence for unique, structurally sound commercial projects.",
    completedProjects: 47,
    featuredProject: "Lakeside Business Center, Kisumu",
    contactPhone: "+254 756 789 012"
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

const Contractors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [specializationFilter, setSpecializationFilter] = useState<string | null>(null);
  
  // Filter contractors based on search term and filters
  const filteredContractors = mockContractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? contractor.location === locationFilter : true;
    const matchesSpecialization = specializationFilter ? 
      contractor.specialization.includes(specializationFilter) : true;
    return matchesSearch && matchesLocation && matchesSpecialization;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8">
          {/* Contractors Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Verified Contractors</h1>
            <p className="text-muted-foreground">
              Connect with pre-vetted, reliable contractors in Kenya who can bring your construction project to life
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
                  placeholder="Search contractors..."
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
                    <Building size={18} />
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
          
          {/* Contractors List */}
          <div className="space-y-6 animate-fade-in stagger-1">
            {filteredContractors.length > 0 ? (
              filteredContractors.map((contractor) => (
                <Card 
                  key={contractor.id} 
                  variant="outline" 
                  className="overflow-hidden"
                  withHover
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Contractor Logo/Image */}
                      <div className="w-full md:w-40 h-40 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {contractor.name.charAt(0)}
                        </span>
                      </div>
                      
                      {/* Contractor Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{contractor.name}</h3>
                              {contractor.verified && (
                                <div className="bg-green-100 text-green-800 rounded-full p-0.5" title="Verified Contractor">
                                  <Check size={14} />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <StarRating rating={contractor.rating} />
                              <span className="text-sm text-muted-foreground">
                                {contractor.reviewCount} reviews
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
                          {contractor.specialization.map((spec, index) => (
                            <SpecializationTag key={index} label={spec} />
                          ))}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            <span>{contractor.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          {contractor.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Check size={16} className="text-green-600" />
                            <span>{contractor.completedProjects} projects completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award size={16} className="text-amber-600" />
                            <span>Featured: {contractor.featuredProject}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No contractors found matching your criteria</p>
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

export default Contractors;
