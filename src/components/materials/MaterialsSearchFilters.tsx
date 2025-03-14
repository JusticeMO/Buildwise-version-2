
import React from 'react';
import { Search, X } from 'lucide-react';
import Button from '@/components/shared/Button';

interface MaterialsSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  categories: string[];
  clearFilters: () => void;
}

const MaterialsSearchFilters = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  categories,
  clearFilters
}: MaterialsSearchFiltersProps) => {
  return (
    <div className="bg-card rounded-lg border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="col-span-1 md:col-span-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search building materials..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            value={categoryFilter || ''}
            onChange={(e) => onCategoryChange(e.target.value || null)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price Range: KES {priceRange[0]} - KES {priceRange[1]}
          </label>
          <div className="px-2">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Clear Filters */}
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full"
            icon={<X size={14} />}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaterialsSearchFilters;
