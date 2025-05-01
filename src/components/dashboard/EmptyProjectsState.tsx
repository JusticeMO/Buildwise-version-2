
import React from 'react';
import { Plus } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

interface EmptyProjectsStateProps {
  onNewProject: () => void;
}

const EmptyProjectsState = ({ onNewProject }: EmptyProjectsStateProps) => {
  return (
    <Card className="py-12">
      <div className="text-center">
        <p className="text-muted-foreground mb-2">No projects found</p>
        <Button 
          variant="outline" 
          size="sm"
          icon={<Plus size={16} />}
          onClick={onNewProject}
        >
          Create a new project
        </Button>
      </div>
    </Card>
  );
};

export default EmptyProjectsState;
