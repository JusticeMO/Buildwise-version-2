
import React from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  Check, 
  Shield, 
  BarChart, 
  UserPlus, 
  MessageSquare, 
  Image, 
  Clock, 
  PanelLeft, 
  ArrowRight,
  Star,
  AlertTriangle
} from 'lucide-react';

const PricingTier = ({ 
  name, 
  price, 
  yearlyPrice, 
  features, 
  isPopular = false, 
  billingCycle, 
  contractTerm,
  onSelectPlan
}) => {
  const calculatedPrice = billingCycle === 'monthly' ? price : yearlyPrice;
  const discountedPrice = calculatedPrice * (1 - (contractTerm - 1) * 0.05);

  return (
    <div className={cn(
      "border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow",
      isPopular ? "border-primary" : "border-muted",
    )}>
      {isPopular && (
        <div className="bg-primary text-primary-foreground py-2 text-center font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-medium mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold tracking-tight">
            KES {discountedPrice?.toFixed(0)}
          </span>
          <span className="text-muted-foreground">
            /{billingCycle === 'monthly' ? 'month' : 'year'}
          </span>
          {contractTerm > 1 && (
            <p className="text-xs text-green-600 mt-1">
              {contractTerm === 2 ? '5% discount' : '10% discount'} for {contractTerm}-year contract
            </p>
          )}
        </div>
        <ul className="mb-6 space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          className="w-full text-sm font-medium rounded-md py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onSelectPlan}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

const VendorApplication = () => {
  const [billingCycle, setBillingCycle] = React.useState('monthly');
  const [contractTerm, setContractTerm] = React.useState(1);
  const { isSignedIn, isLoaded } = useUser();

  const handleSelectPlan = (planName) => {
    if (!isSignedIn) {
      toast.error("Please sign in to select a plan", {
        description: "You need to create an account or sign in before continuing.",
        action: {
          label: "Sign In",
          onClick: () => document.getElementById('sign-in-button')?.click(),
        },
      });
      return;
    }
    
    toast.success(`Selected ${planName} plan`, {
      description: `You've selected the ${planName} plan with ${billingCycle} billing for ${contractTerm} year${contractTerm > 1 ? 's' : ''}.`,
    });
    
    // Here you would typically redirect to a checkout/payment page
    // For this example, we'll just log the selection
    console.log({
      plan: planName,
      billingCycle,
      contractTerm
    });
  };

  // Pricing tiers data
  const tiers = [
    {
      name: "Basic",
      price: 4900,
      yearlyPrice: 49000,
      features: [
        "Access to basic leads",
        "Standard profile features",
        "Up to 5 project listings"
      ]
    },
    {
      name: "Pro",
      price: 9900,
      yearlyPrice: 99000,
      features: [
        "Access to premium leads",
        "Enhanced profile features",
        "Unlimited project listings",
        "Priority support"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: 19900,
      yearlyPrice: 199000,
      features: [
        "Exclusive leads",
        "Custom profile features",
        "Unlimited project listings",
        "Dedicated account manager",
        "Advanced analytics"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Grow Your Business with BuildWise
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Kenya's premier platform connecting construction professionals with clients seeking quality services.
            </p>
          </div>
          
          {/* Authentication Check */}
          {!isSignedIn && isLoaded && (
            <div className="mb-12 max-w-md mx-auto border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-accent/30 p-4 border-b">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg">Create an account to apply</h3>
                    <p className="text-muted-foreground text-sm">
                      Sign up or log in to BuildWise to join as a vendor or contractor.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6" id="sign-in-button">
                <SignIn redirectUrl="/vendor-application" />
              </div>
            </div>
          )}

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
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
            ].map((benefit, i) => (
              <div key={i} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          {/* Contract Terms Selection */}
          <div className="mb-8">
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl font-bold mb-6">Choose Your Membership Plan</h2>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-6 w-full max-w-md">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Billing Cycle</label>
                  <div className="flex rounded-lg overflow-hidden border">
                    <button
                      className={cn(
                        "flex-1 py-2 px-4 text-sm font-medium transition-colors",
                        billingCycle === 'monthly' 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => setBillingCycle('monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      className={cn(
                        "flex-1 py-2 px-4 text-sm font-medium transition-colors",
                        billingCycle === 'yearly' 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => setBillingCycle('yearly')}
                    >
                      Yearly
                    </button>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-xs text-green-600 mt-1">Save 16% with annual billing</p>
                  )}
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Contract Term</label>
                  <div className="flex rounded-lg overflow-hidden border">
                    {[1, 2, 3].map(term => (
                      <button
                        key={term}
                        className={cn(
                          "flex-1 py-2 px-4 text-sm font-medium transition-colors",
                          contractTerm === term 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                        )}
                        onClick={() => setContractTerm(term)}
                      >
                        {term} {term === 1 ? 'Year' : 'Years'}
                      </button>
                    ))}
                  </div>
                  {contractTerm > 1 && (
                    <p className="text-xs text-green-600 mt-1">
                      {contractTerm === 2 ? '5% discount' : '10% discount'} for {contractTerm}-year contract
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <PricingTier
                  key={tier.name}
                  {...tier}
                  billingCycle={billingCycle}
                  contractTerm={contractTerm}
                  onSelectPlan={() => handleSelectPlan(tier.name)}
                />
              ))}
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="mt-20 border-t pt-12">
            <h2 className="text-2xl font-bold text-center mb-10">
              Contractors & Suppliers Love BuildWise
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "BuildWise has transformed my business. I've seen a 40% increase in high-quality leads since joining the platform.",
                  author: "James Kamau",
                  role: "Interior Designer, Nairobi"
                },
                {
                  quote: "The verification process gives clients confidence in my services. I've closed more deals with less effort.",
                  author: "Sarah Omondi",
                  role: "General Contractor, Mombasa"
                },
                {
                  quote: "As a materials supplier, I've expanded my customer base beyond my local area to all across Kenya.",
                  author: "Daniel Kipchoge",
                  role: "Building Materials Supplier, Nakuru"
                }
              ].map((testimonial, i) => (
                <div key={i} className="border rounded-xl p-6 bg-secondary/30">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How do I get started as a vendor or contractor?",
                  answer: "Sign up for an account, select your membership plan, complete your business profile with certifications and portfolio items, and our team will verify your credentials within 48 hours."
                },
                {
                  question: "Can I cancel my subscription anytime?",
                  answer: "Yes, you can cancel your subscription at any time. For annual plans, we offer prorated refunds based on the remaining time on your contract."
                },
                {
                  question: "How does the lead generation work?",
                  answer: "When clients post projects that match your skills and location, you'll receive notifications. You can then submit quotes and proposals directly through our platform."
                },
                {
                  question: "What's the verification process like?",
                  answer: "We verify your business registration, professional certifications, and past work. This helps build trust with potential clients and gives you a competitive edge."
                }
              ].map((faq, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorApplication;
