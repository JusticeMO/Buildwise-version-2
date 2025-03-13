
import React from 'react';
import { Building2, BadgeDollarSign, Users, BarChart3 } from 'lucide-react';

const KeyBenefits = () => {
  const benefits = [
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: 'Enhanced Visibility',
      description: 'Get discovered by thousands of potential customers looking for construction services in Kenya.'
    },
    {
      icon: <BadgeDollarSign className="h-10 w-10 text-primary" />,
      title: 'Increased Revenue',
      description: 'Vendors on BuildWise report an average 30% growth in business within their first year.'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Quality Leads',
      description: 'Connect with serious clients who are actively searching for your specific services.'
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: 'Business Insights',
      description: 'Access analytics and reports to understand customer behavior and optimize your offerings.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Join BuildWise?</h2>
          <p className="text-muted-foreground">Partner with Kenya's premier construction marketplace and grow your business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
