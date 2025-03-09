
import React from 'react';
import { SearchIcon, Filter, MapPin, Paintbrush, ChevronDown, X } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface FinishingSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationFilter: string | null;
  setLocationFilter: (location: string | null) => void;
  specializationFilter: string | null;
  setSpecializationFilter: (specialization: string | null) => void;
  locations: string[];
  specializations: string[];
}

const FinishingSearchFilters: React.FC<FinishingSearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  specializationFilter,
  setSpecializationFilter,
  locations,
  specializations
}) => {
  return (
    <Card className="mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search finishing suppliers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          {/* Location Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-background hover:bg-accent transition-colors duration-200"
              >
                <MapPin size={18} />
                <span>{locationFilter || "Location"}</span>
                <ChevronDown size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-2">
                <div className="space-y-1">
                  {locationFilter && (
                    <button
                      onClick={() => setLocationFilter(null)}
                      className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded hover:bg-accent"
                    >
                      <span>Clear filter</span>
                      <X size={14} />
                    </button>
                  )}
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setLocationFilter(location)}
                      className={cn(
                        "flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent",
                        locationFilter === location && "bg-primary/10"
                      )}
                    >
                      <MapPin size={14} className="mr-2" />
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Specialization Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-background hover:bg-accent transition-colors duration-200"
              >
                <Paintbrush size={18} />
                <span>{specializationFilter || "Specialization"}</span>
                <ChevronDown size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-2">
                <div className="space-y-1">
                  {specializationFilter && (
                    <button
                      onClick={() => setSpecializationFilter(null)}
                      className="flex items-center justify-between w-full px-2 py-1.5 text-sm rounded hover:bg-accent"
                    >
                      <span>Clear filter</span>
                      <X size={14} />
                    </button>
                  )}
                  {specializations.map((specialization) => (
                    <button
                      key={specialization}
                      onClick={() => setSpecializationFilter(specialization)}
                      className={cn(
                        "flex items-center w-full px-2 py-1.5 text-sm rounded hover:bg-accent",
                        specializationFilter === specialization && "bg-primary/10"
                      )}
                    >
                      <Paintbrush size={14} className="mr-2" />
                      {specialization}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="outline"
            icon={<Filter size={18} />}
            onClick={() => {
              setLocationFilter(null);
              setSpecializationFilter(null);
              setSearchTerm('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FinishingSearchFilters;
