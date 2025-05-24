
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  recommended?: boolean;
  vendorType?: 'contractor' | 'supplier' | 'consultant' | 'architect';
}

export interface VendorProfile {
  id: string;
  name: string;
  vendorType: 'contractor' | 'supplier' | 'consultant' | 'architect';
  description: string;
  specialization: string[];
  location: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  rating: number;
  reviewsCount: number;
  portfolio: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
  }[];
  services: string[];
  yearsExperience: number;
  verified: boolean;
  planType: 'basic' | 'professional' | 'premium';
}
