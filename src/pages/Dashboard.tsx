
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { 
  Briefcase, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock projects data
const mockProjects = [
  {
    id: 1,
    name: "3-Bedroom House in Kileleshwa",
    location: "Kileleshwa, Nairobi",
    progress: 65,
    status: "in-progress",
    budget: "KES 5,200,000",
    contractor: "Simba Builders Ltd",
    nextMilestone: "Roofing completion",
    dueDate: "June 15, 2023",
    lastUpdate: "2 days ago"
  },
  {
    id: 2,
    name: "Rental Apartments in Kikuyu",
    location: "Kikuyu, Kiambu",
    progress: 25,
    status: "in-progress",
    budget: "KES 12,800,000",
    contractor: "Modern Constructions",
    nextMilestone: "Foundation completion",
    dueDate: "July 22, 2023",
    lastUpdate: "Today"
  },
  {
    id: 3,
    name: "Office Space in Westlands",
    location: "Westlands, Nairobi",
    progress: 100,
    status: "completed",
    budget: "KES 8,500,000",
    contractor: "Apex Developers",
    nextMilestone: "Project completed",
    dueDate: "Completed",
    lastUpdate: "1 month ago"
  },
  {
    id: 4,
    name: "Residential Plot Development",
    location: "Ongata Rongai",
    progress: 0,
    status: "planning",
    budget: "KES 3,200,000",
    contractor: "Not assigned",
    nextMilestone: "Contractor selection",
    dueDate: "August 10, 2023",
    lastUpdate: "1 week ago"
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    'planning': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-gray-100 text-gray-800',
    'issue': 'bg-red-100 text-red-800'
  };
  
  const statusLabels = {
    'planning': 'Planning',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'on-hold': 'On Hold',
    'issue': 'Issue'
  };
  
  return (
    <span className={cn(
      'text-xs font-medium px-2.5 py-1 rounded-full',
      statusStyles[status as keyof typeof statusStyles]
    )}>
      {statusLabels[status as keyof typeof statusLabels]}
    </span>
  );
};

// Progress bar component
const ProgressBar = ({ progress }: { progress: number }) => {
  const getProgressColor = (value: number) => {
    if (value < 30) return 'bg-blue-500';
    if (value < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${getProgressColor(progress)}`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // Filter projects based on search term and status filter
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? project.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
              <p className="text-muted-foreground">Manage and track your construction projects</p>
            </div>
            <Button 
              icon={<Plus size={18} />}
            >
              New Project
            </Button>
          </div>
          
          {/* Projects Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="animate-zoom-in" style={{ animationDelay: '100ms' }}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Briefcase size={20} />
                  </div>
                  <StatusBadge status="in-progress" />
                </div>
                <h3 className="text-2xl font-bold mb-1">2</h3>
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
                <h3 className="text-2xl font-bold mb-1">1</h3>
                <p className="text-muted-foreground">Pending Approvals</p>
              </div>
            </Card>
            
            <Card className="animate-zoom-in" style={{ animationDelay: '300ms' }}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <CheckCircle2 size={20} />
                  </div>
                  <StatusBadge status="completed" />
                </div>
                <h3 className="text-2xl font-bold mb-1">1</h3>
                <p className="text-muted-foreground">Completed Projects</p>
              </div>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-200 bg-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <button 
                  className="px-4 py-2 border rounded-lg inline-flex items-center gap-2 bg-card hover:bg-accent transition-colors duration-200"
                  onClick={() => setFilterStatus(null)}
                >
                  <Filter size={18} />
                  <span>Status</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-card shadow-lg rounded-lg overflow-hidden z-10 border hidden">
                  <div className="py-1">
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-accent transition-colors duration-200"
                      onClick={() => setFilterStatus('planning')}
                    >
                      Planning
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-accent transition-colors duration-200"
                      onClick={() => setFilterStatus('in-progress')}
                    >
                      In Progress
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-accent transition-colors duration-200"
                      onClick={() => setFilterStatus('completed')}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects List */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
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
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="text-muted-foreground text-sm">{project.location}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="shrink-0"
                        icon={<ArrowUpRight size={16} />}
                        iconPosition="right"
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
              ))
            ) : (
              <Card className="py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">No projects found</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Plus size={16} />}
                  >
                    Create a new project
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
