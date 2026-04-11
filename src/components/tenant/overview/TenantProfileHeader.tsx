
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Home } from 'lucide-react';

interface TenantProfileHeaderProps {
  lease: any;
}

const TenantProfileHeader: React.FC<TenantProfileHeaderProps> = ({ lease }) => {
  const tenantName = "John Tenant";
  const tenantEmail = "tenant@example.com";
  const registryId = lease ? `JS-ALPHA-${String(lease.id).slice(0, 2).toUpperCase()}` : 'JS-ALPHA-01';
  const unitNumber = lease?.unit?.unit_number || '3B';

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
      {/* Avatar */}
      <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-xl font-semibold text-muted-foreground border-2 border-border">
        j
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg font-bold tracking-tight">{tenantName}</h2>
          <Badge className="bg-amber-500/10 text-amber-700 border-amber-300 text-[10px] uppercase tracking-widest font-semibold">
            <CheckCircle size={12} className="mr-1" /> Verified
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{tenantEmail}</p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-widest border border-border rounded px-3 py-1">
            Registry: {registryId}
          </span>
          <Badge variant="outline" className="text-xs gap-1">
            <Home size={12} /> Unit {unitNumber}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TenantProfileHeader;
