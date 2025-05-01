
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const getStatusStyles = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return { color: 'bg-blue-100 text-blue-800' };
      case 'in-progress':
        return { color: 'bg-amber-100 text-amber-800' };
      case 'completed':
        return { color: 'bg-green-100 text-green-800' };
      case 'on-hold':
        return { color: 'bg-purple-100 text-purple-800' };
      case 'issue':
        return { color: 'bg-red-100 text-red-800' };
      default:
        return { color: 'bg-gray-100 text-gray-800' };
    }
  };

  const { color } = getStatusStyles(project.status);
  
  return (
    <div className="border rounded-lg bg-card p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium mb-1">{project.name}</h3>
          <p className="text-muted-foreground text-sm">{project.location}</p>
        </div>
        <Badge className={color}>{project.status.replace('-', ' ')}</Badge>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <ProgressBar progress={project.progress} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-muted-foreground">Budget</p>
          <p className="text-sm font-medium">{project.budget}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Contractor</p>
          <p className="text-sm font-medium">{project.contractor}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Next Milestone</p>
          <p className="text-sm font-medium">{project.nextMilestone}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Due Date</p>
          <p className="text-sm font-medium">{project.dueDate}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Last update: {project.lastUpdate}</span>
        <Button 
          variant="ghost" 
          size="sm"
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
