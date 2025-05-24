
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VendorProfile from '@/components/vendor/VendorProfile';
import { VendorProfile as VendorProfileType } from '@/types/vendor';

// Demo service provider data - expanded to include all construction service types
const demoServiceProviders: VendorProfileType[] = [
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
      },
      {
        id: '2',
        title: 'Karen Villa Renovation',
        description: 'Complete renovation of luxury family home',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Renovation'
      },
      {
        id: '3',
        title: 'CBD Office Building',
        description: '5-story modern office building in Nairobi CBD',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Commercial'
      },
      {
        id: '4',
        title: 'Shopping Mall Extension',
        description: 'Extension and renovation of existing shopping center',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Commercial'
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
      },
      {
        id: '2',
        title: 'Steel & Reinforcement',
        description: 'Quality steel bars and reinforcement materials',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      },
      {
        id: '2',
        title: 'Modern Office Complex',
        description: 'Contemporary office design with green spaces',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Commercial'
      },
      {
        id: '3',
        title: 'Luxury Resort Design',
        description: 'Boutique resort with traditional and modern elements',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Hospitality'
      }
    ]
  },
  {
    id: 'consultant-demo-1',
    name: 'Strategic Construction Consulting',
    vendorType: 'consultant',
    description: 'Expert construction consulting services for project management, cost estimation, and technical advisory.',
    specialization: ['Project Management', 'Cost Estimation', 'Technical Advisory'],
    location: 'Nairobi, Kenya',
    contactEmail: 'info@strategicconstruction.co.ke',
    contactPhone: '+254 744 567 890',
    website: 'https://strategicconstruction.co.ke',
    rating: 4.7,
    reviewsCount: 73,
    yearsExperience: 10,
    verified: true,
    planType: 'professional',
    services: [
      'Project Management',
      'Cost Estimation',
      'Quality Assurance',
      'Technical Advisory',
      'Risk Assessment',
      'Compliance Consulting'
    ],
    portfolio: [
      {
        id: '1',
        title: 'Hospital Construction Management',
        description: 'Complete project management for 200-bed hospital facility',
        imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Healthcare'
      },
      {
        id: '2',
        title: 'Shopping Center Development',
        description: 'Technical advisory and cost management for retail complex',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Commercial'
      }
    ]
  }
];

const VendorProfiles = () => {
  const { vendorId, providerId } = useParams<{ vendorId?: string; providerId?: string }>();
  
  // Support both vendor and provider ID for backward compatibility
  const serviceProviderId = providerId || vendorId;
  const serviceProvider = demoServiceProviders.find(p => p.id === serviceProviderId);

  if (!serviceProvider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Provider Not Found</h1>
            <p className="text-muted-foreground">The service provider profile you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <VendorProfile vendor={serviceProvider} />
      </main>
      <Footer />
    </div>
  );
};

export default VendorProfiles;
