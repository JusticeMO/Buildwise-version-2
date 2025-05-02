
import React from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyMessageState from './EmptyMessageState';

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
      <EmptyMessageState onComposeClick={onComposeClick} />
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

export default MessageDetail;
