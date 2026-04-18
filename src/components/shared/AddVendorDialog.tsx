import React, { useState } from 'react';
import { Plus, Globe, Phone, Clock, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Button from '@/components/shared/Button';
import { addUtilityProvider } from '@/data/sharedMockData';

interface AddVendorDialogProps {
  trigger?: React.ReactNode;
  defaultCategoryId?: string;
  onSuccess?: () => void;
}

const AddVendorDialog = ({ trigger, defaultCategoryId = 'utility-maintenance', onSuccess }: AddVendorDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    categoryId: defaultCategoryId,
    category: 'Maintenance',
    location: '',
    phone: '',
    description: '',
    hours: '8AM - 5PM'
  });

  const categories = [
    { id: 'utility-home', title: 'Home Essentials' },
    { id: 'utility-maintenance', title: 'Maintenance' },
    { id: 'utility-cleaning', title: 'Cleaning & Laundry' },
    { id: 'utility-security', title: 'Security & Safety' },
    { id: 'utility-kitchen', title: 'Kitchen & Food' },
    { id: 'utility-shops', title: 'Local Shops' },
    { id: 'utility-moving', title: 'Moving & Logistics' },
    { id: 'utility-installations', title: 'Installations' },
    { id: 'utility-personal', title: 'Personal Services' },
    { id: 'utility-community', title: 'Community Dashboard' },
  ];

  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.phone) {
      toast.error("Please provide both name and contact information.");
      return;
    }

    addUtilityProvider({
      ...newVendor,
      verified: false,
      isRecommended: false,
      isHidden: false,
      rating: 0
    });

    toast.success("Vendor added to the ecosystem! Verification is pending.");
    setIsOpen(false);
    setNewVendor({
      name: '',
      categoryId: defaultCategoryId,
      category: categories.find(c => c.id === defaultCategoryId)?.title.split(' ')[0] || 'General',
      location: '',
      phone: '',
      description: '',
      hours: '8AM - 5PM'
    });
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={16} /> Add Vendor
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl p-0 overflow-hidden border-none shadow-2xl font-sans">
        <div className="bg-slate-900 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
              <Zap className="text-primary fill-primary" size={20} />
              Integrate New Vendor
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Contribute a trusted service provider to the JengaSafe regional registry.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-8 space-y-5">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Vendor Legal Name</Label>
            <Input 
              placeholder="e.g. Westlands Electrical Ltd" 
              value={newVendor.name} 
              onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
              className="bg-slate-50 border-slate-200 font-bold h-12 rounded-xl focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sector Category</Label>
              <Select 
                value={newVendor.categoryId} 
                onValueChange={(val) => {
                  const cat = categories.find(c => c.id === val);
                  setNewVendor({
                    ...newVendor, 
                    categoryId: val, 
                    category: cat?.title.split(' ')[0] || 'General'
                  });
                }}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 h-12 rounded-xl font-bold">
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id} className="font-medium">{cat.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact Line</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <Input 
                  placeholder="+254 XXX XXX XXX" 
                  value={newVendor.phone} 
                  onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
                  className="bg-slate-50 border-slate-200 h-12 pl-9 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Operational Zone</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <Input 
                placeholder="e.g. Kilimani, Nairobi" 
                value={newVendor.location} 
                onChange={(e) => setNewVendor({...newVendor, location: e.target.value})}
                className="bg-slate-50 border-slate-200 h-12 pl-9 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Profile Narrative</Label>
            <textarea 
              className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary font-bold transition-all placeholder:font-medium resize-none shadow-inner"
              placeholder="Detail the services and reliability markers..."
              value={newVendor.description}
              onChange={(e) => setNewVendor({...newVendor, description: e.target.value})}
            />
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
            <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <p className="text-[10px] leading-tight text-amber-700 font-bold uppercase tracking-wider">
              Note: All user-contributed vendors undergo a 24-hour institutional verification protocol before being marked as 'curated'.
            </p>
          </div>
        </div>

        <div className="px-8 pb-8 flex items-center gap-3">
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex-1 font-black uppercase tracking-widest text-[10px] text-slate-400 h-12 hover:bg-slate-100">
            Cancel
          </Button>
          <Button onClick={handleAddVendor} className="flex-1 font-black uppercase tracking-widest text-[10px] bg-slate-900 text-white h-12 shadow-xl shadow-slate-200">
            Synchronize Vendor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddVendorDialog;
