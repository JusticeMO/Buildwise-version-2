
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
  Upload
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

const ProjectCreate = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    location: '',
    budget: '',
    startDate: '',
    description: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProjectTypeSelect = (typeId: string) => {
    setFormData(prev => ({ ...prev, projectType: typeId }));
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
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
            <h1 className="text-3xl font-bold mb-2">Create a New Project</h1>
            <p className="text-muted-foreground">
              Let's set up your construction project in Kenya and find qualified contractors
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
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
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
              
              {/* Step 2: Location and Budget */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Location & Budget</h2>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-1">
                      Project Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="e.g., Kileleshwa, Nairobi"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a specific area and city in Kenya
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-1">
                      Estimated Budget
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
                </div>
              )}
              
              {/* Step 3: Description and Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Project Description & Documents</h2>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Describe your project in detail..."
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Include specific details about your construction project, requirements, and timeline
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Project Documents (Optional)
                    </label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Upload size={24} className="text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-1">Drag and drop files here</p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Upload floor plans, sketches, or any other relevant documents (PDF, JPG, PNG)
                        </p>
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </div>
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
                  >
                    Continue
                  </Button>
                ) : (
                  <Button type="submit">
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
