
import { Contractor } from '@/types/contractor';

// Mock contractor data
export const mockContractors: Contractor[] = [
  {
    id: 1,
    name: "Simba Builders Ltd",
    rating: 4.8,
    reviewCount: 45,
    verified: true,
    specialization: ["Residential", "Commercial"],
    location: "Nairobi",
    description: "Experienced construction company specializing in modern residential homes and commercial buildings with over 15 years of experience.",
    completedProjects: 56,
    featuredProject: "Elite Apartments, Kilimani",
    contactPhone: "+254 712 345 678"
  },
  {
    id: 2,
    name: "Modern Constructions",
    rating: 4.5,
    reviewCount: 38,
    verified: true,
    specialization: ["Residential", "Interior Design"],
    location: "Mombasa",
    description: "Quality-focused contractors specializing in coastal properties and interior renovations with competitive pricing.",
    completedProjects: 42,
    featuredProject: "Ocean View Villas, Nyali",
    contactPhone: "+254 723 456 789"
  },
  {
    id: 3,
    name: "Apex Developers",
    rating: 4.9,
    reviewCount: 62,
    verified: true,
    specialization: ["Commercial", "Industrial"],
    location: "Nairobi",
    description: "Premier construction firm focusing on large-scale commercial and industrial projects with expertise in modern architecture.",
    completedProjects: 78,
    featuredProject: "Tech Park Offices, Westlands",
    contactPhone: "+254 734 567 890"
  },
  {
    id: 4,
    name: "GreenBuild Kenya",
    rating: 4.6,
    reviewCount: 29,
    verified: true,
    specialization: ["Residential", "Eco-friendly"],
    location: "Nakuru",
    description: "Sustainable construction solutions using eco-friendly materials and energy-efficient designs for modern living.",
    completedProjects: 35,
    featuredProject: "Solar Homes Estate, Naivasha",
    contactPhone: "+254 745 678 901"
  },
  {
    id: 5,
    name: "Precision Engineers",
    rating: 4.7,
    reviewCount: 41,
    verified: true,
    specialization: ["Commercial", "Architectural Design"],
    location: "Kisumu",
    description: "Combining engineering expertise with architectural excellence for unique, structurally sound commercial projects.",
    completedProjects: 47,
    featuredProject: "Lakeside Business Center, Kisumu",
    contactPhone: "+254 756 789 012"
  },
  {
    id: 6,
    name: "Heritage Constructors",
    rating: 4.6,
    reviewCount: 33,
    verified: true,
    specialization: ["Residential", "Heritage Restoration"],
    location: "Lamu",
    description: "Specializing in restoration and preservation of heritage buildings while incorporating modern structural improvements.",
    completedProjects: 29,
    featuredProject: "Old Town Restoration Project, Lamu",
    contactPhone: "+254 767 890 123"
  },
  {
    id: 7,
    name: "Skyline Developers",
    rating: 4.8,
    reviewCount: 51,
    verified: true,
    specialization: ["Commercial", "High-rise"],
    location: "Nairobi",
    description: "Experts in high-rise construction with focus on safety, efficiency and modern design for urban landscapes.",
    completedProjects: 63,
    featuredProject: "Skyview Towers, Upperhill",
    contactPhone: "+254 778 901 234"
  }
];

// Get unique locations from contractors
export const getUniqueLocations = (): string[] => {
  const locations = mockContractors.map(contractor => contractor.location);
  return [...new Set(locations)];
};

// Get unique specializations from contractors
export const getUniqueSpecializations = (): string[] => {
  const specs = mockContractors.flatMap(contractor => contractor.specialization);
  return [...new Set(specs)];
};
