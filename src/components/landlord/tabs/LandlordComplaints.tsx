
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Search, Filter, MessageSquare, AlertCircle, CheckCircle2, MoreVertical, Building, User } from 'lucide-react';
import { toast } from 'sonner';
import { getComplaints, respondToComplaint, Complaint } from '@/data/sharedMockData';

const LandlordComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(getComplaints());
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [filter, setFilter] = useState<'all' | 'submitted' | 'in-progress' | 'resolved'>('all');

  const handleResponse = (newStatus: Complaint['status']) => {
    if (!selectedComplaint) return;
    if (!response && newStatus !== 'resolved') {
      toast.error("Please provide a response/note.");
      return;
    }

    respondToComplaint(selectedComplaint.id, response, newStatus);
    setComplaints(getComplaints());
    setIsResponding(false);
    setSelectedComplaint(null);
    setResponse('');
    toast.success(`Complaint status updated to ${newStatus}`);
  };

  const filteredComplaints = complaints.filter(c => 
    filter === 'all' ? true : c.status === filter
  );

  const getUrgencyBadge = (u: string) => {
    switch (u) {
      case 'emergency': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Emergency</Badge>;
      case 'high': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">High</Badge>;
      case 'medium': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Medium</Badge>;
      default: return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none">Low</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Resolved</Badge>;
      case 'in-progress': return <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">In Progress</Badge>;
      default: return <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 uppercase text-[10px]">Pending Review</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tenant Complaints</h2>
          <p className="text-sm text-muted-foreground">Manage and resolve formal feedback from your property tenants.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search complaints..." 
              className="pl-9 pr-4 py-2 bg-white border border-border rounded-md text-sm w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={16} /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Active', count: complaints.filter(c => c.status !== 'resolved').length, icon: <MessageSquare size={18} />, color: 'bg-primary' },
          { label: 'High Urgency', count: complaints.filter(c => (c.urgency === 'high' || c.urgency === 'emergency') && c.status !== 'resolved').length, icon: <AlertCircle size={18} />, color: 'bg-red-500' },
          { label: 'In Progress', count: complaints.filter(c => c.status === 'in-progress').length, icon: <Clock size={18} />, color: 'bg-blue-500' },
          { label: 'Resolved Today', count: 0, icon: <CheckCircle2 size={18} />, color: 'bg-green-500' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-lg text-white ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 mb-4 border-b pb-4">
        {['all', 'submitted', 'in-progress', 'resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
          >
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredComplaints.map((comp) => (
          <Card key={comp.id} className="p-0 overflow-hidden hover:shadow-md transition-all border-border/50 group">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 p-5 bg-secondary/10 border-r border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <User size={14} className="text-primary" />
                  <span className="text-sm font-bold truncate">{comp.tenantName}</span>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building size={12} />
                    <span>{comp.propertyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span>{comp.unitLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-2 border-t">
                    <Clock size={12} />
                    <span>{comp.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-5 relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-base">{comp.subject}</h4>
                    {getUrgencyBadge(comp.urgency)}
                  </div>
                  {getStatusBadge(comp.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2 italic">
                  "{comp.description}"
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize text-[10px] py-0">{comp.type}</Badge>
                    {comp.landlordResponse && (
                      <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={10} /> Response Sent
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8"
                      onClick={() => {
                        setSelectedComplaint(comp);
                        setIsResponding(true);
                      }}
                    >
                      {comp.landlordResponse ? 'Update Response' : 'Take Action'}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredComplaints.length === 0 && (
          <div className="py-20 text-center bg-white rounded-xl border-2 border-dashed border-border">
            <MessageSquare size={48} className="mx-auto text-muted-foreground/20 mb-4" />
            <p className="font-medium text-muted-foreground">No complaints found in this category.</p>
          </div>
        )}
      </div>

      {/* Response Dialog */}
      <Dialog open={isResponding} onOpenChange={setIsResponding}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Respond to Complaint</DialogTitle>
            <DialogDescription>
              Address the issue reported by {selectedComplaint?.tenantName}. Your response will be visible on their dashboard.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Issue Reported:</p>
              <p className="text-sm">{selectedComplaint?.description}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold">Your Response / Internal Notes</label>
              <Textarea 
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleResponse('in-progress')}
              >
                Mark In Progress
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleResponse('resolved')}
              >
                Resolve & Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Clock = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default LandlordComplaints;
