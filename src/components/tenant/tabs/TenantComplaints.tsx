
import React, { useState } from 'react';
import { CheckCircle, Upload, MessageSquare, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Button from '@/components/shared/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getComplaintsByTenant, addComplaint } from '@/data/sharedMockData';

const TenantComplaints = () => {
  const [complaintType, setComplaintType] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<any>("medium");
  
  const tenantId = "tenant-1"; // Mocked current tenant
  const complaints = getComplaintsByTenant(tenantId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintType || !subject || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    addComplaint({
      tenantId,
      tenantName: "John Doe",
      unitLabel: "Unit 3B",
      propertyName: "Westlands Heights",
      type: complaintType,
      subject,
      description,
      urgency,
    });

    toast.success("Complaint submitted successfully. Our team will review it shortly.");
    setComplaintType("");
    setSubject("");
    setDescription("");
  };

  const getUrgencyColor = (u: string) => {
    switch (u) {
      case 'emergency': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return <Badge className="bg-green-100 text-green-700 border-none">Resolved</Badge>;
      case 'in-progress': return <Badge className="bg-blue-100 text-blue-700 border-none">In Progress</Badge>;
      default: return <Badge className="bg-amber-100 text-amber-700 border-none uppercase text-[10px]">Submitted</Badge>;
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Complaints & Feedback</h2>
        <p className="text-sm text-muted-foreground">Submit issues directly to property management for resolution.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-primary" size={20} />
              New Formal Complaint
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="complaint-type" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Complaint Type</Label>
                  <Select value={complaintType} onValueChange={setComplaintType}>
                    <SelectTrigger className="mt-1.5 h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance Issue</SelectItem>
                      <SelectItem value="noise">Noise Complaint</SelectItem>
                      <SelectItem value="security">Security Concern</SelectItem>
                      <SelectItem value="billing">Billing Problem</SelectItem>
                      <SelectItem value="neighbor">Neighbor Dispute</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="urgency" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Urgency Level</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger className="mt-1.5 h-11">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Routine</SelectItem>
                      <SelectItem value="medium">Medium - 48 Hours</SelectItem>
                      <SelectItem value="high">High - Urgent</SelectItem>
                      <SelectItem value="emergency">Emergency - Immediate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Subject</Label>
                <Input 
                  id="subject" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5 h-11" 
                  placeholder="e.g. Excessive noise from neighboring unit" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Detailed Description</Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 min-h-[120px]" 
                  placeholder="Please provide specifics: dates, times, and impact..."
                />
              </div>
              
              <div className="p-4 bg-secondary/20 rounded-xl border border-dashed border-muted-foreground/30 text-center cursor-pointer hover:bg-secondary/30 transition-all">
                <Upload className="mx-auto text-muted-foreground mb-2" size={20} />
                <p className="text-xs font-medium">Attach Supporting Evidence</p>
                <p className="text-[10px] text-muted-foreground mt-1">Photos, videos, or documents (Max 5MB)</p>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <AlertTriangle size={18} className="shrink-0 text-amber-600" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Institutional Review: Formal complaints are logged in the property ledger and cannot be deleted once submitted.
                </p>
              </div>
              
              <Button type="submit" className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20">
                Submit Formal Complaint
              </Button>
            </form>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Recent Complaints
            </h3>
            <div className="space-y-3">
              {complaints.map((comp) => (
                <div key={comp.id} className="p-3 border rounded-lg hover:border-primary/30 transition-all cursor-default group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-xs truncate max-w-[120px]">{comp.subject}</p>
                    {getStatusBadge(comp.status)}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{comp.createdAt}</span>
                    <span className={`px-1.5 py-0.5 rounded ${getUrgencyColor(comp.urgency)}`}>{comp.urgency}</span>
                  </div>
                  {comp.landlordResponse && (
                    <div className="mt-2 p-2 bg-primary/5 rounded border-l-2 border-primary text-[10px] italic">
                      " {comp.landlordResponse} "
                    </div>
                  )}
                </div>
              ))}
              {complaints.length === 0 && (
                <p className="text-xs text-center text-muted-foreground py-4">No recent complaints found.</p>
              )}
            </div>
            {complaints.length > 3 && (
              <Button variant="ghost" size="sm" className="mt-4 w-full text-[11px] font-bold" onClick={() => toast.info('Historical data is archived in the audit logs.')}>
                View Historical Ledger
              </Button>
            )}
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-sm mb-4">Guidelines & FAQ</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Specific Evidence</p>
                  <p className="text-[11px] text-muted-foreground">Always attach timestamps or media for faster resolution.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Privacy Ledger</p>
                  <p className="text-[11px] text-muted-foreground">Complaints are private between you and the management team.</p>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-[10px] font-black uppercase text-red-600 tracking-wider mb-1">Emergency Support</p>
                <p className="text-xs font-bold text-red-800">+254 700 123 456</p>
                <p className="text-[10px] text-red-700 mt-1 italic">For life-threatening issues, call locally available emergency services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantComplaints;
