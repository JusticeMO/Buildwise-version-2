
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Home, 
  Building2, 
  Warehouse, 
  Store, 
  Check,
  Upload,
  Lock,
  CreditCard,
  Users,
  ArrowRight,
  ThumbsUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const projectTypes: ProjectType[] = [
  {
    id: 'residential',
    name: 'Residential',
    icon: <Home size={24} />,
    description: 'Houses, apartments, and other residential buildings'
  },
  {
    id: 'commercial',
    name: 'Commercial',
    icon: <Building2 size={24} />,
    description: 'Office spaces, retail stores, and other commercial buildings'
  },
  {
    id: 'industrial',
    name: 'Industrial',
    icon: <Warehouse size={24} />,
    description: 'Factories, warehouses, and other industrial facilities'
  },
  {
    id: 'mixed',
    name: 'Mixed Use',
    icon: <Store size={24} />,
    description: 'Buildings with multiple purposes (e.g., residential and commercial)'
  }
];

const architecturalStyles = [
  { id: 'modern', name: 'Modern' },
  { id: 'contemporary', name: 'Contemporary' },
  { id: 'traditional', name: 'Traditional Kenyan' },
  { id: 'colonial', name: 'Colonial' },
  { id: 'minimalist', name: 'Minimalist' }
];

const specialRequirements = [
  { id: 'eco', name: 'Eco-friendly materials' },
  { id: 'solar', name: 'Solar power installation' },
  { id: 'accessibility', name: 'Accessibility features' },
  { id: 'security', name: 'Advanced security systems' },
  { id: 'water', name: 'Water harvesting system' }
];

const kenyanLocations = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Kileleshwa', 'Karen', 'Lavington', 'Westlands', 'Runda',
  'Kitengela', 'Athi River', 'Syokimau', 'Nyali', 'Diani',
  'Nanyuki', 'Thika', 'Machakos', 'Naivasha', 'Kilifi'
];

const milestones = [
  { id: 'planning', name: 'Planning & Design', percentage: 10 },
  { id: 'foundation', name: 'Foundation', percentage: 20 },
  { id: 'structure', name: 'Structural Work', percentage: 30 },
  { id: 'roofing', name: 'Roofing', percentage: 15 },
  { id: 'finishings', name: 'Interior Finishings', percentage: 15 },
  { id: 'utilities', name: 'Utilities Installation', percentage: 10 }
];

// Mock contractors for recommendations
const topContractors = [
  {
    id: 1,
    name: "Simba Builders Ltd",
    rating: 4.9,
    specialties: ["Residential", "Eco-friendly"],
    projects: 35,
    verified: true
  },
  {
    id: 2,
    name: "Nyati Construction Co.",
    rating: 4.8,
    specialties: ["Commercial", "Residential"],
    projects: 42,
    verified: true
  },
  {
    id: 3,
    name: "Savannah Homes",
    rating: 4.7,
    specialties: ["Luxury Homes", "Interior Design"],
    projects: 28,
    verified: true
  }
];

