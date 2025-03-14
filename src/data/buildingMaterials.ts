
import { BuildingMaterial } from '@/types/buildingMaterial';

export const mockBuildingMaterials: BuildingMaterial[] = [
  {
    id: 1,
    name: 'Portland Cement',
    description: 'High-quality construction cement suitable for all general building purposes',
    price: 'KES 750',
    unit: 'per 50kg bag',
    supplier: 'Bamburi Cement',
    image: '/placeholder.svg',
    categories: ['Cement', 'Foundation'],
    stock: 500,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Building Sand',
    description: 'Clean, sieved river sand ideal for construction and masonry work',
    price: 'KES 4,500',
    unit: 'per ton',
    supplier: 'Nairobi Aggregates Ltd',
    image: '/placeholder.svg',
    categories: ['Sand', 'Masonry'],
    stock: 200,
    rating: 4.5
  },
  {
    id: 3,
    name: 'Reinforcement Steel Bars (D8)',
    description: '8mm diameter high-tensile steel bars for reinforced concrete structures',
    price: 'KES 120',
    unit: 'per meter',
    supplier: 'Devki Steel Mills',
    image: '/placeholder.svg',
    categories: ['Steel', 'Reinforcement'],
    stock: 1000,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Concrete Blocks (6 inch)',
    description: 'Solid concrete blocks for walls and partitions, 6x9x18 inches',
    price: 'KES 65',
    unit: 'per piece',
    supplier: 'Kenyan Blocks Manufacturers',
    image: '/placeholder.svg',
    categories: ['Blocks', 'Masonry'],
    stock: 5000,
    rating: 4.3
  },
  {
    id: 5,
    name: 'Machine Cut Building Stones',
    description: 'Precision-cut natural building stones for walls and structures',
    price: 'KES 50',
    unit: 'per piece',
    supplier: 'Juja Quarries',
    image: '/placeholder.svg',
    categories: ['Stones', 'Masonry'],
    stock: 10000,
    rating: 4.6
  },
  {
    id: 6,
    name: 'Waterproof Cement',
    description: 'Special waterproof cement for bathrooms, water tanks, and swimming pools',
    price: 'KES 950',
    unit: 'per 50kg bag',
    supplier: 'Savannah Cement',
    image: '/placeholder.svg',
    categories: ['Cement', 'Waterproofing'],
    stock: 300,
    rating: 4.9
  },
  {
    id: 7,
    name: 'Aggregates (Ballast)',
    description: 'Crushed stone aggregates for concrete mixing, sizes 1/4, 1/2, and 3/4 inch',
    price: 'KES 3,800',
    unit: 'per ton',
    supplier: 'Nairobi Aggregates Ltd',
    image: '/placeholder.svg',
    categories: ['Aggregates', 'Concrete'],
    stock: 400,
    rating: 4.4
  },
  {
    id: 8,
    name: 'Red Clay Bricks',
    description: 'Traditional kiln-fired clay bricks for construction',
    price: 'KES 18',
    unit: 'per piece',
    supplier: 'Thika Brick Makers',
    image: '/placeholder.svg',
    categories: ['Bricks', 'Masonry'],
    stock: 20000,
    rating: 4.2
  },
  {
    id: 9,
    name: 'PVC Water Pipes (1 inch)',
    description: 'Durable PVC pipes for water supply systems',
    price: 'KES 350',
    unit: 'per 6m length',
    supplier: 'Polypipes Kenya',
    image: '/placeholder.svg',
    categories: ['Plumbing', 'Pipes'],
    stock: 500,
    rating: 4.6
  },
  {
    id: 10,
    name: 'Timber (6x1 inch)',
    description: 'Treated cypress timber for construction, roofing, and formwork',
    price: 'KES 250',
    unit: 'per foot',
    supplier: 'Nakuru Timber Yard',
    image: '/placeholder.svg',
    categories: ['Timber', 'Roofing'],
    stock: 1000,
    rating: 4.5
  },
  {
    id: 11,
    name: 'Roofing Nails',
    description: 'Galvanized roofing nails for securing roof sheets',
    price: 'KES 350',
    unit: 'per kg',
    supplier: 'Nairobi Hardware Supplies',
    image: '/placeholder.svg',
    categories: ['Hardware', 'Roofing'],
    stock: 200,
    rating: 4.3
  },
  {
    id: 12,
    name: 'Corrugated Iron Sheets (28 gauge)',
    description: 'Galvanized corrugated iron sheets for roofing',
    price: 'KES 850',
    unit: 'per sheet (3m)',
    supplier: 'Mabati Rolling Mills',
    image: '/placeholder.svg',
    categories: ['Roofing', 'Metal'],
    stock: 500,
    rating: 4.7
  }
];

// Get unique categories
export const getUniqueCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  
  mockBuildingMaterials.forEach(material => {
    material.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
};

// Get max price
export const getMaxPrice = (): number => {
  let maxPrice = 0;
  
  mockBuildingMaterials.forEach(material => {
    const priceNumber = parseInt(material.price.replace(/[^0-9]/g, ''));
    if (priceNumber > maxPrice) {
      maxPrice = priceNumber;
    }
  });
  
  return maxPrice;
};
