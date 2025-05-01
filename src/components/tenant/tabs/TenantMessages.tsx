
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MessageSquare, Search, Send, User, Building2, AlertCircle, CheckCircle } from 'lucide-react';

const TenantMessages = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  
  const messages = [
    {
      id: 1,
      sender: 'Property Manager',
      subject: 'Rent Reminder',
      content: 'This is a friendly reminder that your rent payment of KES 25,000 is due on July 1st. Please ensure timely payment to avoid late fees.',
      date: 'June 28, 2023',
      read: false
    },
    {
      id: 2,
      sender: 'Maintenance Team',
      subject: 'Scheduled Water Maintenance',
      content: 'Please be informed that there will be scheduled water maintenance on July 5th from 9 AM to 11 AM. We recommend storing water for use during this period.',
      date: 'June 25, 2023',
      read: false
    },
    {
      id: 3,
      sender: 'Property Manager',
      subject: 'June Payment Confirmed',
      content: 'Thank you for your June rent payment of KES 25,000. This email serves as confirmation that your payment has been received and processed.',
      date: 'June 1, 2023',
      read: true
    }
  ];
  
  const handleComposeSubmit = () => {
    const { recipient, subject, message } = newMessage;
    
    if (!recipient || !subject || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // This would normally send the message to the API
    toast.success("Message sent successfully!");
    setShowComposeDialog(false);
    setNewMessage({ recipient: '', subject: '', message: '' });
  };
  
  const selectedMessage = messages.find(m => m.id === selectedMessageId);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
        <Button 
          onClick={() => setShowComposeDialog(true)}
          className="flex items-center"
        >
          <MessageSquare size={16} className="mr-1" />
          New Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                onClick={() => setSelectedMessageId(message.id)}
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
        
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-xl font-medium mb-1">{selectedMessage.subject}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-secondary/30 flex items-center justify-center mr-2">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">From: {selectedMessage.sender}</p>
                      <p className="text-xs text-muted-foreground">{selectedMessage.date}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Send size={14} className="mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {selectedMessage.content}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-muted-foreground" size={24} />
                </div>
                <h3 className="text-lg font-medium mb-1">No message selected</h3>
                <p className="text-sm text-muted-foreground mb-4">Select a message from the inbox to view its contents</p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowComposeDialog(true)}
                >
                  Compose New Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Compose Message Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compose New Message</DialogTitle>
            <DialogDescription>
              Send a message to your property manager or maintenance team
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="recipient" className="text-right text-sm">
                To:
              </label>
              <div className="col-span-3">
                <select 
                  id="recipient" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                >
                  <option value="">Select recipient...</option>
                  <option value="property_manager">Property Manager</option>
                  <option value="maintenance">Maintenance Team</option>
                  <option value="accounting">Accounting</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subject" className="text-right text-sm">
                Subject:
              </label>
              <Input 
                id="subject" 
                className="col-span-3"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="message" className="text-right text-sm">
                Message:
              </label>
              <Textarea 
                id="message" 
                className="col-span-3" 
                rows={8}
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleComposeSubmit}>
              <Send size={16} className="mr-1" />
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantMessages;