const ProjectCreate = () => {
  const [formData, setFormData] = useState({
    // Authentication
    isAuthenticated: false,
    
    // Basic Info
    projectName: '',
    projectType: '',
    location: '',
    size: '',
    budget: '',
    startDate: '',
    endDate: '',
    description: '',
    
    // Preferences
    architecturalStyle: '',
    specialRequirements: [] as string[],
    
    // Contractor Matching
    selectedContractors: [] as number[],
    
    // Budget & Payment
    paymentMethod: '',
    milestonePayments: {} as Record<string, number>,
    
    // Agreement
    termsAgreed: false
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === 'termsAgreed') {
      setFormData(prev => ({ ...prev, termsAgreed: checked }));
      return;
    }
    
    setFormData(prev => {
      const currentRequirements = [...prev.specialRequirements];
      if (checked) {
        return { ...prev, specialRequirements: [...currentRequirements, value] };
      } else {
        return { ...prev, specialRequirements: currentRequirements.filter(req => req !== value) };
      }
    });
  };
  
  const handleProjectTypeSelect = (typeId: string) => {
    setFormData(prev => ({ ...prev, projectType: typeId }));
  };
  
  const handleContractorSelect = (contractorId: number) => {
    setFormData(prev => {
      const currentSelected = [...prev.selectedContractors];
      if (currentSelected.includes(contractorId)) {
        return { ...prev, selectedContractors: currentSelected.filter(id => id !== contractorId) };
      } else {
        return { ...prev, selectedContractors: [...currentSelected, contractorId] };
      }
    });
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    // In a real app, you'd save progress to the backend here
    window.scrollTo(0, 0);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would normally submit the form data to an API
    console.log('Form submitted:', formData);
    // Redirect to dashboard
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8 max-w-4xl mx-auto">
          {/* Create Project Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Start Your Construction Project</h1>
            <p className="text-muted-foreground">
              Let's set up your project in Kenya and find qualified contractors
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8 px-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <div 
                    className={cn(
                      "h-1 flex-grow mx-2",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
                <div 
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all",
                    index + 1 <= currentStep
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1 <= currentStep && index + 1 < currentStep ? (
                    <Check size={18} />
                  ) : (
                    index + 1
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
          
          <Card className="animate-fade-in">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Authentication & Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {!formData.isAuthenticated && (
                    <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <Lock size={18} className="text-primary" />
                        Create an account or sign in
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Creating an account helps you track your project's progress and communicate with contractors securely.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          onClick={() => setFormData(prev => ({ ...prev, isAuthenticated: true }))}
                          className="flex-1"
                        >
                          Sign Up
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setFormData(prev => ({ ...prev, isAuthenticated: true }))}
                          className="flex-1"
                        >
                          Log In
                        </Button>
                      </div>
                      <div className="mt-3 text-center">
                        <button
                          type="button"
                          className="text-sm text-muted-foreground hover:text-primary underline"
                          onClick={() => setFormData(prev => ({ ...prev, isAuthenticated: true }))}
                        >
                          Continue as guest (you can save your account later)
                        </button>
                      </div>
                    </div>
                  )}
                
                  <h2 className="text-xl font-medium mb-4">Project Details</h2>
                  
                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium mb-1">
                      Project Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Building size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        placeholder="e.g., 3-Bedroom House in Nairobi"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Project Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {projectTypes.map((type) => (
                        <div
                          key={type.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all duration-200",
                            formData.projectType === type.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          )}
                          onClick={() => handleProjectTypeSelect(type.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              formData.projectType === type.id
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary text-muted-foreground"
                            )}>
                              {type.icon}
                            </div>
                            <div>
                              <h3 className="font-medium">{type.name}</h3>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Location, Size, and Timeline */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Location & Project Scope</h2>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">
                      Project Location in Kenya
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-muted-foreground" />
                      </div>
                      <select
                        id="location"
                        name="location"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select location</option>
                        {kenyanLocations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium mb-1">
                      Project Size (Square Feet)
                    </label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      placeholder="e.g., 2000"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-1">
                      Estimated Budget (KES)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <DollarSign size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        placeholder="e.g., 5,000,000"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the amount in Kenyan Shillings (KES)
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                        Expected Start Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-muted-foreground" />
                        </div>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                        Expected Completion Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-muted-foreground" />
                        </div>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="architecturalStyle" className="block text-sm font-medium mb-1">
                      Preferred Architectural Style
                    </label>
                    <select
                      id="architecturalStyle"
                      name="architecturalStyle"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                      value={formData.architecturalStyle}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a style</option>
                      {architecturalStyles.map(style => (
                        <option key={style.id} value={style.id}>{style.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Special Requirements (Optional)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {specialRequirements.map(req => (
                        <div key={req.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={req.id}
                            name="specialRequirements"
                            value={req.id}
                            checked={formData.specialRequirements.includes(req.id)}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                          />
                          <label htmlFor={req.id}>{req.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Contractor Matching */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Contractor Matching</h2>
                  
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <ThumbsUp size={18} className="text-primary" />
                      Recommended Contractors for Your Project
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your project details, we've matched you with these top-rated contractors in {formData.location || 'Kenya'}.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    {topContractors.map(contractor => (
                      <div 
                        key={contractor.id}
                        className={cn(
                          "border rounded-lg p-4 hover:border-primary/30 transition-all cursor-pointer",
                          formData.selectedContractors.includes(contractor.id) ? "border-primary bg-primary/5" : ""
                        )}
                        onClick={() => handleContractorSelect(contractor.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <Users size={24} className="text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{contractor.name}</h3>
                              <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{contractor.rating}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 my-2">
                              {contractor.specialties.map((specialty, i) => (
                                <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{contractor.projects} projects completed</span>
                              {contractor.verified && (
                                <span className="flex items-center text-kenya-green">
                                  <Shield size={14} className="mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className={cn(
                              "w-5 h-5 rounded-full border transition-all flex items-center justify-center",
                              formData.selectedContractors.includes(contractor.id)
                                ? "bg-primary border-primary text-white"
                                : "border-gray-300"
                            )}>
                              {formData.selectedContractors.includes(contractor.id) && (
                                <Check size={14} />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      variant="outline" 
                      type="button"
                    >
                      Browse More Contractors
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Budget & Payment */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Budget & Payment Setup</h2>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <Lock size={20} className="text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Secure Escrow Payments</h3>
                        <p className="text-sm text-muted-foreground">
                          Your funds are held securely and only released to contractors when you approve completed milestones.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Payment Milestones</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Divide your budget into payment milestones. We recommend the breakdown below based on industry standards.
                    </p>
                    
                    <div className="space-y-3">
                      {milestones.map(milestone => (
                        <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium">{milestone.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{milestone.percentage}%</span>
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${milestone.percentage * 3}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'mpesa', name: 'M-Pesa', icon: <CreditCard size={24} /> },
                        { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={24} /> },
                        { id: 'bank', name: 'Bank Transfer', icon: <Building size={24} /> },
                      ].map(method => (
                        <div
                          key={method.id}
                          className={cn(
                            "border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all",
                            formData.paymentMethod === method.id ? "border-primary bg-primary/5" : ""
                          )}
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                        >
                          <div className="text-muted-foreground">{method.icon}</div>
                          <span>{method.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 5: Confirmation & Terms */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Review & Confirm</h2>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 bg-muted/50">
                      <h3 className="font-medium">Project Summary</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-muted-foreground">Project Name:</div>
                        <div className="col-span-2 font-medium">{formData.projectName || "Not specified"}</div>
                        
                        <div className="text-muted-foreground">Type:</div>
                        <div className="col-span-2 font-medium">
                          {projectTypes.find(t => t.id === formData.projectType)?.name || "Not specified"}
                        </div>
                        
                        <div className="text-muted-foreground">Location:</div>
                        <div className="col-span-2 font-medium">{formData.location || "Not specified"}</div>
                        
                        <div className="text-muted-foreground">Budget:</div>
                        <div className="col-span-2 font-medium">
                          {formData.budget ? `KES ${formData.budget}` : "Not specified"}
                        </div>
                        
                        <div className="text-muted-foreground">Timeline:</div>
                        <div className="col-span-2 font-medium">
                          {formData.startDate && formData.endDate 
                            ? `${new Date(formData.startDate).toLocaleDateString()} to ${new Date(formData.endDate).toLocaleDateString()}`
                            : "Not specified"}
                        </div>
                        
                        <div className="text-muted-foreground">Style:</div>
                        <div className="col-span-2 font-medium">
                          {architecturalStyles.find(s => s.id === formData.architecturalStyle)?.name || "Not specified"}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {formData.selectedContractors.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="p-4 bg-muted/50">
                        <h3 className="font-medium">Selected Contractors</h3>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {formData.selectedContractors.map(id => {
                            const contractor = topContractors.find(c => c.id === id);
                            return contractor ? (
                              <li key={id} className="flex items-center gap-2">
                                <Check size={16} className="text-kenya-green" />
                                <span>{contractor.name}</span>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="termsAgreed"
                        name="termsAgreed"
                        checked={formData.termsAgreed}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        required
                      />
                      <label htmlFor="termsAgreed" className="text-sm">
                        I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and 
                        acknowledge that my project details will be shared with selected contractors.
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg flex items-start gap-3">
                    <div className="mt-1 text-primary">
                      <Info size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium">What happens next?</h3>
                      <p className="text-sm text-muted-foreground">
                        After submitting your project, we'll notify your selected contractors. 
                        You'll receive quotes within 48 hours, and our team will help you review them.
                        Your dashboard will show all project updates in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Form Navigation */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t">
                {currentStep > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < totalSteps ? (
                  <Button 
                    type="button" 
                    onClick={handleNextStep}
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    icon={<Check size={16} />}
                    iconPosition="right"
                  >
                    Create Project
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectCreate;
