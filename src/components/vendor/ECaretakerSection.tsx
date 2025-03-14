
import React, { useState } from 'react';
import { Building2, BadgeDollarSign, Wrench, Users, BarChart3, Bell, CreditCard, PieChart, FileText, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog } from '@/components/ui/dialog';
import Button from '@/components/shared/Button';
import BenefitColumn from './BenefitColumn';
import RentManagementTab from './RentManagementTab';
import PlaceholderTab from './PlaceholderTab';
import DashboardPreview from './DashboardPreview';
import FeatureDialog from './FeatureDialog';

const ECaretakerSection = () => {
  const [activeFeature, setActiveFeature] = useState('rent');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const rentFeatures = [
    {
      title: "Automated Reminders",
      description: "Customizable rent reminders sent via SMS, email, or app notifications to reduce late payments.",
      icon: <Bell className="text-primary" size={20} />
    },
    {
      title: "Flexible Payment Options",
      description: "Accept M-Pesa, bank transfers, cards, and more with automatic reconciliation.",
      icon: <CreditCard className="text-primary" size={20} />
    },
    {
      title: "Payment Tracking",
      description: "Real-time dashboard showing paid, pending, and overdue rent payments across all units.",
      icon: <PieChart className="text-primary" size={20} />
    },
    {
      title: "Digital Receipts",
      description: "Automatic generation and distribution of rent receipts to tenants via email or SMS.",
      icon: <FileText className="text-primary" size={20} />
    },
    {
      title: "Payment Plans",
      description: "Create custom payment plans for tenants needing flexible arrangements.",
      icon: <Calendar className="text-primary" size={20} />
    }
  ];

  const propertyOwnerBenefits = [
    {
      number: 1,
      title: "Reduce administrative workload by 50%+",
      description: "Automate repetitive tasks and focus on growing your property portfolio"
    },
    {
      number: 2,
      title: "Improve tenant retention",
      description: "Build stronger relationships through transparent communication"
    },
    {
      number: 3,
      title: "Minimize downtime with proactive maintenance",
      description: "Identify and address issues before they become expensive problems"
    }
  ];

  const tenantBenefits = [
    {
      number: 1,
      title: "Simplified payments and requests",
      description: "Pay rent and submit maintenance requests from a single dashboard"
    },
    {
      number: 2,
      title: "Voice in community decisions",
      description: "Participate in discussions and contribute to building improvements"
    },
    {
      number: 3,
      title: "Enhanced security and convenience",
      description: "Secure communication and digital records of all interactions"
    }
  ];

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

        {/* Feature Tabs */}
        <Tabs defaultValue="rent" className="w-full mb-16" onValueChange={setActiveFeature}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="rent" className="flex items-center justify-center gap-2 py-3">
              <BadgeDollarSign size={18} />
              <span>Rent Management</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center justify-center gap-2 py-3">
              <Wrench size={18} />
              <span>Maintenance</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center justify-center gap-2 py-3">
              <Users size={18} />
              <span>Tenant Community</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center gap-2 py-3">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Rent Management Content */}
          <TabsContent value="rent" className="p-0">
            <RentManagementTab 
              features={rentFeatures} 
              onOpenDialog={() => setIsDialogOpen(true)} 
            />
          </TabsContent>

          {/* Placeholder content for other tabs */}
          <TabsContent value="maintenance">
            <PlaceholderTab 
              icon={Wrench} 
              title="Maintenance Management" 
              description="Coming soon! Track and manage property maintenance with ease." 
            />
          </TabsContent>

          <TabsContent value="community">
            <PlaceholderTab 
              icon={Users} 
              title="Tenant Community Hub" 
              description="Coming soon! Build stronger relationships with your tenants." 
            />
          </TabsContent>

          <TabsContent value="analytics">
            <PlaceholderTab 
              icon={BarChart3} 
              title="Analytics Dashboard" 
              description="Coming soon! Get insights into your property performance." 
            />
          </TabsContent>
        </Tabs>

        {/* Benefit Columns */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <BenefitColumn 
            title={<><Building2 className="text-primary" /> For Property Owners</>} 
            items={propertyOwnerBenefits} 
          />
          <BenefitColumn 
            title={<><Users className="text-primary" /> For Tenants</>} 
            items={tenantBenefits} 
          />
        </div>

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
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to transform your property management?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you manage a single unit or a large complex, e-Caretaker scales to meet your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Schedule a Demo</Button>
            <Button variant="outline" size="lg">View Pricing</Button>
          </div>
        </div>

        {/* Feature Demo Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <FeatureDialog 
            features={rentFeatures} 
            onClose={() => setIsDialogOpen(false)} 
          />
        </Dialog>
      </div>
    </section>
  );
};

export default ECaretakerSection;
