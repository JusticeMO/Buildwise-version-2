
import React from 'react';
import { PhoneCall, Mail, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from '@/components/shared/Button';
import { useToast } from "@/hooks/use-toast";
import { Contractor } from '@/types/contractor';
import { Supplier } from '@/types/supplier';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: Contractor | Supplier | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, entity }) => {
  const { toast } = useToast();
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!entity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully",
        description: `Your message has been sent to ${entity.name}. They will contact you shortly.`,
      });
      setMessage('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Contact {entity.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <PhoneCall size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{entity.contactPhone}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Send a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="message" className="text-sm text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 border rounded-md h-24 focus:ring-1 focus:ring-primary"
                      placeholder={`Hello, I'm interested in your services for my project...`}
                      required
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      icon={<Mail size={16} />}
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
