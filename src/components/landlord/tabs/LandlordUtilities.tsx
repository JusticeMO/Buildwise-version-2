import React, { useState } from 'react';
import { 
  Home, Settings2, Sparkles, ShieldCheck, UtensilsCrossed, Search, Truck, 
  MonitorSmartphone, UserRound, Bell, Zap, Plus, Settings, ArrowLeft, 
  Star, Eye, EyeOff, CheckCircle2, Pencil, Trash2, Globe, Phone, Clock, Info
} from 'lucide-react';
import { toast } from 'sonner';
import Button from '@/components/shared/Button';
import { Badge } from '@/components/ui/badge';
import { 
  getUtilityProviders, updateUtilityProvider, addUtilityProvider, deleteUtilityProvider, UtilityProvider 
} from '@/data/sharedMockData';
import { Card } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UtilityCategoryProps {
  icon: React.ReactNode;
  title: string;
  tags: string;
  onClick: () => void;
  count: number;
}

const UtilityCategory = ({ icon, title, tags, onClick, count }: UtilityCategoryProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-5 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/30 transition-all text-left group"
  >
    <div className="flex justify-between w-full mb-3">
      <div className="p-2 rounded-lg bg-secondary/30 group-hover:bg-primary/10 transition-colors">{icon}</div>
      <Badge variant="secondary" className="text-[10px] h-5">{count} Vendors</Badge>
    </div>
    <h3 className="font-semibold text-sm">{title}</h3>
    <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{tags}</p>
  </button>
);

