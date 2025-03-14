
import React from 'react';
import { CreditCard, Shield, MessageSquare } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <div className="mb-16 flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold mb-4">Powerful Dashboard at Your Fingertips</h3>
        <p className="text-muted-foreground mb-6">
          Say goodbye to manual spreadsheets and missed payments. e-Caretaker automates every aspect of property management, from rent collection to maintenance tracking. With real-time insights and a tenant engagement hub, you'll build stronger relationships while saving time and resources.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <CreditCard size={16} className="text-primary" />
            <span className="text-sm font-medium">Encrypted Payments</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <Shield size={16} className="text-primary" />
            <span className="text-sm font-medium">Data Security</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <MessageSquare size={16} className="text-primary" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 bg-gray-100 rounded-lg p-4 shadow-md">
        <div className="aspect-video bg-white rounded border overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-center p-4">Dashboard Interface Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
