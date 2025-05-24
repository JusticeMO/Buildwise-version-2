
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/shared/Button';

interface VendorApplicationFormProps {
  formData: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    businessType: string;
    specialization: string;
    aboutBusiness: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const VendorApplicationForm: React.FC<VendorApplicationFormProps> = ({
  formData,
  onInputChange,
  onSubmit
}) => {
  return (
    <section id="application-form" className="py-16">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Apply to Join BuildWise</h2>
          
          <div className="bg-card rounded-lg border p-8">
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name *</label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                    onChange={onInputChange}
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
                  onChange={onInputChange}
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
  );
};

export default VendorApplicationForm;
