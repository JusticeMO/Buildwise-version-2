
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

interface MessageListItemProps {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ 
  message, 
  isSelected,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 hover:bg-secondary/10 cursor-pointer ${
        isSelected ? 'bg-secondary/10' : ''
      } ${!message.read ? 'bg-blue-50' : ''}`}
    >
      <div className="flex justify-between">
        <p className={`font-medium ${!message.read ? 'font-semibold' : ''}`}>
          {message.subject}
        </p>
        <span className="text-xs text-muted-foreground">{message.date}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">From: {message.sender}</p>
      <p className="text-sm mt-2 line-clamp-2">{message.content}</p>
      {!message.read && (
        <Badge variant="secondary" className="mt-2">Unread</Badge>
      )}
    </div>
  );
};

export default MessageListItem;
