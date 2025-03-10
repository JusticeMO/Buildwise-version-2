
import React from 'react';
import { Send, X } from 'lucide-react';
import Button from '@/components/shared/Button';

interface MultiSelectActionBarProps {
  selectedCount: number;
  onRequestQuotes: () => void;
  onClear: () => void;
}

const MultiSelectActionBar: React.FC<MultiSelectActionBarProps> = ({
  selectedCount,
  onRequestQuotes,
  onClear
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t shadow-lg p-4 z-50 animate-slide-up">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">
            {selectedCount} contractor{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            icon={<X size={16} />}
            onClick={onClear}
          >
            Clear selection
          </Button>
        </div>
        <Button
          icon={<Send size={16} />}
          onClick={onRequestQuotes}
        >
          Request Quotes
        </Button>
      </div>
    </div>
  );
};

export default MultiSelectActionBar;
