
import React from 'react';
import { Star, MapPin, Phone, Mail, Globe, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { VendorProfile as VendorProfileType } from '@/types/vendor';

interface VendorProfileProps {
  vendor: VendorProfileType;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ vendor }) => {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">
                  {vendor.name.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{vendor.name}</h1>
                  {vendor.verified && (
                    <CheckCircle className="text-primary" size={24} />
                  )}
                </div>
                
                <p className="text-xl text-muted-foreground mb-4 capitalize">
                  {vendor.vendorType} • {vendor.specialization.join(', ')}
                </p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-2 font-medium">{vendor.rating}</span>
                    <span className="text-muted-foreground">({vendor.reviewsCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{vendor.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{vendor.yearsExperience} years experience</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{vendor.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  <Button size="lg">
                    Contact Now
                  </Button>
                  <Button variant="outline" size="lg">
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendor.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <CheckCircle className="text-primary shrink-0" size={20} />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Portfolio */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vendor.portfolio.map((project) => (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="aspect-video bg-secondary rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* About */}
            <Card padding="lg">
              <h2 className="text-2xl font-bold mb-4">About {vendor.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                With {vendor.yearsExperience} years of experience in the construction industry, {vendor.name} has established itself as a trusted {vendor.vendorType} specializing in {vendor.specialization.join(', ')}. Our commitment to quality and customer satisfaction has earned us a {vendor.rating}-star rating from over {vendor.reviewsCount} satisfied clients.
              </p>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card padding="lg">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary" />
                  <span>{vendor.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  <span className="break-all">{vendor.contactEmail}</span>
                </div>
                {vendor.website && (
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-primary" />
                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Visit Website
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  <span>{vendor.location}</span>
                </div>
              </div>
            </Card>
            
            {/* Quick Stats */}
            <Card padding="lg">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{vendor.yearsExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">{vendor.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-medium">{vendor.reviewsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium capitalize">{vendor.planType}</span>
                </div>
              </div>
            </Card>
            
            {/* CTA */}
            <Card padding="lg" className="bg-primary/5 border-primary/20">
              <h3 className="text-lg font-bold mb-2">Ready to work with us?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get a personalized quote for your project today.
              </p>
              <Button fullWidth className="mb-3">
                Get Quote
              </Button>
              <Button variant="outline" fullWidth>
                <ArrowRight size={16} className="mr-2" />
                View More Projects
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
