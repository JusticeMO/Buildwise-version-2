import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VendorHeroSection from '@/components/vendor/VendorHeroSection';
import VendorApplicationForm from '@/components/vendor/VendorApplicationForm';
import PlanSelectionDialog from '@/components/vendor/PlanSelectionDialog';

// Pricing plan type
import { PricingPlan } from '@/types/vendor';
import PricingTiersSection from '@/components/vendor/PricingTiersSection';
import KeyBenefits from '@/components/vendor/KeyBenefits';
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
        <VendorHeroSection />
        
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
        <VendorApplicationForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        
        {/* FAQ Section */}
        <FAQSection />
      </main>
      
      {/* Plan Selection Dialog */}
      <PlanSelectionDialog
        isOpen={isPlanDialogOpen}
        onOpenChange={setIsPlanDialogOpen}
        businessType={formData.businessType}
        pricingPlans={pricingPlans}
        billingPeriod={billingPeriod}
        selectedYears={selectedYears}
        formatPrice={formatPrice}
        onPlanSelect={handlePlanSelect}
      />
      
      <Footer />
    </div>
  );
};

export default VendorApplication;
