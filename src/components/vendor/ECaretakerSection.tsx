
import React, { useState } from 'react';
import { Building2, BadgeDollarSign, Wrench, Users, BarChart3, Bell, CreditCard, PieChart, FileText, Calendar, PhoneCall, Mail, Smartphone, BarChart4, CheckCircle, Clock, Receipt, CalendarClock, Landmark, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog } from '@/components/ui/dialog';
import Button from '@/components/shared/Button';
import BenefitColumn from './BenefitColumn';
import RentManagementTab from './RentManagementTab';
import PlaceholderTab from './PlaceholderTab';
import DashboardPreview from './DashboardPreview';
import FeatureDialog from './FeatureDialog';
import PropertyRegistrationForm from './PropertyRegistrationForm';

const ECaretakerSection = () => {
  const [activeFeature, setActiveFeature] = useState('rent');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const rentFeatures = [
    {
      title: "Automated Reminders",
      description: "Customizable rent reminders sent via SMS, email, or app notifications to reduce late payments.",
      icon: <Bell className="text-primary" size={20} />,
      details: [
        {
          subTitle: "Multi-Channel Notifications",
          description: "Reach tenants through their preferred communication channels for maximum effectiveness.",
          icon: <PhoneCall className="text-primary" size={20} />,
          benefits: [
            "SMS alerts for immediate attention",
            "Email notifications with payment details and history",
            "Push notifications through the tenant mobile app",
            "WhatsApp integration for convenient reminders"
          ]
        },
        {
          subTitle: "Smart Scheduling",
          description: "Intelligent reminder system that adapts to tenant behavior.",
          icon: <Calendar className="text-primary" size={20} />,
          benefits: [
            "Customizable reminder frequency (weekly, 3-days, 1-day before due date)",
            "Follow-up reminders for overdue payments",
            "Time-zone aware scheduling for international property owners",
            "Seasonal payment schedule adjustments"
          ]
        },
        {
          subTitle: "Personalization Options",
          description: "Tailor reminders to build better landlord-tenant relationships.",
          icon: <Mail className="text-primary" size={20} />,
          benefits: [
            "Custom messaging templates with property branding",
            "Personalized greeting and tenant name",
            "Include specific payment instructions and options",
            "Multilingual support for diverse tenant communities"
          ]
        }
      ]
    },
    {
      title: "Flexible Payment Options",
      description: "Accept M-Pesa, bank transfers, cards, and more with automatic reconciliation.",
      icon: <CreditCard className="text-primary" size={20} />,
      details: [
        {
          subTitle: "Mobile Money Integration",
          description: "Seamless integration with Kenya's most popular payment platforms.",
          icon: <Phone className="text-primary" size={20} />,
          benefits: [
            "M-Pesa direct integration with payment tracking",
            "Airtel Money support for broader coverage",
            "Automatic payment confirmation via SMS",
            "Unique payment reference codes for each transaction"
          ]
        },
        {
          subTitle: "Traditional Banking Options",
          description: "Support for conventional banking methods with automated tracking.",
          icon: <Landmark className="text-primary" size={20} />,
          benefits: [
            "Direct bank transfer tracking through bank APIs",
            "Manual bank deposit recording and verification",
            "Standing order and direct debit setup assistance",
            "Multi-currency support for international property owners"
          ]
        },
        {
          subTitle: "Card Payments",
          description: "Modern card payment solutions for tech-savvy tenants.",
          icon: <CreditCard className="text-primary" size={20} />,
          benefits: [
            "Credit and debit card processing with major networks",
            "Recurring payment setup for hassle-free rent collection",
            "Secure payment gateway with PCI compliance",
            "Instant payment confirmation and receipt generation"
          ]
        }
      ]
    },
    {
      title: "Payment Tracking",
      description: "Real-time dashboard showing paid, pending, and overdue rent payments across all units.",
      icon: <PieChart className="text-primary" size={20} />,
      details: [
        {
          subTitle: "Real-Time Analytics",
          description: "Comprehensive payment tracking across your entire property portfolio.",
          icon: <BarChart4 className="text-primary" size={20} />,
          benefits: [
            "Live payment status updates as payments are processed",
            "Property-level and unit-level payment reports",
            "Payment trend analysis and forecasting",
            "Custom dashboards for property managers and owners"
          ]
        },
        {
          subTitle: "Payment Status Management",
          description: "Clear categorization and management of all payment statuses.",
          icon: <CheckCircle className="text-primary" size={20} />,
          benefits: [
            "Color-coded payment status indicators (paid, pending, overdue)",
            "Automated status updates based on payment verification",
            "Payment history archiving and retrieval",
            "Dispute flagging and resolution tracking"
          ]
        },
        {
          subTitle: "Landlord Notifications",
          description: "Stay informed about your rental income without constant monitoring.",
          icon: <Clock className="text-primary" size={20} />,
          benefits: [
            "Daily payment summaries via email or SMS",
            "Instant notifications for large payments",
            "Overdue payment alerts with suggested actions",
            "Monthly collection reports with financial analysis"
          ]
        }
      ]
    },
    {
      title: "Digital Receipts",
      description: "Automatic generation and distribution of rent receipts to tenants via email or SMS.",
      icon: <FileText className="text-primary" size={20} />,
      details: [
        {
          subTitle: "Automated Documentation",
          description: "Instantly generate professional receipts for every payment.",
          icon: <Receipt className="text-primary" size={20} />,
          benefits: [
            "Custom receipt templates with property branding",
            "Compliance with local tax and housing regulations",
            "Digital signatures for legal validity",
            "Payment history included on each receipt"
          ]
        },
        {
          subTitle: "Multi-Channel Delivery",
          description: "Ensure tenants always have access to their payment records.",
          icon: <Smartphone className="text-primary" size={20} />,
          benefits: [
            "Automatic email delivery with PDF attachments",
            "SMS with secure receipt download links",
            "In-app access to all historical receipts",
            "Option for scheduled monthly receipt summaries"
          ]
        },
        {
          subTitle: "Record Management",
          description: "Comprehensive record-keeping for landlords and tenants.",
          icon: <FileText className="text-primary" size={20} />,
          benefits: [
            "Centralized storage of all payment records",
            "Easy export for accounting and tax purposes",
            "Tenant portal with access to personal payment history",
            "Advanced search and filtering of payment records"
          ]
        }
      ]
    },
    {
      title: "Payment Plans",
      description: "Create custom payment plans for tenants needing flexible arrangements.",
      icon: <Calendar className="text-primary" size={20} />,
      details: [
        {
          subTitle: "Custom Scheduling",
          description: "Accommodate various tenant needs with flexible payment structures.",
          icon: <CalendarClock className="text-primary" size={20} />,
          benefits: [
            "Weekly, bi-weekly, or monthly payment cycles",
            "Split payment options for roommates or families",
            "Seasonal adjustments for businesses with cyclical income",
            "Deposit distribution across multiple months"
          ]
        },
        {
          subTitle: "Payment Restructuring",
          description: "Manage tenant financial hardships while protecting your income.",
          icon: <CreditCard className="text-primary" size={20} />,
          benefits: [
            "One-click payment plan creation for late payments",
            "Automated installment tracking and reminders",
            "Partial payment acceptance with balance tracking",
            "Late fee adjustments based on payment plan compliance"
          ]
        },
        {
          subTitle: "Documentation & Agreements",
          description: "Legally sound payment arrangements with clear terms.",
          icon: <FileText className="text-primary" size={20} />,
          benefits: [
            "Digital payment plan agreements with e-signatures",
            "Payment plan history for tenant reliability assessment",
            "Automatic payment plan expiration and renewal notices",
            "Integration with lease agreements and amendments"
          ]
        }
      ]
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

        {showRegistrationForm ? (
          <PropertyRegistrationForm />
        ) : (
          <>
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
                <Button size="lg" onClick={() => setShowRegistrationForm(true)}>Register Your Property</Button>
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
