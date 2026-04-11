
import React, { useState } from 'react';
import { Wrench, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const mockRequests = [
  { id: 1, title: 'Leaking kitchen faucet', status: 'in-progress', date: '2024-06-15', priority: 'medium' },
  { id: 2, title: 'Broken window latch - Bedroom', status: 'pending', date: '2024-06-20', priority: 'low' },
  { id: 3, title: 'AC not cooling properly', status: 'completed', date: '2024-06-10', priority: 'high' },
];

const TenantMaintenance = () => {
  const [requests] = useState(mockRequests);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'in-progress': return <Clock size={16} className="text-amber-500" />;
      default: return <AlertCircle size={16} className="text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Requests</h2>
          <p className="text-muted-foreground text-sm">Track and submit maintenance requests for your unit</p>
        </div>
        <button
          onClick={() => toast.info('Maintenance request form coming soon')}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:opacity-90"
        >
          <Plus size={16} /> New Request
        </button>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <div key={req.id} className="bg-white border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench size={18} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{req.title}</p>
                <p className="text-xs text-muted-foreground">Submitted: {req.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={req.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs capitalize">{req.priority}</Badge>
              <div className="flex items-center gap-1 text-xs capitalize">
                {statusIcon(req.status)}
                <span>{req.status.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantMaintenance;
