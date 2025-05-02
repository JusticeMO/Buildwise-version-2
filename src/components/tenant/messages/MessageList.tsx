
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MessageListItem from './MessageListItem';

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
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMessages = searchTerm 
    ? messages.filter(m => 
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.sender.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;
  
  const unreadCount = messages.filter(m => !m.read).length;
  
  return (
    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">Inbox</h3>
        <span className="text-xs font-medium bg-secondary/20 px-2 py-1 rounded-full">
          {unreadCount} unread
        </span>
      </div>
      
      <div className="p-2">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search messages..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="divide-y max-h-[60vh] overflow-y-auto">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <MessageListItem 
              key={message.id}
              message={message}
              isSelected={selectedMessageId === message.id}
              onClick={() => onSelectMessage(message.id)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            {searchTerm ? 'No messages matching your search' : 'No messages'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
