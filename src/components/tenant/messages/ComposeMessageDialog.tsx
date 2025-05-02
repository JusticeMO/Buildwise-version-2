
import React from 'react';
import { Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ComposeMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newMessage: {
    recipient: string;
    subject: string;
    message: string;
  };
  onMessageChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const ComposeMessageDialog: React.FC<ComposeMessageDialogProps> = ({
  open,
  onOpenChange,
  newMessage,
  onMessageChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onChange={(e) => onMessageChange('recipient', e.target.value)}
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
              onChange={(e) => onMessageChange('subject', e.target.value)}
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
              onChange={(e) => onMessageChange('message', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            <Send size={16} className="mr-1" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeMessageDialog;
