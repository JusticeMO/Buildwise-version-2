
import React from 'react';
import { Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '@/components/shared/Card';
import { Badge } from '@/components/ui/badge';

interface StatsCardsProps {
  activeProjects: number;
  pendingApprovals: number;
  completedProjects: number;
}

const StatsCards = ({ 
  activeProjects, 
  pendingApprovals, 
  completedProjects 
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="animate-zoom-in" style={{ animationDelay: '100ms' }}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Briefcase size={20} />
            </div>
            <Badge variant="outline">In Progress</Badge>
          </div>
          <h3 className="text-2xl font-bold mb-1">{activeProjects}</h3>
          <p className="text-muted-foreground">Active Projects</p>
        </div>
      </Card>
      
      <Card className="animate-zoom-in" style={{ animationDelay: '200ms' }}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <p className="text-xs font-medium text-amber-600">Requires Attention</p>
          </div>
          <h3 className="text-2xl font-bold mb-1">{pendingApprovals}</h3>
          <p className="text-muted-foreground">Pending Approvals</p>
        </div>
      </Card>
      
      <Card className="animate-zoom-in" style={{ animationDelay: '300ms' }}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
          </div>
          <h3 className="text-2xl font-bold mb-1">{completedProjects}</h3>
          <p className="text-muted-foreground">Completed Projects</p>
        </div>
      </Card>
    </div>
  );
};

export default StatsCards;
