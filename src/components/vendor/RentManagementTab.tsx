
import React from 'react';
import { Bell, CreditCard, PieChart, FileText, Calendar, ChevronRight, Building2, CheckCircle } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Button from '@/components/shared/Button';
import FeatureListItem from './FeatureListItem';

interface RentFeature {
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

interface RentManagementTabProps {
  features: RentFeature[];
  onOpenDialog: () => void;
}

const RentManagementTab = ({ features, onOpenDialog }: RentManagementTabProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-4">Streamlined Rent Collection & Management</h3>
        <p className="text-muted-foreground mb-6">
          Our comprehensive rent management system eliminates payment headaches with automated reminders, flexible payment options, and real-time tracking—all accessible from any device.
        </p>
        
        <ul className="space-y-4 mb-6">
          {features.map((feature, idx) => (
            <FeatureListItem 
              key={idx} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </ul>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="mt-4" onClick={onOpenDialog}>
              Explore Rent Management
              <ChevronRight size={16} />
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      
      <div className="bg-muted rounded-lg p-6 relative overflow-hidden">
        <div className="bg-background rounded-lg shadow-lg p-5 border">
          <h4 className="font-medium mb-4">Rent Collection Overview</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded">
              <div>
                <p className="font-medium">Total Units</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Building2 size={24} className="text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded">
              <div>
                <p className="font-medium text-emerald-800">Paid</p>
                <p className="text-2xl font-bold text-emerald-600">20</p>
              </div>
              <CheckCircle size={24} className="text-emerald-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded">
              <div>
                <p className="font-medium text-amber-800">Pending</p>
                <p className="text-2xl font-bold text-amber-600">4</p>
              </div>
              <Calendar size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentManagementTab;
