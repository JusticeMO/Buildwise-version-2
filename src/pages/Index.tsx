
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeatureSection from '@/components/Home/FeatureSection';
import TestimonialSection from '@/components/Home/TestimonialSection';
import Button from '@/components/shared/Button';
import { ArrowRight, DollarSign, Shield, Briefcase, CreditCard, ExternalLink, Building2 as Building2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Index = () => {
  const bankAgents = [
    { name: "Kenya Commercial Bank", url: "https://ke.kcbgroup.com/mortgage-loans" },
    { name: "Equity Bank", url: "https://equitygroupholdings.com/ke/borrow/equity-mortgages" },
    { name: "Cooperative Bank", url: "https://www.co-opbank.co.ke/personal-banking/borrowing/mortgages/" },
    { name: "Absa Kenya", url: "https://www.absabank.co.ke/personal/borrow/home-loans/" },
    { name: "DTB Bank", url: "https://dtbk.dtbafrica.com/personal-banking/loans-financing/mortgage/" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        {/* Financing Options Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                Financing Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Access Affordable Construction Financing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've partnered with trusted financial institutions to help you fund your construction project back home.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "Construction Loans",
                  description: "Specialized loans for new construction with flexible payment terms tailored to project milestones.",
                  icon: <Building2Icon className="text-primary" size={24} />,
                  features: ["Up to KES 20M", "Terms up to 15 years", "Competitive interest rates"]
                },
                {
                  title: "Diaspora Mortgages",
                  description: "Mortgage options specifically designed for Kenyans living abroad investing in property back home.",
                  icon: <DollarSign className="text-primary" size={24} />,
                  features: ["100% financing available", "Foreign income accepted", "USD/GBP/EUR payment options"]
                },
                {
                  title: "Renovation Financing",
                  description: "Smaller loan amounts for upgrades, renovations, and finishing of existing properties.",
                  icon: <CreditCard className="text-primary" size={24} />,
                  features: ["Quick approval", "No collateral options", "Flexible repayment plans"]
                }
              ].map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-muted-foreground mb-4">{option.description}</p>
                    <ul className="space-y-2 mb-4">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Shield size={16} className="text-kenya-green" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      icon={<ExternalLink size={16} />}
                      iconPosition="right"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    icon={<Briefcase size={18} />}
                    iconPosition="left"
                  >
                    Apply for Financing
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-white w-56">
                  {bankAgents.map((bank, index) => (
                    <DropdownMenuItem key={index} asChild className="cursor-pointer">
                      <a href={bank.url} target="_blank" rel="noopener noreferrer" className="w-full">
                        {bank.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>
        
        <TestimonialSection />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-kenya-red/10 to-kenya-green/10">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in">
                Ready to build your dream project with confidence?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Join thousands of diaspora who are successfully managing construction 
                projects back home in Kenya with complete transparency and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Link to="/projects/create">
                  <Button 
                    size="lg"
                    className="group"
                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                    iconPosition="right"
                  >
                    Get started for free
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Book a demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
