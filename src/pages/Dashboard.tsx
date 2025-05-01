
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProjectFilters from '@/components/dashboard/ProjectFilters';
import ProjectCard from '@/components/dashboard/ProjectCard';
import StatsCards from '@/components/dashboard/StatsCards';
import EmptyProjectsState from '@/components/dashboard/EmptyProjectsState';
import { Project } from '@/types/project';

// Mock projects data
const mockProjects: Project[] = [
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
  
  // Calculate statistics
  const activeProjects = mockProjects.filter(p => p.status === 'in-progress').length;
  const pendingApprovals = 1; // Hardcoded for demo purposes
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 bg-secondary/50">
        <div className="container px-4 py-8">
          <DashboardHeader onNewProject={handleNewProject} />
          
          {/* Projects Overview Cards */}
          <StatsCards 
            activeProjects={activeProjects}
            pendingApprovals={pendingApprovals}
            completedProjects={completedProjects}
          />
          
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
              <EmptyProjectsState onNewProject={handleNewProject} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
