
import React from 'react';
import { SearchIcon, Filter, MapPin, Building, Paintbrush, ChevronDown } from 'lucide-react';
import Button from '@/components/shared/Button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Card from '@/components/shared/Card';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  locationFilter: string | null;
  onLocationChange: (location: string | null) => void;
  specializationFilter: string | null;
  onSpecializationChange: (specialization: string | null) => void;
  clearFilters: () => void;
  activeTab: string;
  locations: string[];
  specializations: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  locationFilter,
  onLocationChange,
  specializationFilter,
  onSpecializationChange,
  clearFilters,
  activeTab,
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
            placeholder={`Search ${activeTab === "contractors" ? "contractors" : "suppliers"}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200 bg-background"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-4 py-2 inline-flex items-center gap-2"
              >
                <MapPin size={18} />
                <span>{locationFilter || 'Location'}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => onLocationChange(null)}
                className={!locationFilter ? "bg-muted" : ""}
              >
                All Locations
              </DropdownMenuItem>
              {locations.map(location => (
                <DropdownMenuItem 
                  key={location} 
                  onClick={() => onLocationChange(location)}
                  className={locationFilter === location ? "bg-muted" : ""}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-4 py-2 inline-flex items-center gap-2"
              >
                {activeTab === "contractors" ? (
                  <Building size={18} />
                ) : (
                  <Paintbrush size={18} />
                )}
                <span>{specializationFilter || 'Specialization'}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem 
                onClick={() => onSpecializationChange(null)}
                className={!specializationFilter ? "bg-muted" : ""}
              >
                All Specializations
              </DropdownMenuItem>
              {specializations.map(spec => (
                <DropdownMenuItem 
                  key={spec} 
                  onClick={() => onSpecializationChange(spec)}
                  className={specializationFilter === spec ? "bg-muted" : ""}
                >
                  {spec}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(locationFilter || specializationFilter) && (
            <Button
              variant="outline"
              icon={<Filter size={18} />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SearchFilters;
