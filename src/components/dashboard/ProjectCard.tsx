
import React from 'react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';
import { ProgressBar } from './ProgressBar';

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  return (
    <Card 
      variant="outline" 
      padding="none" 
      withHover 
      className="overflow-hidden"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-lg">{project.name}</h3>
              <Badge status={project.status} />
            </div>
            <p className="text-muted-foreground text-sm">{project.location}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="shrink-0"
            icon={<ArrowUpRight size={16} />}
            iconPosition="right"
            onClick={onViewDetails}
          >
            View details
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Budget</p>
            <p className="font-medium">{project.budget}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Contractor</p>
            <p className="font-medium">{project.contractor}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Next Milestone</p>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-muted-foreground" />
              <p className="font-medium">{project.nextMilestone}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <ProgressBar progress={project.progress} />
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
