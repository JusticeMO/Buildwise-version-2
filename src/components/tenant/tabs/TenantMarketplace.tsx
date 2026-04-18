
import React, { useState, useMemo } from 'react';
import { Search, MapPin, BedDouble, Building, RefreshCw, ChevronLeft, Image as ImageIcon, Map as MapIcon, Video, Layout, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { getMarketplaceProperties } from '@/data/mockData';
import { getTenantContext, markAccessFeePaid } from '@/data/sharedMockData';

const TenantMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'map' | 'tour' | 'media'>('overview');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  
  const tenantContext = getTenantContext();
  const hasAccess = tenantContext.hasAccessFeePaid;
  
  const properties = useMemo(() => getMarketplaceProperties(), []);
  
  const filteredProperties = useMemo(() => properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  ), [properties, searchQuery]);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId);

  const handlePayment = () => {
    setIsPaying(true);
    setPaymentProgress(10);
    
    const interval = setInterval(() => {
      setPaymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 500);

    setTimeout(() => {
      markAccessFeePaid();
      setIsPaying(false);
      toast.success("Access Fee Paid! You now have full access to all available units.");
    }, 4000);
  };

  const renderBadge = (status: string, availableFrom?: string) => {
    switch (status) {
      case 'vacant':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-xs">Vacant</Badge>;
      case 'vacating':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-xs">Available from {availableFrom}</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none text-xs">Occupied</Badge>;
    }
  };

  if (!hasAccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="bg-primary/10 p-6 rounded-full mb-8 relative">
          <Lock className="text-primary w-12 h-12" />
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-lg shadow-sm">
            <ShieldCheck className="text-green-500 w-6 h-6" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Marketplace Access Required</h2>
        <p className="max-w-md text-muted-foreground mb-8">
          To ensure high-quality leads and seamless property processing, a non-refundable access fee of 
          <span className="font-bold text-foreground mx-1">KES 1,000</span> is required for all new household seekers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-10 text-left">
          <div className="bg-card border border-border p-4 rounded-xl flex gap-3">
            <div className="bg-green-100 p-2 h-fit rounded-lg text-green-700">
              <Building size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Full Access</p>
              <p className="text-xs text-muted-foreground">Unlock all available units across our entire verified portfolio.</p>
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-xl flex gap-3">
            <div className="bg-blue-100 p-2 h-fit rounded-lg text-blue-700">
              <RefreshCw size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Valid Until Onboarded</p>
              <p className="text-xs text-muted-foreground">This fee is valid until you find, book, and are successfully onboarded to a unit.</p>
            </div>
          </div>
        </div>

        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-base font-bold rounded-full shadow-xl shadow-primary/20"
          onClick={handlePayment}
        >
          Pay KES 1,000 via M-Pesa to Unlock
        </Button>
        
        <p className="mt-6 text-xs text-muted-foreground flex items-center gap-2">
          <CreditCard size={14} /> Secured by M-Pesa Express • Non-refundable processing fee
        </p>

        <Dialog open={isPaying}>
          <DialogContent className="sm:max-w-md pointer-events-none">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="text-green-600" />
                M-Pesa Processing
              </DialogTitle>
              <DialogDescription>
                We've sent an STK push to your registered phone number. Please enter your PIN to complete the KES 1,000 payment.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <div className="flex justify-between mb-2 text-sm font-medium">
                <span>Processing Transaction...</span>
                <span>{paymentProgress}%</span>
              </div>
              <Progress value={paymentProgress} className="h-2" />
            </div>
            <DialogFooter className="text-center sm:justify-center">
              <p className="text-xs text-muted-foreground italic animate-pulse">
                Please do not close this window until the transaction completes.
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (selectedPropertyId && selectedProperty) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setSelectedPropertyId(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} /> Back to results
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{selectedProperty.title}</h2>
              {renderBadge(selectedProperty.units[0]?.status, selectedProperty.units[0]?.availableFrom)}
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" /> {selectedProperty.address}
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => toast.success('Tenancy application submitted! The landlord will review and respond shortly.')}>
            Apply for Tenancy
          </Button>
        </div>

        {/* Property Navigation */}
        <div className="flex border-b border-border bg-card rounded-t-xl overflow-hidden">
          {[
            { id: 'overview', label: 'Overview', icon: <Layout size={16} /> },
            { id: 'tour', label: 'VR Tour', icon: <Video size={16} /> },
            { id: 'map', label: 'Location', icon: <MapIcon size={16} /> },
            { id: 'media', label: 'Media', icon: <ImageIcon size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as 'overview' | 'map' | 'tour' | 'media')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                viewMode === tab.id 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground hover:bg-secondary/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* View Content */}
        <div className="bg-card rounded-b-xl border border-t-0 border-border p-6 min-h-[400px]">
          {viewMode === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <img 
                src={selectedProperty.imageUrl} 
                alt={selectedProperty.title} 
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-bold text-lg mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Experience luxury living at {selectedProperty.title}. This premium development features modern design, 
                    spacious interiors, and world-class amenities in the heart of the city. 
                    Conveniently located near major shopping malls and health centres.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Price Range</p>
                    <p className="font-bold">Ksh 45k - 75k</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Bedrooms</p>
                    <p className="font-bold">2 - 3 Beds</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Property Type</p>
                    <p className="font-bold">Apartment</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Developer</p>
                    <p className="font-bold">JengaSafe Build</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewMode === 'map' && (
            <div className="h-[400px] flex items-center justify-center bg-secondary/20 rounded-xl">
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-primary mb-4" />
                <p className="font-bold text-lg">Interactive Map</p>
                <p className="text-sm text-muted-foreground mt-1">Map integration placeholder</p>
              </div>
            </div>
          )}
          {viewMode === 'tour' && (
            <div className="flex items-center justify-center h-[400px] bg-foreground rounded-xl">
              <div className="text-center text-primary-foreground">
                <Video size={48} className="mx-auto mb-4 text-primary" />
                <p className="font-bold text-lg">360° Virtual Reality Tour</p>
                <button onClick={() => toast.info('VR tour loading... this feature is coming soon!')} className="mt-4 px-6 py-2 border border-primary-foreground rounded-full text-sm font-medium hover:bg-primary-foreground hover:text-foreground transition-all">
                  Launch Tour
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Explore Properties</h2>
          <p className="text-muted-foreground text-sm">Discover your next home across our verified property portfolio.</p>
        </div>
        <div className="flex gap-4 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-green-500" /> Vacant</div>
          <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-500" /> Occupied</div>
          <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Vacating Soon</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">Location or Property Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Search city, area or building..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Price Range (KES)</label>
            <div className="flex gap-2">
              <Input placeholder="Min" />
              <Input placeholder="Max" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setSearchQuery('')}>Reset</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1" onClick={() => toast.info(`Searching for "${searchQuery || 'all properties'}"...`)}>Search</Button>
          </div>
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => (
          <div 
            key={prop.id} 
            className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            onClick={() => setSelectedPropertyId(prop.id)}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={prop.imageUrl} 
                alt={prop.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                {renderBadge(prop.units[0]?.status, prop.units[0]?.availableFrom)}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{prop.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                <MapPin size={12} className="text-primary" /> {prop.address}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><BedDouble size={14} /> 2-3 Beds</span>
                  <span className="flex items-center gap-1"><Building size={14} /> Apartment</span>
                </div>
                <span className="text-sm font-bold text-amber-600">
                  Ksh {prop.units[0]?.rentAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredProperties.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-border rounded-xl">
            <RefreshCw size={32} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-sm font-medium text-muted-foreground">No properties found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantMarketplace;
