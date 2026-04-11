
import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

const mockDocuments = [
  { name: 'Lease Agreement - 2024', type: 'PDF', date: '2024-01-15', size: '2.4 MB' },
  { name: 'Move-in Inspection Report', type: 'PDF', date: '2024-01-15', size: '1.1 MB' },
  { name: 'House Rules & Regulations', type: 'PDF', date: '2024-01-10', size: '540 KB' },
  { name: 'Rent Receipt - June 2024', type: 'PDF', date: '2024-06-01', size: '120 KB' },
  { name: 'Rent Receipt - May 2024', type: 'PDF', date: '2024-05-01', size: '118 KB' },
];

const TenantDocuments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Documents</h2>
        <p className="text-muted-foreground text-sm">Access your lease documents, receipts and reports</p>
      </div>

      <div className="bg-white rounded-lg border border-border divide-y">
        {mockDocuments.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-primary" />
              <div>
                <p className="font-medium text-sm">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.type} · {doc.size} · {doc.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.info('Preview coming soon')} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <Eye size={16} className="text-muted-foreground" />
              </button>
              <button onClick={() => toast.info('Download coming soon')} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <Download size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantDocuments;
