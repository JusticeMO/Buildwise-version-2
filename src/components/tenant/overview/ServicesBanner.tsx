
import React from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';

interface ServicesBannerProps {
  onEnterHub: () => void;
}

const ServicesBanner: React.FC<ServicesBannerProps> = ({ onEnterHub }) => {
  return (
    <div className="space-y-4">
      {/* Utilities Hub Banner */}
      <div className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-base">In-App Services & Utilities</h3>
          <p className="text-sm text-muted-foreground">Manage internet, groceries, cleaning, and maintenance.</p>
        </div>
        <button
          onClick={onEnterHub}
          className="bg-amber-500 hover:bg-amber-600 text-foreground font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          Enter Hub <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Move-out Notice */}
      <button className="w-full border-2 border-dashed border-destructive/30 rounded-xl p-4 text-destructive text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors">
        <AlertTriangle size={14} /> Initiate Formal Move-Out Notice
      </button>
    </div>
  );
};

export default ServicesBanner;
