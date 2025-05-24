
import React from 'react';
import Button from '@/components/shared/Button';
import { BadgeCheck } from 'lucide-react';

const VendorHeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-primary/10 to-background py-16">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Grow Your Business with BuildWise</h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Join Kenya's leading construction marketplace and connect with thousands of potential clients
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
            </Button>
          </div>
          <div className="p-4 bg-secondary rounded-lg inline-block animate-fade-in">
            <p className="font-medium text-sm">
              <BadgeCheck className="inline-block mr-2 text-primary" size={18} />
              Over 500+ vendors already trust BuildWise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorHeroSection;
