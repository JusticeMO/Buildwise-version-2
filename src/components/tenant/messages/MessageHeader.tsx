
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageHeaderProps {
  onComposeClick: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ onComposeClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <Button 
        onClick={onComposeClick}
        className="flex items-center gap-2"
      >
        <MessageSquare size={16} />
        New Message
      </Button>
    </div>
  );
};

export default MessageHeader;
