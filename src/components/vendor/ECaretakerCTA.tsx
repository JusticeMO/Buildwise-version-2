
import React from 'react';
import Button from '@/components/shared/Button';

interface ECaretakerCTAProps {
  onRegisterClick: () => void;
}

const ECaretakerCTA = ({ onRegisterClick }: ECaretakerCTAProps) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">Ready to transform your property management?</h3>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Whether you manage a single unit or a large complex, e-Caretaker scales to meet your needs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={onRegisterClick}>Register Your Property</Button>
        <Button variant="outline" size="lg">View Pricing</Button>
      </div>
    </div>
  );
};

export default ECaretakerCTA;
