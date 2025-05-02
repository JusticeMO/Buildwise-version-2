
import React, { useState } from 'react';
import { User, Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: 'John Doe',
    text: 'Hello everyone! Just moved in to Unit 3B. Nice to meet you all!',
    timestamp: '10:30 AM',
    avatar: '',
    isCurrentUser: false
  },
  {
    id: 2,
    sender: 'Sarah Smith',
    text: 'Welcome John! I\'m in Unit 2A. Let me know if you need any help getting settled.',
    timestamp: '10:32 AM',
    avatar: '',
    isCurrentUser: false
  },
  {
    id: 3,
    sender: 'Michael Johnson',
    text: 'Hi John, welcome to the building! We\'re having a small get-together this weekend if you\'d like to join.',
    timestamp: '10:35 AM',
    avatar: '',
    isCurrentUser: false
  },
  {
    id: 4,
    sender: 'You',
    text: 'Thanks everyone for the warm welcome!',
    timestamp: '10:40 AM',
    avatar: '',
    isCurrentUser: true
  }
];

// Emoji picker options
const emojis = ['😀', '😊', '👍', '❤️', '🎉', '👋', '🙏', '🔥', '😂', '🥳', '👏', '🌟', '🤔', '😎', '🙌', '✨', '💯', '🤝', '👌', '🌈'];

const TenantChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '',
      isCurrentUser: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    // In a real app, this would send the message to a backend service
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };
  
  const handleShareContact = () => {
    toast.success("Contact info shared with building tenants");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tenant Chat</h2>
        <Button variant="outline" onClick={handleShareContact}>
          Share Contact Info
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[70vh] flex flex-col">
        <div className="p-4 border-b bg-secondary/10">
          <h3 className="font-medium">Riverside Apartments Chat Group</h3>
          <p className="text-sm text-muted-foreground">12 tenants • 3 online</p>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={`h-8 w-8 ${message.isCurrentUser ? 'ml-2' : 'mr-2'}`}>
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    {message.avatar && <AvatarImage src={message.avatar} alt={message.sender} />}
                  </Avatar>
                  
                  <div>
                    <div className={`rounded-lg p-3 ${
                      message.isCurrentUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary/20 text-foreground'
                    }`}>
                      {!message.isCurrentUser && (
                        <p className="text-xs font-medium mb-1">{message.sender}</p>
                      )}
                      <p>{message.text}</p>
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${
                      message.isCurrentUser ? 'text-right' : ''
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Smile size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" side="top" align="start">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl h-10 w-10 flex items-center justify-center rounded hover:bg-secondary/20"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              disabled={newMessage.trim() === ''}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantChat;
