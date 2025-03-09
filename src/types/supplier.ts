
export interface Supplier {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  specialization: string[];
  location: string;
  description: string;
  completedProjects: number;
  featuredProject: string;
  contactPhone: string;
}
