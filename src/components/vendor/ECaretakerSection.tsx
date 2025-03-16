
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import Button from '@/components/shared/Button';
import FeatureDialog from './FeatureDialog';
import PropertyRegistrationForm from './PropertyRegistrationForm';
import DashboardPreview from './DashboardPreview';
import FeatureTabs from './FeatureTabs';
import BenefitColumns from './BenefitColumns';
import ECaretakerCTA from './ECaretakerCTA';
import { rentFeatures } from '@/data/rentFeatures';
import { propertyOwnerBenefits, tenantBenefits } from '@/data/benefitData';

const ECaretakerSection = () => {
  const [activeFeature, setActiveFeature] = useState('rent');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            Property Management Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">e-Caretaker: Streamline Property Management with AI-Powered Efficiency</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Automate rent collection, maintenance, and tenant engagement—all in one platform.
          </p>
        </div>

        {showRegistrationForm ? (
          <PropertyRegistrationForm />
        ) : (
          <>
            {/* Feature Tabs */}
            <FeatureTabs 
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
              rentFeatures={rentFeatures}
              onOpenDialog={() => setIsDialogOpen(true)}
            />

            {/* Benefit Columns */}
            <BenefitColumns 
              propertyOwnerBenefits={propertyOwnerBenefits}
              tenantBenefits={tenantBenefits}
            />

            {/* Dashboard Preview */}
            <DashboardPreview />

            {/* Testimonial */}
            <div className="bg-secondary/30 rounded-xl p-8 mb-16">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-lg font-bold italic mb-4">
                  "Since implementing e-Caretaker, we've reduced our management overhead by 60% and increased tenant satisfaction scores. The seamless integration with BuildWise's construction marketplace means we can quickly address maintenance issues with verified professionals."
                </h3>
                <p className="font-medium">Sarah Kamau</p>
                <p className="text-sm text-muted-foreground">Property Manager, Westlands Heights Apartments</p>
              </div>
            </div>

            {/* CTA */}
            <ECaretakerCTA onRegisterClick={() => setShowRegistrationForm(true)} />

            {/* Feature Demo Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <FeatureDialog 
                features={rentFeatures} 
                onClose={() => setIsDialogOpen(false)} 
              />
            </Dialog>
          </>
        )}
        
        {showRegistrationForm && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              onClick={() => setShowRegistrationForm(false)}
            >
              ← Back to Features
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ECaretakerSection;
