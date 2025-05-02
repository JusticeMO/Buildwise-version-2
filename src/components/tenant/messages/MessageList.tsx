
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

interface MessageListProps {
  messages: Message[];
  selectedMessageId: number | null;
  onSelectMessage: (id: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  selectedMessageId, 
  onSelectMessage 
}) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">Inbox</h3>
        <span className="text-xs font-medium bg-secondary/20 px-2 py-1 rounded-full">
          {messages.filter(m => !m.read).length} unread
        </span>
      </div>
      
      <div className="p-2">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search messages..." className="pl-9" />
        </div>
      </div>
      
      <div className="divide-y max-h-[60vh] overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            onClick={() => onSelectMessage(message.id)}
            className={`p-4 hover:bg-secondary/10 cursor-pointer ${
              selectedMessageId === message.id ? 'bg-secondary/10' : ''
            } ${!message.read ? 'bg-blue-50' : ''}`}
          >
            <div className="flex justify-between">
              <p className={`font-medium ${!message.read ? 'font-semibold' : ''}`}>{message.subject}</p>
              <span className="text-xs text-muted-foreground">{message.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">From: {message.sender}</p>
            <p className="text-sm mt-2 line-clamp-2">{message.content}</p>
            {!message.read && (
              <Badge variant="secondary" className="mt-2">Unread</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
