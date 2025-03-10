
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import KeyBenefits from '@/components/vendor/KeyBenefits';
import BillingOptions from '@/components/vendor/BillingOptions';
import PricingTiersSection from '@/components/vendor/PricingTiersSection';
import TestimonialsSection from '@/components/vendor/TestimonialsSection';
import FAQSection from '@/components/vendor/FAQSection';
import AuthCheck from '@/components/vendor/AuthCheck';

const VendorApplication: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [contractTerm, setContractTerm] = useState(1);
  const { isSignedIn, isLoaded } = useUser();

  const handleSelectPlan = (planName: string) => {
    if (!isSignedIn) {
      toast.error("Please sign in to select a plan", {
        description: "You need to create an account or sign in before continuing.",
        action: {
          label: "Sign In",
          onClick: () => document.getElementById('sign-in-button')?.click(),
        },
      });
      return;
    }
    
    toast.success(`Selected ${planName} plan`, {
      description: `You've selected the ${planName} plan with ${billingCycle} billing for ${contractTerm} year${contractTerm > 1 ? 's' : ''}.`,
    });
    
    // Here you would typically redirect to a checkout/payment page
    console.log({
      plan: planName,
      billingCycle,
      contractTerm
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Grow Your Business with BuildWise
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Kenya's premier platform connecting construction professionals with clients seeking quality services.
            </p>
          </div>
          
          {/* Authentication Check */}
          {!isSignedIn && isLoaded && <AuthCheck />}

          {/* Key Benefits */}
          <KeyBenefits />
          
          {/* Contract Terms Selection */}
          <div className="mb-8">
            <BillingOptions 
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
              contractTerm={contractTerm}
              setContractTerm={setContractTerm}
            />
            
            {/* Pricing Tiers */}
            <PricingTiersSection 
              billingCycle={billingCycle}
              contractTerm={contractTerm}
              onSelectPlan={handleSelectPlan}
            />
          </div>
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* FAQ Section */}
          <FAQSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorApplication;
