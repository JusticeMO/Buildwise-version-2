import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/shared/Card';
import { Briefcase, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProjectFilters from '@/components/dashboard/ProjectFilters';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Project } from '@/types/project';

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

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleNewProject = () => {
    navigate('/projects/create');
  };
  
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
          <DashboardHeader onNewProject={handleNewProject} />
          
          {/* Projects Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="animate-zoom-in" style={{ animationDelay: '100ms' }}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Briefcase size={20} />
                  </div>
                  <Badge variant="outline">In Progress</Badge>
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">1</h3>
                <p className="text-muted-foreground">Completed Projects</p>
              </div>
            </Card>
          </div>
          
          <ProjectFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterClick={() => setFilterStatus(null)}
          />
          
          {/* Projects List */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onViewDetails={() => navigate(`/projects/${project.id}`)}
                />
              ))
            ) : (
              <Card className="py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">No projects found</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={handleNewProject}
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
