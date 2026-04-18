
import React from 'react';
import Card from '../shared/Card';
import { cn } from '@/lib/utils';
import {
  Shield,
  Clock,
  CreditCard,
  UserCheck,
  LineChart,
  Camera,
  BookOpen,
  Layers,
  Building2,
  PieChart
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className, delay = 0 }) => (
  <Card
    variant="outline"
    className={cn(
      'hover:border-primary/20 hover:shadow-md smooth-transition overflow-hidden group',
      'opacity-0 animate-slide-up',
      className
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-6">
      <div className="p-3 bg-primary/10 text-primary rounded-lg inline-block mb-4 group-hover:scale-110 smooth-transition">
        {icon}
      </div>
      <h3 className="font-medium text-xl mb-2 group-hover:text-primary smooth-transition">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </Card>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <Shield size={24} />,
      title: "Secure Escrow Payments",
      description: "Your funds are secured in escrow and only released when project milestones are verified and approved."
    },
    {
      icon: <UserCheck size={24} />,
      title: "Verified Contractors",
      description: "Work with pre-vetted contractors and professionals who have proven track records and verified credentials."
    },
    {
      icon: <Clock size={24} />,
      title: "Real-time Progress Tracking",
      description: "Monitor your project's progress in real-time with regular updates, photos, and milestone tracking."
    },
    {
      icon: <LineChart size={24} />,
      title: "AI Cost Estimation",
      description: "Get accurate cost estimates for your construction project using our AI-powered pricing model."
    },
    {
      icon: <Camera size={24} />,
      title: "Visual Verification",
      description: "Receive regular photo and video updates of your project to verify progress and quality of work."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Milestone-based Payments",
      description: "Release payments only when predefined project milestones are completed and verified by inspectors."
    },
    {
      icon: <PieChart size={24} />,
      title: "Land Owner Equity",
      description: "Turn your land into long-term equity. Build, manage, and grow your real estate portfolio with full transparency."
    },
    {
      icon: <Layers size={24} />,
      title: "Material Sourcing",
      description: "Source quality construction materials at competitive prices through our network of verified suppliers."
    },
    {
      icon: <Building2 size={24} />,
      title: "Rental Property Management",
      description: "Manage tenants, collect rent via M-Pesa, handle maintenance requests, and grow your property portfolio — all from one institutional-grade landlord dashboard."
    }
  ];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in">
            Every feature you need to build with confidence
          </h2>
          <p className="text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Our platform provides all the tools you need to manage your construction project
            remotely with complete transparency and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
