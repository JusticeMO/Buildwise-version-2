
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/shared/Button';
import { Building, CheckCircle2, ShieldCheck, BadgeCheck, Calendar, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Pricing plan type
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  recommended?: boolean;
}

const VendorApplication = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'contractor', // Default value
    specialization: '',
    aboutBusiness: '',
  });
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedYears, setSelectedYears] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  // Pricing plans
  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic Listing',
      description: 'Get started with a simple listing to establish your presence',
      monthlyPrice: 4999,
      yearlyPrice: 49990,
      features: [
        'Business profile page',
        'Contact information display',
        'Basic analytics',
        'Appear in search results',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Enhanced visibility and features for growing businesses',
      monthlyPrice: 9999,
      yearlyPrice: 99990,
      features: [
        'All Basic features',
        'Featured in category listings',
        'Portfolio showcase (up to 10 projects)',
        'Verified badge',
        'Priority customer support',
      ],
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Maximum exposure and exclusive features for established businesses',
      monthlyPrice: 19999,
      yearlyPrice: 199990,
      features: [
        'All Professional features',
        'Featured on homepage',
        'Unlimited portfolio projects',
        'Customer review management',
        'Monthly performance reports',
        'Direct quote requests',
      ],
    },
  ];

  // Calculate total price based on plan, billing period and years
  const calculateTotalPrice = (plan: PricingPlan) => {
    const basePrice = billingPeriod === 'monthly' 
      ? plan.monthlyPrice * 12 * selectedYears
      : plan.yearlyPrice * selectedYears;
    
    // Apply discount based on commitment years
    let discount = 0;
    if (selectedYears === 2) discount = 0.1; // 10% discount for 2 years
    if (selectedYears === 3) discount = 0.2; // 20% discount for 3 years
    
    return basePrice * (1 - discount);
  };

  // Format price to KES
  const formatPrice = (price: number) => {
    const formattedPrice = (price / 100).toLocaleString('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    });
    return formattedPrice;
  };

  // Monthly savings calculation
  const calculateMonthlySavings = (plan: PricingPlan) => {
    const monthlyTotal = plan.monthlyPrice * 12 * selectedYears;
    const actualTotal = calculateTotalPrice(plan);
    return formatPrice((monthlyTotal - actualTotal) / (12 * selectedYears));
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPlanDialogOpen(true);
  };

  // Handle plan selection
  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPlanDialogOpen(false);
    
    // Show confirmation toast
    toast({
      title: "Application submitted!",
      description: `Your ${plan.name} plan application has been received. We'll contact you soon!`,
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      businessType: 'contractor',
      specialization: '',
      aboutBusiness: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Grow Your Business with BuildWise</h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
                Join Kenya's leading construction marketplace and connect with thousands of potential clients
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Pricing
                </Button>
              </div>
              <div className="p-4 bg-secondary rounded-lg inline-block animate-fade-in">
                <p className="font-medium text-sm">
                  <BadgeCheck className="inline-block mr-2 text-primary" size={18} />
                  Over 500+ vendors already trust BuildWise
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Partner with BuildWise?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Targeted Exposure</h3>
                <p className="text-muted-foreground">Connect with clients actively looking for your specific services in the construction industry.</p>
              </div>
              
              <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Status</h3>
                <p className="text-muted-foreground">Gain client trust with our verification badge, showing you're a vetted and reliable service provider.</p>
              </div>
              
              <div className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Connections</h3>
                <p className="text-muted-foreground">Receive direct quote requests and inquiries from qualified clients ready to start projects.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground">Choose the plan that fits your business needs and growth goals</p>
              
              <div className="flex justify-center items-center mt-8 mb-8 space-x-4">
                <span className={`font-medium ${billingPeriod === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    billingPeriod === 'yearly' ? 'bg-primary' : 'bg-input'
                  }`}
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-background transition-transform ${
                      billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`font-medium ${billingPeriod === 'yearly' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Yearly <span className="text-xs text-emerald-500 ml-1">Save 15%</span>
                </span>
              </div>
              
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setSelectedYears(1)}
                  className={`px-4 py-2 rounded-md ${selectedYears === 1 ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  1 Year
                </button>
                <button
                  onClick={() => setSelectedYears(2)}
                  className={`px-4 py-2 rounded-md ${selectedYears === 2 ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  2 Years <span className="text-xs text-emerald-500 ml-1">10% off</span>
                </button>
                <button
                  onClick={() => setSelectedYears(3)}
                  className={`px-4 py-2 rounded-md ${selectedYears === 3 ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
                >
                  3 Years <span className="text-xs text-emerald-500 ml-1">20% off</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`flex flex-col justify-between relative rounded-lg border ${
                    plan.recommended 
                      ? 'border-primary shadow-lg' 
                      : 'border-border shadow-sm'
                  } p-6 bg-card`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-bold">
                        {formatPrice(billingPeriod === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12))}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                      
                      {billingPeriod === 'yearly' && (
                        <div className="text-sm text-emerald-600 mt-1">
                          Save {calculateMonthlySavings(plan)}/month
                        </div>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="text-primary mr-2 shrink-0 mt-1" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    variant={plan.recommended ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Form Section */}
        <section id="application-form" className="py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Apply to Join BuildWise</h2>
              
              <div className="bg-card rounded-lg border p-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name *</label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium mb-2">Contact Person *</label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required
                        placeholder="Full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="businessType" className="block text-sm font-medium mb-2">Business Type *</label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="contractor">Contractor</option>
                        <option value="supplier">Supplier / Vendor</option>
                        <option value="consultant">Consultant</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium mb-2">Specialization *</label>
                      <Input
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Plumbing, Flooring, Architecture"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="aboutBusiness" className="block text-sm font-medium mb-2">Tell us about your business *</label>
                    <Textarea
                      id="aboutBusiness"
                      name="aboutBusiness"
                      value={formData.aboutBusiness}
                      onChange={handleInputChange}
                      required
                      placeholder="Share details about your services, experience, and why clients choose you"
                      rows={5}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" size="lg">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">How does the verification process work?</h3>
                <p className="text-muted-foreground">Our team will review your application and verify your business credentials, including business registration, past projects, and client feedback. The process typically takes 3-5 business days.</p>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll only pay the difference. When downgrading, the new rate will apply at your next billing cycle.</p>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">How do I receive client inquiries?</h3>
                <p className="text-muted-foreground">Clients can contact you directly through our platform. You'll receive notifications via email and SMS, and can manage all inquiries through your BuildWise dashboard.</p>
              </div>
              
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept M-Pesa, bank transfers, and major credit/debit cards. All payments are processed securely through our payment partners.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Plan Selection Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Your Plan</DialogTitle>
            <DialogDescription>
              Select the plan that best suits your business needs
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {pricingPlans.map((plan) => (
              <button
                key={plan.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  plan.recommended ? 'border-primary' : 'border-border'
                } hover:bg-accent transition-colors`}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{plan.name}</span>
                  <span className="text-sm text-muted-foreground">{formatPrice(billingPeriod === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12))}/month</span>
                </div>
                <div className="flex items-center space-x-2">
                  {billingPeriod === 'yearly' && (
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Save 15%</span>
                  )}
                  <Calendar className="text-muted-foreground" size={16} />
                  <span className="text-sm">{selectedYears} {selectedYears === 1 ? 'year' : 'years'}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <CreditCard size={16} className="mr-2" />
              You'll be contacted to complete the payment after your application is approved
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default VendorApplication;
