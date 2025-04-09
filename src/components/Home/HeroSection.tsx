
import React, { useEffect, useRef } from 'react';
import { ArrowRight, DollarSign, Shield, BarChart, Users, ClipboardList, Home } from 'lucide-react';
import Button from '../shared/Button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - scrollY / 500;
      const translateY = scrollY * 0.5;
      
      heroRef.current.style.opacity = `${Math.max(opacity, 0)}`;
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative bg-gradient-to-b from-white to-secondary min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-60 h-60 rounded-full bg-kenya-green/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-kenya-red/5 blur-3xl"></div>
      </div>
      
      <div 
        ref={heroRef}
        className="container px-4 pt-20 pb-16 flex flex-col items-center text-center z-10 transition-all duration-300 ease-out"
      >
        <div className="inline-block bg-secondary/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 animate-fade-in">
          <span className="text-sm font-medium text-muted-foreground">
            Building trust between diaspora and home builders
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6 tracking-tight max-w-4xl animate-fade-in">
          Manage your <span className="text-kenya-red">construction projects</span> back home with <span className="text-kenya-green">confidence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in stagger-1">
          Connect with verified contractors, track your projects in real-time, and ensure your funds are used transparently on your construction projects in Kenya.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in stagger-2">
          <Link to="/projects/create">
            <Button 
              size="lg"
              className="group"
              icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
              iconPosition="right"
            >
              Start your project
            </Button>
          </Link>
          <Link to="/contractors">
            <Button 
              variant="outline" 
              size="lg"
            >
              Find contractors
            </Button>
          </Link>
        </div>
        
        <div className="w-full max-w-4xl h-80 sm:h-96 rounded-xl glass p-2 overflow-hidden animate-fade-in stagger-3">
          <div className="w-full h-full bg-white rounded-lg flex flex-col">
            <div className="bg-slate-50 border-b px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-medium text-slate-500">BuildWise Dashboard</div>
            </div>
            
            <div className="flex-1 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Dashboard Cards */}
                <div className="bg-blue-50 rounded-md p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                      <ClipboardList size={16} />
                    </div>
                    <h4 className="text-sm font-medium">Active Projects</h4>
                  </div>
                  <p className="text-lg font-bold">3</p>
                  <div className="mt-2 text-xs text-blue-600">On schedule</div>
                </div>
                
                <div className="bg-green-50 rounded-md p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                      <DollarSign size={16} />
                    </div>
                    <h4 className="text-sm font-medium">Budget Used</h4>
                  </div>
                  <p className="text-lg font-bold">KES 2.4M</p>
                  <div className="mt-2 text-xs text-green-600">Within budget</div>
                </div>
                
                <div className="bg-amber-50 rounded-md p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                      <Users size={16} />
                    </div>
                    <h4 className="text-sm font-medium">Contractors</h4>
                  </div>
                  <p className="text-lg font-bold">5</p>
                  <div className="mt-2 text-xs text-amber-600">All verified</div>
                </div>
              </div>
              
              {/* Progress bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">Kileleshwa Project</span>
                    <span className="text-xs font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">Kikuyu Apartments</span>
                    <span className="text-xs font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">Westlands Office</span>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in stagger-4">
          {[
            { label: 'Verified Contractors', value: '200+' },
            { label: 'Projects Completed', value: '500+' },
            { label: 'Funds Protected', value: '$2M+' },
            { label: 'Satisfied Clients', value: '98%' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent"></div>
    </div>
  );
};

export default HeroSection;
