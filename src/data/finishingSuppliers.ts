
import { Supplier } from '@/types/supplier';

// Mock finishing suppliers data
export const mockFinishingSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Superior Paint Solutions",
    rating: 4.9,
    reviewCount: 68,
    verified: true,
    specialization: ["Interior Painting", "Exterior Painting"],
    location: "Nairobi",
    description: "Premium painting services using high-quality, eco-friendly paints with expert application techniques for lasting, beautiful finishes.",
    completedProjects: 124,
    featuredProject: "Luxury Residential Complex, Karen",
    contactPhone: "+254 712 345 678"
  },
  {
    id: 2,
    name: "Elegant Tile Works",
    rating: 4.8,
    reviewCount: 55,
    verified: true,
    specialization: ["Ceramic Tiles", "Porcelain Flooring"],
    location: "Mombasa",
    description: "Specialized in imported and local tile installation with precise workmanship and creative design solutions for all spaces.",
    completedProjects: 93,
    featuredProject: "Five-Star Hotel Renovation, Nyali",
    contactPhone: "+254 723 456 789"
  },
  {
    id: 3,
    name: "Luminous Lighting Kenya",
    rating: 4.7,
    reviewCount: 42,
    verified: true,
    specialization: ["Lighting Design", "Light Fixtures"],
    location: "Nairobi",
    description: "Comprehensive lighting solutions with a focus on energy-efficient designs, mood lighting, and statement fixtures for residential and commercial spaces.",
    completedProjects: 78,
    featuredProject: "Corporate Headquarters, Westlands",
    contactPhone: "+254 734 567 890"
  },
  {
    id: 4,
    name: "Woodwork Finishers",
    rating: 4.9,
    reviewCount: 49,
    verified: true,
    specialization: ["Wood Staining", "Varnishing"],
    location: "Nakuru",
    description: "Expert wood finishing services bringing out the natural beauty of wooden surfaces with traditional and modern techniques.",
    completedProjects: 86,
    featuredProject: "Heritage Building Restoration, CBD",
    contactPhone: "+254 745 678 901"
  },
  {
    id: 5,
    name: "Luxe Wall Coverings",
    rating: 4.8,
    reviewCount: 39,
    verified: true,
    specialization: ["Wallpaper", "Decorative Panels"],
    location: "Nairobi",
    description: "Premium wall finishing solutions including imported wallpapers, textured finishes, and decorative wall panels for distinctive interiors.",
    completedProjects: 64,
    featuredProject: "Boutique Hotel, Gigiri",
    contactPhone: "+254 756 789 012"
  },
  {
    id: 6,
    name: "Stone & Marble Experts",
    rating: 4.6,
    reviewCount: 33,
    verified: true,
    specialization: ["Natural Stone", "Marble Installation"],
    location: "Kisumu",
    description: "Specialized in sourcing and installing premium natural stone and marble with expert craftsmanship for countertops, floors and decorative elements.",
    completedProjects: 57,
    featuredProject: "Luxury Residential Kitchen Renovation, Runda",
    contactPhone: "+254 767 890 123"
  }
];

// Get unique locations from suppliers
export const getUniqueLocations = (): string[] => {
  const locations = mockFinishingSuppliers.map(supplier => supplier.location);
  return [...new Set(locations)];
};

// Get unique specializations from suppliers
export const getUniqueSpecializations = (): string[] => {
  const specs = mockFinishingSuppliers.flatMap(supplier => supplier.specialization);
  return [...new Set(specs)];
};
