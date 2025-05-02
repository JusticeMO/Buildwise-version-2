
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface EmptyMessageStateProps {
  onComposeClick: () => void;
}

const EmptyMessageState: React.FC<EmptyMessageStateProps> = ({ onComposeClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center">
      <div className="text-center p-6">
        <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="text-muted-foreground" size={24} />
        </div>
        <h3 className="text-lg font-medium mb-1">No message selected</h3>
        <p className="text-sm text-muted-foreground mb-4">Select a message from the inbox to view its contents</p>
        <Button 
          variant="outline" 
          onClick={onComposeClick}
        >
          Compose New Message
        </Button>
      </div>
    </div>
  );
};

export default EmptyMessageState;
