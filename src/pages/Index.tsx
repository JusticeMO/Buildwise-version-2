
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeatureSection from '@/components/Home/FeatureSection';
import TestimonialSection from '@/components/Home/TestimonialSection';
import Button from '@/components/shared/Button';
import { ArrowRight, DollarSign, Shield, Briefcase, CreditCard, ExternalLink, Building2 as Building2Icon, Wrench, HardHat, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  const ncaConstructors = [
    { 
      name: "Elite Builders Kenya", 
      specialty: "High-rise commercial buildings",
      rating: 4.9,
      certification: "NCA-1",
      imageUrl: "/placeholder.svg"
    },
    { 
      name: "Fedha Construction Ltd", 
      specialty: "Residential complexes",
      rating: 4.8,
      certification: "NCA-2",
      imageUrl: "/placeholder.svg"
    },
    { 
      name: "Mwananchi Developers", 
      specialty: "Government infrastructure",
      rating: 4.7,
      certification: "NCA-1",
      imageUrl: "/placeholder.svg"
    },
    { 
      name: "Green Heights Contractors", 
      specialty: "Eco-friendly construction",
      rating: 4.8,
      certification: "NCA-3",
      imageUrl: "/placeholder.svg"
    },
    { 
      name: "Simba Master Builders", 
      specialty: "Industrial facilities",
      rating: 4.6,
      certification: "NCA-2",
      imageUrl: "/placeholder.svg"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        
        {/* NCA Certified Constructors Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                Verified Construction Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">NCA Certified Constructors</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We partner exclusively with licensed contractors certified by the National Construction Authority of Kenya, ensuring quality, reliability, and adherence to building codes.
              </p>
            </div>
            
            {/* NCA Certification Explanation */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <HardHat className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2">Why NCA Certification Matters</h3>
                  <p className="mb-4 text-muted-foreground">
                    The National Construction Authority (NCA) regulates and streamlines Kenya's construction industry. Their classification system (NCA-1 to NCA-8) ranks contractors based on technical capability, financial strength, experience, and equipment ownership.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <Shield className="text-kenya-green flex-shrink-0 mt-1" size={18} />
                      <span className="text-sm">Higher certification (NCA-1) indicates ability to handle complex, higher-value projects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="text-kenya-green flex-shrink-0 mt-1" size={18} />
                      <span className="text-sm">Regular audits ensure continued compliance with quality standards</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="text-kenya-green flex-shrink-0 mt-1" size={18} />
                      <span className="text-sm">All registered contractors undergo mandatory skills training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured NCA Constructors */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {ncaConstructors.slice(0, 3).map((constructor, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={constructor.imageUrl} 
                        alt={constructor.name} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      {constructor.certification}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{constructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Construction size={16} className="text-kenya-green" />
                        {constructor.specialty}
                      </span>
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill={i < Math.floor(constructor.rating) ? "gold" : "none"} 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-amber-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="text-sm ml-1">{constructor.rating.toFixed(1)}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      icon={<Wrench size={16} />}
                      iconPosition="left"
                    >
                      View Projects
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Link to="/contractors">
                <Button
                  size="lg"
                  icon={<Briefcase size={18} />}
                  iconPosition="left"
                >
                  Browse All Certified Contractors
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Financing Options Section */}
        <section className="py-20 bg-white">
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
              <Link to="/financing">
                <Button
                  size="lg"
                  icon={<Briefcase size={18} />}
                  iconPosition="left"
                >
                  Apply for Financing
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <TestimonialSection />
        
        {/* Land Owner Equity Section — Section 9 */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  For Property Investors & Landowners
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Turn Your Land Into<br />
                  <span className="text-amber-400">Long-Term Equity</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  JengaSafe bridges the gap between landowners and the rental economy. Whether you own 
                  a single plot or a portfolio of properties, our platform helps you build, manage, and 
                  grow your real estate equity with full transparency and institutional-grade tools.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { title: 'Build-to-Rent Pipeline', desc: 'Finance and construct rental-ready units with verified NCA contractors, tracked milestone by milestone.' },
                    { title: 'Smart Tenant Matching', desc: 'List vacant units on our marketplace and receive pre-vetted tenant applications instantly.' },
                    { title: 'Full Rent Collection', desc: 'Automate rent collection via M-Pesa, track payments, and generate landlord reports in real time.' },
                    { title: 'Maintenance Ecosystem', desc: 'Assign rated service providers to tenant requests directly from your dashboard — no middlemen.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield size={14} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link to="/landlord/login">
                    <Button 
                      size="lg" 
                      className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                      icon={<ArrowRight size={18} />}
                      iconPosition="right"
                    >
                      Landlord Portal
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-700">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gray-700/40 rounded-2xl p-8 border border-gray-700 space-y-6">
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Landlord Dashboard Preview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <p className="text-xs text-gray-400">Monthly Revenue</p>
                      <p className="text-2xl font-bold mt-1">KES 425K</p>
                      <p className="text-xs text-green-400 mt-1">+12% this month</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <p className="text-xs text-gray-400">Occupancy Rate</p>
                      <p className="text-2xl font-bold mt-1">85%</p>
                      <p className="text-xs text-green-400 mt-1">17/20 units</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <p className="text-xs text-gray-400">Active Tenants</p>
                      <p className="text-2xl font-bold mt-1">50</p>
                      <p className="text-xs text-gray-400 mt-1">Across 2 properties</p>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <p className="text-xs text-gray-400">Maintenance SLA</p>
                      <p className="text-2xl font-bold mt-1">4.7★</p>
                      <p className="text-xs text-amber-400 mt-1">Provider avg. rating</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-xs text-gray-400 mb-2">Recent Activity</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Rent payment — John Doe</span><span className="text-green-400">+KES 25,000</span></div>
                      <div className="flex justify-between"><span>Maintenance assigned — Unit 5B</span><span className="text-amber-400">Plumber</span></div>
                      <div className="flex justify-between"><span>New tenant inquiry</span><span className="text-blue-400">Unit 5A</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
                <Link to="/projects/create" className="w-full sm:w-auto">
                  <Button 
                    size="lg"
                    className="group w-full sm:w-auto"
                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                    iconPosition="right"
                  >
                    Get started for free
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto"
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
