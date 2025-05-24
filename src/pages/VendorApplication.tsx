import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/shared/Button';
import { BadgeCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Pricing plan type
import { PricingPlan } from '@/types/vendor';
import PricingTiersSection from '@/components/vendor/PricingTiersSection';
import KeyBenefits from '@/components/vendor/KeyBenefits';
import BillingOptions from '@/components/vendor/BillingOptions';
import FAQSection from '@/components/vendor/FAQSection';
import ECaretakerSection from '@/components/vendor/ECaretakerSection';

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

  // Updated pricing plans with architect plans
  const pricingPlans: PricingPlan[] = [
    // Contractor plans
    {
      id: 'contractor-basic',
      name: 'Basic Listing',
      description: 'Get started with a simple listing to establish your presence',
      monthlyPrice: 5000,
      yearlyPrice: 50000,
      features: [
        'Business profile page',
        'Contact information display',
        'Basic analytics',
        'Appear in search results',
      ],
      vendorType: 'contractor'
    },
    {
      id: 'contractor-professional',
      name: 'Professional',
      description: 'Enhanced visibility and features for growing businesses',
      monthlyPrice: 15000,
      yearlyPrice: 150000,
      features: [
        'All Basic features',
        'Featured in category listings',
        'Portfolio showcase (up to 10 projects)',
        'Verified badge',
        'Priority customer support',
      ],
      recommended: true,
      vendorType: 'contractor'
    },
    {
      id: 'contractor-premium',
      name: 'Premium',
      description: 'Maximum exposure and exclusive features for established businesses',
      monthlyPrice: 30000,
      yearlyPrice: 300000,
      features: [
        'All Professional features',
        'Featured on homepage',
        'Unlimited portfolio projects',
        'Customer review management',
        'Monthly performance reports',
        'Direct quote requests',
      ],
      vendorType: 'contractor'
    },
    // Supplier plans
    {
      id: 'supplier-basic',
      name: 'Basic Listing',
      description: 'Get started with a simple listing for your materials and supplies',
      monthlyPrice: 3000,
      yearlyPrice: 30000,
      features: [
        'Business profile page',
        'Products listing (up to 10 items)',
        'Basic analytics',
        'Appear in search results',
      ],
      vendorType: 'supplier'
    },
    {
      id: 'supplier-professional',
      name: 'Professional',
      description: 'Enhanced visibility for your supply business',
      monthlyPrice: 8000,
      yearlyPrice: 80000,
      features: [
        'All Basic features',
        'Featured in category listings',
        'Products listing (up to 50 items)',
        'Verified badge',
        'Priority customer support',
      ],
      recommended: true,
      vendorType: 'supplier'
    },
    {
      id: 'supplier-premium',
      name: 'Premium',
      description: 'Maximum exposure for established material suppliers',
      monthlyPrice: 20000,
      yearlyPrice: 200000,
      features: [
        'All Professional features',
        'Featured on homepage',
        'Unlimited product listings',
        'Customer review management',
        'Monthly performance reports',
        'Priority in search results',
      ],
      vendorType: 'supplier'
    },
    // Consultant plans
    {
      id: 'consultant-basic',
      name: 'Basic Listing',
      description: 'Get started with a simple listing for your consulting services',
      monthlyPrice: 4000,
      yearlyPrice: 40000,
      features: [
        'Professional profile page',
        'Service listing (up to 5 services)',
        'Basic analytics',
        'Appear in search results',
      ],
      vendorType: 'consultant'
    },
    {
      id: 'consultant-professional',
      name: 'Professional',
      description: 'Enhanced visibility for your consulting business',
      monthlyPrice: 10000,
      yearlyPrice: 100000,
      features: [
        'All Basic features',
        'Featured in category listings',
        'Detailed portfolio showcase',
        'Verified expert badge',
        'Priority customer support',
      ],
      recommended: true,
      vendorType: 'consultant'
    },
    {
      id: 'consultant-premium',
      name: 'Premium',
      description: 'Maximum exposure for established consultants',
      monthlyPrice: 25000,
      yearlyPrice: 250000,
      features: [
        'All Professional features',
        'Featured on homepage',
        'Expert contributor status',
        'Customer review management',
        'Monthly performance reports',
        'Direct consultation requests',
      ],
      vendorType: 'consultant'
    },
    // Architect plans
    {
      id: 'architect-basic',
      name: 'Basic Listing',
      description: 'Get started with a simple listing for your architectural services',
      monthlyPrice: 6000,
      yearlyPrice: 60000,
      features: [
        'Professional profile page',
        'Project portfolio (up to 5 projects)',
        'Basic analytics',
        'Appear in search results',
      ],
      vendorType: 'architect'
    },
    {
      id: 'architect-professional',
      name: 'Professional',
      description: 'Enhanced visibility for your architectural practice',
      monthlyPrice: 18000,
      yearlyPrice: 180000,
      features: [
        'All Basic features',
        'Featured in category listings',
        'Detailed project showcase (up to 20 projects)',
        'Verified architect badge',
        'Priority customer support',
        'CAD file sharing capability',
      ],
      recommended: true,
      vendorType: 'architect'
    },
    {
      id: 'architect-premium',
      name: 'Premium',
      description: 'Maximum exposure for established architectural firms',
      monthlyPrice: 35000,
      yearlyPrice: 350000,
      features: [
        'All Professional features',
        'Featured on homepage',
        'Unlimited project showcase',
        'Client review management',
        'Monthly performance reports',
        'Direct project requests',
        '3D visualization tools',
      ],
      vendorType: 'architect'
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
    const formattedPrice = price.toLocaleString('en-KE', {
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

  // Filter plans based on selected business type
  const getFilteredPlans = () => {
    if (isPlanDialogOpen) {
      return pricingPlans.filter(
        plan => plan.vendorType === formData.businessType
      );
    }
    return pricingPlans;
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
        <KeyBenefits />
        
        {/* E-Caretaker Section */}
        <ECaretakerSection />
        
        {/* Pricing Section */}
        <PricingTiersSection 
          pricingPlans={pricingPlans}
          billingPeriod={billingPeriod}
          setBillingPeriod={setBillingPeriod}
          selectedYears={selectedYears}
          setSelectedYears={setSelectedYears}
          formatPrice={formatPrice}
          calculateMonthlySavings={calculateMonthlySavings}
        />
        
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
                        <option value="architect">Architect</option>
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
        <FAQSection />
      </main>
      
      {/* Plan Selection Dialog */}
      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Your Plan</DialogTitle>
            <DialogDescription>
              Select the plan that best suits your {formData.businessType} business
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {getFilteredPlans().filter(plan => plan.vendorType === formData.businessType).map((plan) => {
              // Calculate discounted price
              const basePrice = billingPeriod === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice / 12);
              let discount = 0;
              if (selectedYears === 2) discount = 0.1;
              if (selectedYears === 3) discount = 0.2;
              const discountedPrice = basePrice * (1 - discount);
              
              return (
                <button
                  key={plan.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    plan.recommended ? 'border-primary' : 'border-border'
                  } hover:bg-accent transition-colors`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{plan.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(discountedPrice)}/month
                    </span>
                    {discount > 0 && (
                      <span className="text-xs text-emerald-600">
                        {Math.round(discount * 100)}% discount applied
                      </span>
                    )}
                  </div>
                  <BillingOptions billingPeriod={billingPeriod} selectedYears={selectedYears} />
                </button>
              );
            })}
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
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
