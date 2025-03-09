
import { Supplier } from '@/types/supplier';

// Mock furnishing suppliers data
export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Elegant Interior Solutions",
    rating: 4.7,
    reviewCount: 38,
    verified: true,
    specialization: ["Furniture", "Home Decor"],
    location: "Nairobi",
    description: "Premium furniture and home decor solutions for modern homes, offering customizable options and expert interior styling advice.",
    completedProjects: 64,
    featuredProject: "Luxury Apartment Furnishing, Westlands",
    contactPhone: "+254 712 456 789"
  },
  {
    id: 2,
    name: "Kenyan Artisan Furniture",
    rating: 4.8,
    reviewCount: 42,
    verified: true,
    specialization: ["Handcrafted Furniture", "Traditional Designs"],
    location: "Nakuru",
    description: "Locally-made, high-quality furniture using sustainable materials with a focus on traditional Kenyan designs with modern functionality.",
    completedProjects: 51,
    featuredProject: "Safari Lodge Furnishing, Naivasha",
    contactPhone: "+254 723 567 890"
  },
  {
    id: 3,
    name: "Modern Paint Solutions",
    rating: 4.6,
    reviewCount: 35,
    verified: true,
    specialization: ["Interior Painting", "Decorative Finishes"],
    location: "Mombasa",
    description: "Professional painting services using eco-friendly paints with specialized decorative techniques for unique interior finishes.",
    completedProjects: 72,
    featuredProject: "Coastal Resort Interior, Diani",
    contactPhone: "+254 734 678 901"
  },
  {
    id: 4,
    name: "Floor & Tile Masters",
    rating: 4.9,
    reviewCount: 56,
    verified: true,
    specialization: ["Tiling", "Flooring Solutions"],
    location: "Nairobi",
    description: "Expert installation of premium tiles, wooden flooring, and other flooring solutions with attention to detail and quality craftsmanship.",
    completedProjects: 87,
    featuredProject: "Executive Office Flooring, Upperhill",
    contactPhone: "+254 745 789 012"
  },
  {
    id: 5,
    name: "Lighting & Fixtures Kenya",
    rating: 4.5,
    reviewCount: 31,
    verified: true,
    specialization: ["Lighting Design", "Electrical Fixtures"],
    location: "Kisumu",
    description: "Comprehensive lighting solutions including design, supply and installation of modern fixtures for residential and commercial spaces.",
    completedProjects: 43,
    featuredProject: "Lakeside Hotel Lighting, Kisumu",
    contactPhone: "+254 756 890 123"
  },
  {
    id: 6,
    name: "Luxe Kitchens & Baths",
    rating: 4.8,
    reviewCount: 47,
    verified: true,
    specialization: ["Kitchen Fixtures", "Bathroom Fittings"],
    location: "Nairobi",
    description: "Premium kitchen and bathroom solutions with modern, functional designs and high-quality fixtures for luxury residential projects.",
    completedProjects: 59,
    featuredProject: "Luxury Villa Kitchens, Karen",
    contactPhone: "+254 767 901 234"
  },
  {
    id: 7,
    name: "Curtain & Blinds Experts",
    rating: 4.7,
    reviewCount: 39,
    verified: true,
    specialization: ["Window Treatments", "Soft Furnishings"],
    location: "Mombasa",
    description: "Custom window treatments and soft furnishings with a wide range of fabrics, styles and automation options for residential and commercial spaces.",
    completedProjects: 68,
    featuredProject: "Beachfront Hotel Drapery, Diani",
    contactPhone: "+254 778 912 345"
  }
];

// Get unique locations from suppliers
export const getUniqueLocations = (): string[] => {
  const locations = mockSuppliers.map(supplier => supplier.location);
  return [...new Set(locations)];
};

// Get unique specializations from suppliers
export const getUniqueSpecializations = (): string[] => {
  const specs = mockSuppliers.flatMap(supplier => supplier.specialization);
  return [...new Set(specs)];
};
