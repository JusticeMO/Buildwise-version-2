
import React, { useState } from 'react';
import { toast } from 'sonner';

// Import our new components
import MessageHeader from '../messages/MessageHeader';
import MessageList from '../messages/MessageList';
import MessageDetail from '../messages/MessageDetail';
import ComposeMessageDialog from '../messages/ComposeMessageDialog';

// Define message type to be reused
interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

const TenantMessages = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  
  // Mock messages data
  const messages: Message[] = [
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
  
  const handleMessageChange = (field: string, value: string) => {
    setNewMessage(prev => ({ ...prev, [field]: value }));
  };
  
  const selectedMessage = messages.find(m => m.id === selectedMessageId);
  
  return (
    <div>
      <MessageHeader onComposeClick={() => setShowComposeDialog(true)} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MessageList 
          messages={messages} 
          selectedMessageId={selectedMessageId} 
          onSelectMessage={setSelectedMessageId} 
        />
        
        <div className="lg:col-span-2">
          <MessageDetail 
            message={selectedMessage || null} 
            onComposeClick={() => setShowComposeDialog(true)} 
          />
        </div>
      </div>
      
      <ComposeMessageDialog
        open={showComposeDialog}
        onOpenChange={setShowComposeDialog}
        newMessage={newMessage}
        onMessageChange={handleMessageChange}
        onSubmit={handleComposeSubmit}
      />
    </div>
  );
};

export default TenantMessages;