const LandlordUtilities = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [providers, setProviders] = useState<UtilityProvider[]>(getUtilityProviders());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Partial<UtilityProvider> | null>(null);

  const categories = [
    { id: 'utility-home', icon: <Home size={22} className="text-primary" />, title: 'Home Essentials', tags: 'Internet, Water, Electricity, Gas' },
    { id: 'utility-maintenance', icon: <Settings2 size={22} className="text-muted-foreground" />, title: 'Maintenance', tags: 'Plumbing, Repairs, Handyman' },
    { id: 'utility-cleaning', icon: <Sparkles size={22} className="text-green-600" />, title: 'Cleaning & Laundry', tags: 'Deep Clean, Sofa Washing' },
    { id: 'utility-security', icon: <ShieldCheck size={22} className="text-red-500" />, title: 'Security & Safety', tags: 'CCTV, Alarm, Smart Locks' },
    { id: 'utility-kitchen', icon: <UtensilsCrossed size={22} className="text-orange-500" />, title: 'Kitchen & Food', tags: 'Groceries, Butcheries' },
    { id: 'utility-shops', icon: <Search size={22} className="text-muted-foreground" />, title: 'Local Shops', tags: 'Hardware, Furnitures' },
    { id: 'utility-moving', icon: <Truck size={22} className="text-blue-500" />, title: 'Moving & Logistics', tags: 'Trucks, Storage' },
    { id: 'utility-installations', icon: <MonitorSmartphone size={22} className="text-teal-500" />, title: 'Installations', tags: 'Solar, Painting' },
    { id: 'utility-personal', icon: <UserRound size={22} className="text-pink-500" />, title: 'Personal Services', tags: 'Tutors, Fitness' },
    { id: 'utility-community', icon: <Bell size={22} className="text-muted-foreground" />, title: 'Community Dashboard', tags: 'Local Events, Alerts' },
  ];

  const handleToggleHide = (id: string, currentHidden: boolean) => {
    updateUtilityProvider(id, { isHidden: !currentHidden });
    setProviders(getUtilityProviders());
    toast.success(currentHidden ? "Provider unhidden" : "Provider hidden from tenants");
  };

  const handleToggleRecommend = (id: string, currentRec: boolean) => {
    updateUtilityProvider(id, { isRecommended: !currentRec });
    setProviders(getUtilityProviders());
    toast.success(currentRec ? "Recommendation removed" : "Provider marked as recommended");
  };

  const handleOpenEditor = (provider?: UtilityProvider) => {
    if (provider) {
      setEditingProvider({ ...provider });
    } else {
      setEditingProvider({
        categoryId: selectedCategory || 'utility-home',
        category: categories.find(c => c.id === (selectedCategory || 'utility-home'))?.title.split(' ')[0] || 'General',
        verified: false,
        isRecommended: false,
        isHidden: false,
        rating: 0
      });
    }
    setIsEditorOpen(true);
  };

  const handleSaveProvider = () => {
    if (!editingProvider?.name || !editingProvider?.categoryId) {
      toast.error("Please fill in required fields.");
      return;
    }

    if (editingProvider.id) {
      updateUtilityProvider(editingProvider.id, editingProvider);
      toast.success("Provider updated successfully.");
    } else {
      addUtilityProvider(editingProvider as any);
      toast.success("New provider integrated into ecosystem.");
    }

    setProviders(getUtilityProviders());
    setIsEditorOpen(false);
    setEditingProvider(null);
  };

  const handleRemoveProvider = (id: string) => {
    deleteUtilityProvider(id);
    setProviders(getUtilityProviders());
    toast.success("Provider removed from registry.");
  };

  if (selectedCategory) {
    const categoryProviders = providers.filter(p => p.categoryId === selectedCategory);
    const categoryTitle = categories.find(c => c.id === selectedCategory)?.title;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Back to Categories
          </button>
          <Button onClick={() => handleOpenEditor()} className="flex items-center gap-2">
            <Plus size={16} /> Add Provider
          </Button>
        </div>

        <div className="flex justify-between items-center bg-card border rounded-xl p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {categoryTitle}
            </h2>
            <p className="text-sm text-muted-foreground">Manage service providers for this category.</p>
          </div>
          <Badge variant="outline">Registry Management</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {categoryProviders.map((provider) => (
            <Card key={provider.id} className={`p-5 border-l-4 transition-all ${provider.isHidden ? 'bg-slate-50 border-l-slate-300 opacity-60' : 'border-l-primary shadow-sm'}`}>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary/30 flex items-center justify-center">
                    <CheckCircle2 className={provider.verified ? "text-green-500" : "text-slate-300"} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{provider.name}</h3>
                      {provider.isRecommended && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Recommended</Badge>}
                      {provider.isHidden && <Badge variant="outline" className="text-slate-500">Hidden</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{provider.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-[11px] font-medium"><Star size={12} className="text-amber-400 fill-amber-400" /> {provider.rating}</span>
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{provider.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-lg overflow-hidden mr-2">
                    <button 
                      onClick={() => handleOpenEditor(provider)}
                      className="p-2 hover:bg-slate-100 text-slate-500 transition-colors border-r"
                    >
                      <Pencil size={14} />
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-2 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Provider?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {provider.name}? This will hide them from all tenants.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveProvider(provider.id)} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleToggleRecommend(provider.id, provider.isRecommended)}
                    className={`flex items-center gap-2 h-9 ${provider.isRecommended ? 'border-amber-300 text-amber-700 bg-amber-50/50' : ''}`}
                  >
                    <Star size={14} className={provider.isRecommended ? "fill-amber-700" : ""} />
                    {provider.isRecommended ? 'Unrecommend' : 'Recommend'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleToggleHide(provider.id, provider.isHidden)}
                    className="flex items-center gap-2 h-9"
                  >
                    {provider.isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                    {provider.isHidden ? 'Show Tenant' : 'Hide Tenant'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {categoryProviders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed">
              <p className="text-muted-foreground text-sm">No providers found in this category.</p>
              <Button variant="outline" className="mt-4" onClick={() => handleOpenEditor()}>
                Add First Provider
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-amber-500" />
            Utilities Ecosystem
          </h2>
          <p className="text-sm text-muted-foreground">Manage the services and utilities available to your tenants.</p>
        </div>
        <Button onClick={() => handleOpenEditor()} className="flex items-center gap-2">
          <Plus size={16} /> Integrate Provider
        </Button>
      </div>

      {/* Analytics Banner */}
      <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Curated Ecosystem</h3>
            <p className="text-sm text-muted-foreground">
              You have {providers.filter(p => !p.isHidden).length} active vendors. 
              {providers.filter(p => p.isRecommended).length} recommended.
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => toast.info('Access Audit Log')} className="flex items-center gap-2">
          <Settings size={16} /> Ecosystem Settings
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4">Service Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <UtilityCategory
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              tags={cat.tags}
              count={providers.filter(p => p.categoryId === cat.id).length}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>{editingProvider?.id ? 'Edit Provider' : 'Add New Provider'}</DialogTitle>
            <DialogDescription>
              Configure the details for this service utility.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Provider Name</Label>
              <Input 
                placeholder="e.g. Safaricom Home" 
                value={editingProvider?.name || ''} 
                onChange={(e) => setEditingProvider({...editingProvider, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={editingProvider?.categoryId} 
                onValueChange={(val) => {
                  const cat = categories.find(c => c.id === val);
                  setEditingProvider({
                    ...editingProvider, 
                    categoryId: val, 
                    category: cat?.title.split(' ')[0] || 'General'
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  placeholder="e.g. Westlands" 
                  value={editingProvider?.location || ''} 
                  onChange={(e) => setEditingProvider({...editingProvider, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input 
                  placeholder="Contact number" 
                  value={editingProvider?.phone || ''} 
                  onChange={(e) => setEditingProvider({...editingProvider, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea 
                className="w-full h-20 p-2 border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Brief description..."
                value={editingProvider?.description || ''}
                onChange={(e) => setEditingProvider({...editingProvider, description: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="verified" 
                checked={editingProvider?.verified} 
                onChange={(e) => setEditingProvider({...editingProvider, verified: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="verified">Verified Provider</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditorOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProvider}>Save Provider</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordUtilities;
