
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  CreditCard, 
  PieChart, 
  FileText, 
  Calendar, 
  PhoneCall, 
  Mail, 
  Smartphone,
  BarChart4,
  CheckCircle,
  Clock,
  Receipt,
  CalendarClock,
  CreditCard as CardIcon,
  Landmark,
  Phone
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: {
    subTitle: string;
    description: string;
    benefits: string[];
    icon?: React.ReactNode;
  }[];
}

interface FeatureDialogProps {
  features: Feature[];
  onClose: () => void;
}

const FeatureDialog = ({ features, onClose }: FeatureDialogProps) => {
  return (
    <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl">Rent Management Features</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue={features[0]?.title} className="mt-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 mb-4">
          {features.map((feature, idx) => (
            <TabsTrigger key={idx} value={feature.title} className="flex items-center gap-2 text-xs md:text-sm">
              {feature.icon}
              <span className="hidden md:inline">{feature.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {features.map((feature, idx) => (
          <TabsContent key={idx} value={feature.title} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <h3 className="text-lg font-medium">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground">{feature.description}</p>
            
            {feature.details && (
              <div className="grid gap-6 mt-6">
                {feature.details.map((detail, detailIdx) => (
                  <Card key={detailIdx} className="p-4">
                    <div className="flex gap-3 items-start">
                      {detail.icon}
                      <div>
                        <h4 className="font-medium">{detail.subTitle}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{detail.description}</p>
                        <ul className="space-y-2">
                          {detail.benefits.map((benefit, benefitIdx) => (
                            <li key={benefitIdx} className="flex items-center gap-2 text-sm">
                              <CheckCircle size={14} className="text-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={onClose}>
          Close Preview
        </Button>
      </div>
    </DialogContent>
  );
};

export default FeatureDialog;
