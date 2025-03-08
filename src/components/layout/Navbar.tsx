
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Briefcase, User, Users } from 'lucide-react';
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
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 lg:px-8',
        isScrolled ? 'py-2 glass shadow-sm' : 'py-4 bg-transparent'
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

      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 w-full glass shadow-md overflow-hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'max-h-[500px] border-t' : 'max-h-0'
        )}
      >
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
    </nav>
  );
};

export default Navbar;
