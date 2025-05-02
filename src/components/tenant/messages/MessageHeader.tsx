
import React from 'react';
import { MessageSquare } from 'lucide-react';
import Button from '@/components/shared/Button';

interface MessageHeaderProps {
  onComposeClick: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ onComposeClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <Button 
        onClick={onComposeClick}
        className="flex items-center"
      >
        <MessageSquare size={16} className="mr-1" />
        New Message
      </Button>
    </div>
  );
};

export default MessageHeader;
