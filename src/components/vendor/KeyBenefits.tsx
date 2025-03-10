
import React from 'react';
import { UserPlus, PanelLeft, BarChart } from 'lucide-react';

const KeyBenefits: React.FC = () => {
  const benefits = [
    {
      icon: <UserPlus className="h-6 w-6 text-primary" />,
      title: "Qualified Leads",
      description: "Connect with pre-qualified homeowners and businesses looking for your specific services."
    },
    {
      icon: <PanelLeft className="h-6 w-6 text-primary" />,
      title: "Professional Profile",
      description: "Showcase your portfolio, certifications, and past projects to potential clients."
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Growth Insights",
      description: "Access analytics and data to help grow your business strategically."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {benefits.map((benefit, i) => (
        <div key={i} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
            {benefit.icon}
          </div>
          <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
          <p className="text-muted-foreground">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyBenefits;
