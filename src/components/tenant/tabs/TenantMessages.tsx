
import React from 'react';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';

const TenantMessages = () => {
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
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Inbox</h3>
          <Button variant="outline" size="sm" className="text-xs">Compose Message</Button>
        </div>
        
        <div className="divide-y">
          {messages.map((message) => (
            <div key={message.id} className={`p-4 hover:bg-secondary/10 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}>
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
    </div>
  );
};

export default TenantMessages;
