
export interface Project {
  id: number;
  name: string;
  location: string;
  progress: number;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'issue';
  budget: string;
  contractor: string;
  nextMilestone: string;
  dueDate: string;
  lastUpdate: string;
}
