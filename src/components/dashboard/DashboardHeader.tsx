
import React from 'react';
import Button from '@/components/shared/Button';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onNewProject: () => void;
}

const DashboardHeader = ({ onNewProject }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
        <p className="text-muted-foreground">Manage and track your construction projects</p>
      </div>
      <Button 
        icon={<Plus size={18} />}
        onClick={onNewProject}
      >
        New Project
      </Button>
    </div>
  );
};

export default DashboardHeader;
