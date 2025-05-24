
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { Star, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { VendorProfile } from '@/types/vendor';

// Demo vendor data (reuse from VendorProfiles.tsx)
const demoVendors: VendorProfile[] = [
  {
    id: 'contractor-demo-1',
    name: 'Elite Construction Co.',
    vendorType: 'contractor',
    description: 'Professional construction services specializing in residential and commercial buildings with over a decade of experience.',
    specialization: ['General Construction', 'Renovation', 'Electrical Work'],
    location: 'Nairobi, Kenya',
    contactEmail: 'info@eliteconstruction.co.ke',
    contactPhone: '+254 712 345 678',
    website: 'https://eliteconstruction.co.ke',
    rating: 4.8,
    reviewsCount: 127,
    yearsExperience: 12,
    verified: true,
    planType: 'professional',
    services: [
      'New Construction',
      'Home Renovation',
      'Electrical Installation',
      'Plumbing Services',
      'Interior Design',
      'Project Management'
    ],
    portfolio: [
      {
        id: '1',
        title: 'Westlands Apartment Complex',
        description: 'Modern 50-unit apartment complex with contemporary design',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Residential'
      }
    ]
  },
  {
    id: 'supplier-demo-1',
    name: 'BuildMart Supplies',
    vendorType: 'supplier',
    description: 'Leading supplier of quality building materials and construction supplies across Kenya.',
    specialization: ['Cement', 'Steel', 'Roofing Materials'],
    location: 'Mombasa, Kenya',
    contactEmail: 'sales@buildmart.co.ke',
    contactPhone: '+254 722 876 543',
    website: 'https://buildmart.co.ke',
    rating: 4.6,
    reviewsCount: 89,
    yearsExperience: 8,
    verified: true,
    planType: 'premium',
    services: [
      'Cement Supply',
      'Steel & Iron Bars',
      'Roofing Materials',
      'Tiles & Flooring',
      'Hardware & Tools',
      'Delivery Services'
    ],
    portfolio: [
      {
        id: '1',
        title: 'Premium Cement Collection',
        description: 'High-grade cement for all construction needs',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Materials'
      }
    ]
  },
  {
    id: 'architect-demo-1',
    name: 'Modern Design Studios',
    vendorType: 'architect',
    description: 'Award-winning architectural firm specializing in sustainable and modern design solutions.',
    specialization: ['Residential Design', 'Commercial Architecture', 'Sustainable Design'],
    location: 'Kisumu, Kenya',
    contactEmail: 'hello@moderndesign.co.ke',
    contactPhone: '+254 733 456 789',
    website: 'https://moderndesign.co.ke',
    rating: 4.9,
    reviewsCount: 56,
    yearsExperience: 15,
    verified: true,
    planType: 'premium',
    services: [
      'Architectural Design',
      'Interior Design',
      '3D Visualization',
      'Project Planning',
      'Sustainable Design',
      'Construction Supervision'
    ],
    portfolio: [
      {
        id: '1',
        title: 'Eco-Friendly Family Home',
        description: 'Sustainable family residence with solar integration',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Residential'
      }
    ]
  }
];

const VendorProfilesList = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'contractor' | 'supplier' | 'consultant' | 'architect'>('all');

  const filteredVendors = selectedType === 'all' 
    ? demoVendors 
    : demoVendors.filter(vendor => vendor.vendorType === selectedType);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Vendor Business Profiles</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore our verified vendors and see how they showcase their businesses on BuildWise
              </p>
              
              <div className="flex justify-center space-x-2 mb-8">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-md ${selectedType === 'all' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  All Vendors
                </button>
                <button
                  onClick={() => setSelectedType('contractor')}
                  className={`px-4 py-2 rounded-md ${selectedType === 'contractor' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  Contractors
                </button>
                <button
                  onClick={() => setSelectedType('supplier')}
                  className={`px-4 py-2 rounded-md ${selectedType === 'supplier' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  Suppliers
                </button>
                <button
                  onClick={() => setSelectedType('architect')}
                  className={`px-4 py-2 rounded-md ${selectedType === 'architect' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  Architects
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Vendor Grid */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} padding="lg" className="group hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {vendor.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {vendor.verified && (
                      <CheckCircle className="text-primary" size={20} />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{vendor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3 capitalize">
                    {vendor.vendorType} • {vendor.specialization.slice(0, 2).join(', ')}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {vendor.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium">{vendor.rating}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{vendor.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">
                      {vendor.planType} Plan
                    </span>
                    
                    <Link to={`/vendor-profile/${vendor.id}`}>
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Profile
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="text-center mt-16">
              <Card padding="lg" className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Ready to Create Your Business Profile?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of vendors who showcase their services on BuildWise and connect with potential clients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/vendor-application">
                    <Button size="lg">
                      Start Your Application
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorProfilesList;
