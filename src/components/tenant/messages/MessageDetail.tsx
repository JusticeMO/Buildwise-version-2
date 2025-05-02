
import React from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

interface MessageDetailProps {
  message: Message | null;
  onComposeClick: () => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onComposeClick }) => {
  if (!message) {
    return (
      <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquareIcon className="text-muted-foreground" size={24} />
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
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-xl font-medium mb-1">{message.subject}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-secondary/30 flex items-center justify-center mr-2">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">From: {message.sender}</p>
              <p className="text-xs text-muted-foreground">{message.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {message.content}
        </p>
      </div>
    </div>
  );
};

// Import the MessageSquareIcon to avoid errors in the empty state
const MessageSquareIcon = ({ className, size }: { className?: string, size?: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

export default MessageDetail;
