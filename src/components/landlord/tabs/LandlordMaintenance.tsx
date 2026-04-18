
import React, { useState, useMemo } from 'react';
import { Wrench, Plus, Clock, CheckCircle, AlertCircle, User, Star, Phone, MapPin, ChevronRight, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  getMaintenanceRequests,
  assignMaintenanceProvider,
  updateMaintenanceStatus,
  serviceProviders,
  getProviderById,
  getProvidersByCategory,
  type MaintenanceRequest,
  type MaintenanceStatus as MaintStatus,
  type ServiceProvider,
} from '@/data/sharedMockData';

const statusColors: Record<string, string> = {
  pending: 'bg-red-100 text-red-800',
  assigned: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-orange-100 text-orange-700',
  emergency: 'bg-red-100 text-red-700',
};

const LandlordMaintenance = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(getMaintenanceRequests());
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showProviderDirectory, setShowProviderDirectory] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [assignForm, setAssignForm] = useState({ providerId: '', note: '', estimatedCost: '' });

  const refreshRequests = () => setRequests(getMaintenanceRequests());

  const handleAssignProvider = () => {
    if (!selectedRequest || !assignForm.providerId) {
      toast.error('Please select a service provider');
      return;
    }
    assignMaintenanceProvider(
      selectedRequest.id,
      assignForm.providerId,
      assignForm.note,
      parseInt(assignForm.estimatedCost) || 0
    );
    toast.success('Service provider assigned successfully!');
    setShowAssignDialog(false);
    setAssignForm({ providerId: '', note: '', estimatedCost: '' });
    refreshRequests();
    setSelectedRequest(null);
  };

  const handleStatusUpdate = (requestId: string, newStatus: MaintStatus) => {
    updateMaintenanceStatus(requestId, newStatus);
    toast.success(`Request updated to "${newStatus}"`);
    refreshRequests();
    setSelectedRequest(null);
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const activeCount = requests.filter(r => ['assigned', 'in-progress'].includes(r.status)).length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  const filteredProviders = useMemo(() => {
    if (categoryFilter === 'all') return [...serviceProviders].sort((a, b) => b.rating - a.rating);
    return getProvidersByCategory(categoryFilter as ServiceProvider['category']);
  }, [categoryFilter]);

  // ─── Provider Directory View ─────────────────────
  if (showProviderDirectory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Service Provider Directory</h2>
            <p className="text-muted-foreground text-sm">Rated and ranked professionals ready for assignment</p>
          </div>
          <Button variant="outline" onClick={() => setShowProviderDirectory(false)}>
            ← Back to Requests
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'plumber', 'electrician', 'painter', 'carpenter', 'cleaner', 'locksmith', 'hvac', 'general'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60'
              }`}
            >
              {cat === 'all' ? 'All Trades' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{provider.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{provider.category}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${
                  provider.availability === 'available' ? 'bg-green-100 text-green-700' :
                  provider.availability === 'busy' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {provider.availability}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  {provider.rating}/5
                </span>
                <span>{provider.completedJobs} jobs</span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {provider.location}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {provider.specialties.map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-secondary/40 rounded-full">{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm font-bold">KES {provider.hourlyRate.toLocaleString()}/hr</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.success(`Calling ${provider.name}...`)}>
                    <Phone size={12} className="mr-1" /> Call
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Main Maintenance View ─────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Management</h2>
          <p className="text-muted-foreground text-sm">Track, assign, and resolve tenant maintenance requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowProviderDirectory(true)}>
            <User size={16} className="mr-2" /> Service Providers
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle size={18} className="text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Pending Assignment</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock size={18} className="text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{activeCount}</p>
            <p className="text-xs text-muted-foreground">Active / In Progress</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">All Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/20">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium">Tenant / Unit</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Issue</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Priority</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Assigned To</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => {
                const provider = req.assignedProviderId ? getProviderById(req.assignedProviderId) : null;
                return (
                  <tr key={req.id} className="border-b">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{req.tenantName}</p>
                      <p className="text-xs text-muted-foreground">{req.unitLabel} · {req.propertyName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{req.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{req.category}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs capitalize ${priorityColors[req.priority]}`}>{req.priority}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs capitalize ${statusColors[req.status]}`}>{req.status.replace('-', ' ')}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {provider ? (
                        <div className="flex items-center gap-1.5 text-sm">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          {provider.name}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {req.status === 'pending' && (
                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              setSelectedRequest(req);
                              setShowAssignDialog(true);
                            }}
                          >
                            Assign
                          </Button>
                        )}
                        {req.status === 'assigned' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleStatusUpdate(req.id, 'in-progress')}
                          >
                            Start Work
                          </Button>
                        )}
                        {req.status === 'in-progress' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs bg-green-50 hover:bg-green-100 text-green-700"
                            onClick={() => handleStatusUpdate(req.id, 'completed')}
                          >
                            <CheckCircle size={12} className="mr-1" /> Complete
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => setSelectedRequest(req)}
                        >
                          Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Provider Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="bg-white sm:max-w-lg">
          <DialogTitle>Assign Service Provider</DialogTitle>
          {selectedRequest && (
            <div className="space-y-4 mt-2">
              <div className="bg-secondary/20 p-3 rounded-lg text-sm">
                <p className="font-medium">{selectedRequest.title}</p>
                <p className="text-xs text-muted-foreground">{selectedRequest.tenantName} · {selectedRequest.unitLabel}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Select Provider</Label>
                <Select value={assignForm.providerId} onValueChange={(v) => setAssignForm(prev => ({ ...prev, providerId: v }))}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Choose a service provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceProviders
                      .filter(p => p.availability === 'available')
                      .sort((a, b) => b.rating - a.rating)
                      .map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} — {p.category} ★{p.rating} ({p.location})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Manager Note</Label>
                <Textarea
                  value={assignForm.note}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="Instructions or notes for the provider..."
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Estimated Cost (KES)</Label>
                <Input
                  type="number"
                  value={assignForm.estimatedCost}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, estimatedCost: e.target.value }))}
                  placeholder="e.g. 3000"
                  className="mt-1.5"
                />
              </div>

              <Button onClick={handleAssignProvider} className="w-full">
                <Send size={14} className="mr-2" /> Assign Provider
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Detail Dialog */}
      {selectedRequest && !showAssignDialog && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="bg-white sm:max-w-lg">
            <DialogTitle>{selectedRequest.title}</DialogTitle>
            <div className="space-y-4 mt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Tenant:</span> <span className="font-medium">{selectedRequest.tenantName}</span></div>
                <div><span className="text-muted-foreground">Unit:</span> <span className="font-medium">{selectedRequest.unitLabel}</span></div>
                <div><span className="text-muted-foreground">Priority:</span> <Badge className={`text-xs capitalize ml-1 ${priorityColors[selectedRequest.priority]}`}>{selectedRequest.priority}</Badge></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge className={`text-xs capitalize ml-1 ${statusColors[selectedRequest.status]}`}>{selectedRequest.status}</Badge></div>
                <div><span className="text-muted-foreground">Submitted:</span> <span className="font-medium">{selectedRequest.createdAt}</span></div>
                {selectedRequest.estimatedCost && <div><span className="text-muted-foreground">Est. Cost:</span> <span className="font-medium">KES {selectedRequest.estimatedCost.toLocaleString()}</span></div>}
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Description:</p>
                <p>{selectedRequest.description}</p>
              </div>
              {selectedRequest.assignedProviderId && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-blue-800 mb-1">Assigned Provider</p>
                  <p className="font-medium">{getProviderById(selectedRequest.assignedProviderId)?.name}</p>
                  {selectedRequest.assignedManagerNote && <p className="text-xs text-muted-foreground mt-1">{selectedRequest.assignedManagerNote}</p>}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LandlordMaintenance;
