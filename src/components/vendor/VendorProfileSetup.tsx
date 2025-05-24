
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import { Upload, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VendorProfileSetupProps {
  vendorId: string;
}

const VendorProfileSetup: React.FC<VendorProfileSetupProps> = ({ vendorId }) => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    companyName: '',
    description: '',
    specialization: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    location: '',
    services: [''],
    portfolioItems: [{ title: '', description: '', imageUrl: '', category: '' }],
    certificates: [''],
    logo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: 'services' | 'certificates') => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleArrayRemove = (field: 'services' | 'certificates', index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleArrayChange = (field: 'services' | 'certificates', index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handlePortfolioAdd = () => {
    setProfileData(prev => ({
      ...prev,
      portfolioItems: [...prev.portfolioItems, { title: '', description: '', imageUrl: '', category: '' }]
    }));
  };

  const handlePortfolioRemove = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.filter((_, i) => i !== index)
    }));
  };

  const handlePortfolioChange = (index: number, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your vendor profile has been successfully updated.",
      duration: 3000,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Setup Your Vendor Profile</h1>
        <p className="text-muted-foreground">Create a professional profile to attract more clients</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                value={profileData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Specialization</label>
              <Input
                value={profileData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                placeholder="e.g., General Construction, Plumbing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={profileData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                value={profileData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="+254 700 000 000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Website (Optional)</label>
              <Input
                value={profileData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Nairobi, Kenya"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Company Description</label>
            <Textarea
              value={profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your company, experience, and what makes you unique"
              rows={4}
            />
          </div>
        </Card>

        {/* Services */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold mb-6">Services Offered</h2>
          {profileData.services.map((service, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <Input
                value={service}
                onChange={(e) => handleArrayChange('services', index, e.target.value)}
                placeholder="Service name"
                className="flex-1"
              />
              {profileData.services.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleArrayRemove('services', index)}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleArrayAdd('services')}
            className="mt-2"
          >
            <Plus size={16} className="mr-2" />
            Add Service
          </Button>
        </Card>

        {/* Portfolio */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold mb-6">Portfolio</h2>
          {profileData.portfolioItems.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Project {index + 1}</h3>
                {profileData.portfolioItems.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handlePortfolioRemove(index)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title</label>
                  <Input
                    value={item.title}
                    onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={item.category}
                    onChange={(e) => handlePortfolioChange(index, 'category', e.target.value)}
                    placeholder="e.g., Residential, Commercial"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                    placeholder="Describe the project"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={item.imageUrl}
                    onChange={(e) => handlePortfolioChange(index, 'imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handlePortfolioAdd}
            className="mt-2"
          >
            <Plus size={16} className="mr-2" />
            Add Portfolio Item
          </Button>
        </Card>

        {/* Certificates */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold mb-6">Certificates & Licenses</h2>
          {profileData.certificates.map((certificate, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <Input
                value={certificate}
                onChange={(e) => handleArrayChange('certificates', index, e.target.value)}
                placeholder="Certificate name or license number"
                className="flex-1"
              />
              {profileData.certificates.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleArrayRemove('certificates', index)}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleArrayAdd('certificates')}
            className="mt-2"
          >
            <Plus size={16} className="mr-2" />
            Add Certificate
          </Button>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit">
            Publish Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VendorProfileSetup;
