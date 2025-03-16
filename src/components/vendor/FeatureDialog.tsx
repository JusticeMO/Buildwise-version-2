
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureDialogProps {
  features: Feature[];
  onClose: () => void;
}

const FeatureDialog = ({ features, onClose }: FeatureDialogProps) => {
  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>Rent Management Features</DialogTitle>
      </DialogHeader>
      <div className="grid gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Key Features:</h4>
          <div className="grid gap-4">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex gap-3">
                  {feature.icon}
                  <div>
                    <h5 className="font-medium">{feature.title}</h5>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Button onClick={onClose}>
          Close Preview
        </Button>
      </div>
    </DialogContent>
  );
};

export default FeatureDialog;
