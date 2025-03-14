
import React from 'react';
import { Building2, BadgeDollarSign, Wrench, Users, BarChart3, Shield, CreditCard, MessageSquare } from 'lucide-react';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';

const ECaretakerSection = () => {
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

        {/* Core Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: "Rent Management",
              description: "Automated rent reminders, customizable payment schedules, and secure transaction processing.",
              icon: <BadgeDollarSign className="h-6 w-6 text-primary" />,
              features: ["Automated reminders", "Secure payments", "Financial integration"]
            },
            {
              title: "Maintenance Coordination",
              description: "AI-driven alerts for routine repairs with direct access to verified professionals from our marketplace.",
              icon: <Wrench className="h-6 w-6 text-primary" />,
              features: ["Proactive alerts", "Verified professionals", "Repair tracking"]
            },
            {
              title: "Tenant Community Hub",
              description: "Moderated forum for tenants to communicate, resolve issues, and collaborate on building decisions.",
              icon: <Users className="h-6 w-6 text-primary" />,
              features: ["Community forums", "Transparent communication", "Building updates"]
            },
            {
              title: "Occupancy Analytics",
              description: "Real-time dashboards to track vacancy rates, lease statuses, and revenue trends for informed decisions.",
              icon: <BarChart3 className="h-6 w-6 text-primary" />,
              features: ["Real-time insights", "Customizable reports", "Revenue tracking"]
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="flex flex-col hover:shadow-md transition-shadow"
              padding="lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">{feature.description}</p>
              <ul className="space-y-2">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Shield size={16} className="text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

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
      </div>
    </section>
  );
};

export default ECaretakerSection;
