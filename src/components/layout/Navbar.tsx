
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Briefcase, User, Users, Sofa, Lamp, Package, Building } from 'lucide-react';
import Button from '../shared/Button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Projects', path: '/dashboard', icon: <Briefcase size={18} /> },
    { name: 'Contractors', path: '/contractors', icon: <Users size={18} /> },
    { name: 'Building Materials', path: '/materials', icon: <Package size={18} /> },
    { name: 'Furniture', path: '/furniture', icon: <Sofa size={18} /> },
    { name: 'Finishings', path: '/finishings', icon: <Lamp size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Add a spacer to prevent content from being hidden under the navbar */}
      <div className="h-[70px]"></div>
      
      <nav 
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 lg:px-8',
          isScrolled ? 'py-2 glass shadow-sm backdrop-blur-md bg-background/90' : 'py-4 bg-background/90 backdrop-blur-md'
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink 
              to="/" 
              className="text-xl font-bold flex items-center gap-2"
            >
              <span className="text-kenya-red">Build</span>
              <span className="text-kenya-green">Wise</span>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => cn(
                    'px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium smooth-transition',
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-accent/50'
                  )}
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/vendor-application">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="font-medium"
                >
                  For Businesses
                </Button>
              </NavLink>
              <NavLink to="/tenant/login">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="font-medium"
                  icon={<Building size={16} />}
                  iconPosition="left"
                >
                  Tenant Portal
                </Button>
              </NavLink>
              <Button 
                variant="ghost" 
                size="sm"
                className="font-medium"
              >
                Log in
              </Button>
              <Button size="sm">Sign up</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent/50 smooth-transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fixed implementation with proper opacity */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full border-t bg-white shadow-md">
            <div className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => cn(
                      'px-4 py-3 rounded-md flex items-center gap-2 text-sm font-medium smooth-transition',
                      isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-accent/50'
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                ))}
                <NavLink 
                  to="/vendor-application"
                  className="px-4 py-3 rounded-md flex items-center gap-2 text-sm font-medium bg-secondary hover:bg-secondary/80 smooth-transition"
                >
                  For Businesses
                </NavLink>
                <NavLink 
                  to="/tenant/login"
                  className="px-4 py-3 rounded-md flex items-center gap-2 text-sm font-medium bg-secondary hover:bg-secondary/80 smooth-transition"
                >
                  <Building size={16} />
                  Tenant Portal
                </NavLink>
                <div className="pt-2 mt-2 border-t grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    fullWidth
                  >
                    Log in
                  </Button>
                  <Button fullWidth>Sign up</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
