
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeatureSection from '@/components/Home/FeatureSection';
import TestimonialSection from '@/components/Home/TestimonialSection';
import Button from '@/components/shared/Button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-kenya-red/10 to-kenya-green/10">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in">
                Ready to build your dream project with confidence?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Join thousands of diaspora who are successfully managing construction 
                projects back home in Kenya with complete transparency and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Button 
                  size="lg"
                  className="group"
                  icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                  iconPosition="right"
                >
                  Get started for free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Book a demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
