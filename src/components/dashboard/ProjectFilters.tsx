
import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

const ProjectFilters = ({ searchTerm, onSearchChange, onFilterClick }: ProjectFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200 bg-card"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button 
          className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-card hover:bg-accent transition-colors duration-200"
          onClick={onFilterClick}
        >
          <Filter size={18} />
          <span>Status</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectFilters;
