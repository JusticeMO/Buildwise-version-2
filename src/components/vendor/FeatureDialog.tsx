
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureDetail {
  subTitle: string;
  description: string;
  benefits: string[];
  icon?: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: FeatureDetail[];
}

interface FeatureDialogProps {
  features: Feature[];
  onClose: () => void;
}

const FeatureDialog = ({ features, onClose }: FeatureDialogProps) => {
  const [expandedFeatures, setExpandedFeatures] = useState<{[key: string]: boolean}>({});

  const toggleFeature = (title: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl">Rent Management Features</DialogTitle>
      </DialogHeader>
      <div className="grid gap-6">
        <div className="space-y-6">
          <h4 className="font-medium text-lg">Key Features:</h4>
          <div className="grid gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="space-y-4">
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div 
                    className="flex gap-3 cursor-pointer" 
                    onClick={() => feature.details && toggleFeature(feature.title)}
                  >
                    <div className="mt-1 shrink-0">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{feature.title}</h5>
                        {feature.details && (
                          <button className="p-1 hover:bg-muted rounded-full">
                            {expandedFeatures[feature.title] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  {expandedFeatures[feature.title] && feature.details && (
                    <div className="mt-4 pl-8 space-y-4 border-t pt-4">
                      {feature.details.map((detail, detailIdx) => (
                        <div key={detailIdx} className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-start gap-3 mb-2">
                            {detail.icon && <div className="mt-1">{detail.icon}</div>}
                            <div>
                              <h6 className="font-medium">{detail.subTitle}</h6>
                              <p className="text-sm text-muted-foreground">{detail.description}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-xs font-medium uppercase text-muted-foreground mb-2">Benefits</p>
                            <ul className="text-sm space-y-1">
                              {detail.benefits.map((benefit, benefitIdx) => (
                                <li key={benefitIdx} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={onClose} className="mt-4">
          Close Preview
        </Button>
      </div>
    </DialogContent>
  );
};

export default FeatureDialog;
