
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { ShoppingCart } from 'lucide-react';
import BuildingMaterialCard from '@/components/materials/BuildingMaterialCard';
import MaterialsSearchFilters from '@/components/materials/MaterialsSearchFilters';
import { mockBuildingMaterials, getUniqueCategories, getMaxPrice } from '@/data/buildingMaterials';
import { BuildingMaterial } from '@/types/buildingMaterial';
import { useIsMobile } from '@/hooks/use-mobile';

const Materials = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const maxPrice = getMaxPrice();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [cart, setCart] = useState<BuildingMaterial[]>([]);
  
  // Get unique categories
  const categories = getUniqueCategories();
  
  // Filter materials based on search term, category, and price range
  const filteredMaterials = mockBuildingMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter 
      ? material.categories.includes(categoryFilter) 
      : true;
    
    const materialPrice = parseInt(material.price.replace(/[^0-9]/g, ''));
    const matchesPrice = materialPrice >= priceRange[0] && materialPrice <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // Handle clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter(null);
    setPriceRange([0, maxPrice]);
  };
  
  // Handle add to cart
  const handleAddToCart = (material: BuildingMaterial) => {
    setCart(prev => [...prev, material]);
    
    toast({
      title: "Added to cart",
      description: `${material.name} has been added to your cart`,
      duration: 3000,
    });
  };

  // View cart handler
  const handleViewCart = () => {
    navigate('/cart');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-20 bg-secondary/50">
        <div className="container px-4 py-6 md:py-8">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Building Materials</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Quality construction materials for your projects - cement, sand, steel, blocks, and more at competitive prices
            </p>
          </div>
          
          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 md:p-4 mb-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={isMobile ? 16 : 20} className="text-primary" />
                  <span className="font-medium text-sm md:text-base">{cart.length} {cart.length === 1 ? 'item' : 'items'} in cart</span>
                </div>
                <Button onClick={handleViewCart} size={isMobile ? "sm" : "default"}>View Cart</Button>
              </div>
            </div>
          )}
          
          {/* Search and Filters */}
          <MaterialsSearchFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxPrice}
            categories={categories}
            clearFilters={clearFilters}
          />
          
          {/* Materials Grid */}
          <div className="space-y-4 md:space-y-6 animate-fade-in stagger-1">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <BuildingMaterialCard 
                  key={material.id}
                  material={material}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <Card className="py-8 md:py-12 text-center">
                <p className="text-muted-foreground mb-4">No building materials found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Materials;
