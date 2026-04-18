
import React, { useState } from 'react';
import { Wrench, Plus, Clock, CheckCircle, AlertCircle, Star, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  getMaintenanceByTenant,
  addMaintenanceRequest,
  getProviderById,
  type MaintenanceRequest,
} from '@/data/sharedMockData';

const statusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle size={16} className="text-green-500" />;
    case 'in-progress':
    case 'assigned': return <Clock size={16} className="text-amber-500" />;
    default: return <AlertCircle size={16} className="text-red-500" />;
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'Pending';
    case 'assigned': return 'Assigned';
    case 'in-progress': return 'In Progress';
    case 'completed': return 'Completed';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

const TenantMaintenance = () => {
  const tenantId = 'tenant-1';
  const [requests, setRequests] = useState<MaintenanceRequest[]>(getMaintenanceByTenant(tenantId));
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [newForm, setNewForm] = useState({ title: '', description: '', category: '', priority: 'medium' as const });

  const refreshRequests = () => setRequests(getMaintenanceByTenant(tenantId));

  const handleSubmit = () => {
    if (!newForm.title || !newForm.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    addMaintenanceRequest({
      tenantId,
      tenantName: 'John Doe',
      unitId: 'unit-1',
      unitLabel: 'Unit 3B',
      propertyName: 'Westlands Heights',
      title: newForm.title,
      description: newForm.description,
      category: newForm.category,
      priority: newForm.priority,
      status: 'pending',
    });

    toast.success('Maintenance request submitted! Your landlord will assign a service provider shortly.');
    setShowNewRequest(false);
    setNewForm({ title: '', description: '', category: '', priority: 'medium' });
    refreshRequests();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Requests</h2>
          <p className="text-muted-foreground text-sm">Track and submit maintenance requests for your unit</p>
        </div>
        <Button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> New Request
        </Button>
      </div>

      <div className="space-y-3">
        {requests.map((req) => {
          const provider = req.assignedProviderId ? getProviderById(req.assignedProviderId) : null;

          return (
            <div
              key={req.id}
              className="bg-white border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => setSelectedRequest(req)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wrench size={18} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{req.title}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {req.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={req.priority === 'high' || req.priority === 'emergency' ? 'destructive' : 'secondary'} className="text-xs capitalize">
                    {req.priority}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs capitalize">
                    {statusIcon(req.status)}
                    <span>{statusLabel(req.status)}</span>
                  </div>
                </div>
              </div>

              {/* Show assigned provider info */}
              {provider && (
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <User size={12} />
                  <span>Assigned to <strong className="text-foreground">{provider.name}</strong></span>
                  <span className="flex items-center gap-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    {provider.rating}
                  </span>
                  {req.estimatedCost && (
                    <span>· Est. KES {req.estimatedCost.toLocaleString()}</span>
                  )}
                </div>
              )}

              {/* Show manager note */}
              {req.assignedManagerNote && (
                <div className="mt-2 text-xs bg-blue-50 text-blue-800 p-2 rounded">
                  <strong>Manager:</strong> {req.assignedManagerNote}
                </div>
              )}
            </div>
          );
        })}

        {requests.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Wrench size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No maintenance requests</p>
            <p className="text-sm">Submit a request when you need something fixed</p>
          </div>
        )}
      </div>

      {/* New Request Dialog */}
      <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogTitle>New Maintenance Request</DialogTitle>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm font-medium">Issue Title *</Label>
              <Input
                value={newForm.title}
                onChange={(e) => setNewForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Leaking kitchen faucet"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Category *</Label>
              <Select value={newForm.category} onValueChange={(v) => setNewForm(prev => ({ ...prev, category: v }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="hvac">HVAC / Air Conditioning</SelectItem>
                  <SelectItem value="carpentry">Carpentry / Doors & Windows</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="locks">Locks & Security</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="general">General / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={newForm.priority} onValueChange={(v: any) => setNewForm(prev => ({ ...prev, priority: v }))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low — Not urgent</SelectItem>
                  <SelectItem value="medium">Medium — Needs attention soon</SelectItem>
                  <SelectItem value="high">High — Needs immediate attention</SelectItem>
                  <SelectItem value="emergency">Emergency — Danger to person/property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Description</Label>
              <Textarea
                value={newForm.description}
                onChange={(e) => setNewForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue in detail..."
                rows={4}
                className="mt-1.5"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Detail Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="bg-white sm:max-w-md">
            <DialogTitle>{selectedRequest.title}</DialogTitle>
            <div className="space-y-3 mt-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Status:</span> <Badge className="ml-1 text-xs capitalize">{statusLabel(selectedRequest.status)}</Badge></div>
                <div><span className="text-muted-foreground">Priority:</span> <Badge variant={selectedRequest.priority === 'high' ? 'destructive' : 'secondary'} className="ml-1 text-xs capitalize">{selectedRequest.priority}</Badge></div>
                <div><span className="text-muted-foreground">Category:</span> <span className="capitalize font-medium">{selectedRequest.category}</span></div>
                <div><span className="text-muted-foreground">Submitted:</span> <span className="font-medium">{selectedRequest.createdAt}</span></div>
              </div>

              {selectedRequest.description && (
                <div>
                  <p className="text-muted-foreground mb-1">Description:</p>
                  <p>{selectedRequest.description}</p>
                </div>
              )}

              {selectedRequest.assignedProviderId && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-xs font-semibold text-green-800 mb-1">Assigned Service Provider</p>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-green-700" />
                    <span className="font-medium">{getProviderById(selectedRequest.assignedProviderId)?.name}</span>
                    <span className="flex items-center gap-0.5 text-xs">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      {getProviderById(selectedRequest.assignedProviderId)?.rating}
                    </span>
                  </div>
                  {selectedRequest.estimatedCost && (
                    <p className="text-xs text-green-700 mt-1">Estimated cost: KES {selectedRequest.estimatedCost.toLocaleString()}</p>
                  )}
                </div>
              )}

              {selectedRequest.assignedManagerNote && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-xs font-semibold text-blue-800 mb-1">Manager Note</p>
                  <p className="text-blue-700">{selectedRequest.assignedManagerNote}</p>
                </div>
              )}

              {selectedRequest.completionDate && (
                <div className="bg-secondary/20 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Completed on</p>
                  <p className="font-bold">{selectedRequest.completionDate}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TenantMaintenance;
