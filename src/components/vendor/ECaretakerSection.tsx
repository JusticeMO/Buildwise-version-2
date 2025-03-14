import React, { useState } from 'react';
import { Building2, BadgeDollarSign, Wrench, Users, BarChart3, Shield, CreditCard, MessageSquare, Calendar, Bell, FileText, ChevronRight, PieChart, CheckCircle } from 'lucide-react';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Streamlined Rent Collection & Management</h3>
                <p className="text-muted-foreground mb-6">
                  Our comprehensive rent management system eliminates payment headaches with automated reminders, flexible payment options, and real-time tracking—all accessible from any device.
                </p>
                
                <ul className="space-y-4 mb-6">
                  {rentFeatures.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <div className="mt-1">{feature.icon}</div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                  <Button size="lg" className="mt-4">
                    Explore Rent Management
                    <ChevronRight size={16} />
                  </Button>
                </DialogTrigger>
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
          </TabsContent>

          {/* Placeholder content for other tabs */}
          <TabsContent value="maintenance">
            <div className="text-center py-12">
              <Wrench size={48} className="mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Maintenance Management</h3>
              <p className="text-muted-foreground">Coming soon! Track and manage property maintenance with ease.</p>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Tenant Community Hub</h3>
              <p className="text-muted-foreground">Coming soon! Build stronger relationships with your tenants.</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">Coming soon! Get insights into your property performance.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Benefit Columns */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="text-primary" />
              For Property Owners
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Reduce administrative workload by 50%+</h4>
                  <p className="text-muted-foreground">Automate repetitive tasks and focus on growing your property portfolio</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Improve tenant retention</h4>
                  <p className="text-muted-foreground">Build stronger relationships through transparent communication</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Minimize downtime with proactive maintenance</h4>
                  <p className="text-muted-foreground">Identify and address issues before they become expensive problems</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Users className="text-primary" />
              For Tenants
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Simplified payments and requests</h4>
                  <p className="text-muted-foreground">Pay rent and submit maintenance requests from a single dashboard</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Voice in community decisions</h4>
                  <p className="text-muted-foreground">Participate in discussions and contribute to building improvements</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Enhanced security and convenience</h4>
                  <p className="text-muted-foreground">Secure communication and digital records of all interactions</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Dashboard Preview */}
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
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Rent Management Features</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Key Features:</h4>
                <div className="grid gap-4">
                  {rentFeatures.map((feature, idx) => (
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
              <Button onClick={() => setIsDialogOpen(false)}>
                Close Preview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ECaretakerSection;
