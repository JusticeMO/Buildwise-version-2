import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/shared/ModeToggle"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "@/components/ui/use-toast"
import { LogOut } from "lucide-react"
import NavbarRentalManagement from './NavbarRentalManagement';

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully.",
    })
  };

  return (
    <div className={`fixed top-0 left-0 w-full bg-background z-50 shadow-sm ${className}`}>
      <div className="container py-4">
        <NavbarDesktop isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </div>
    </div>
  );
};

interface NavbarDesktopProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="flex items-center text-2xl font-bold">
        <span className="text-kenya-red">Jenga</span>
        <span className="text-kenya-green">Safe</span>
      </Link>

      <ul className="flex items-center space-x-6">
        <li>
          <NavbarRentalManagement />
        </li>
        <li>
          <Link to="/about" className="text-sm hover:text-gray-500 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link to="/help" className="text-sm hover:text-gray-500 transition-colors">
            Help
          </Link>
        </li>
        <li>
          <Link to="/blog" className="text-sm hover:text-gray-500 transition-colors">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-sm hover:text-gray-500 transition-colors">
            Contact
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full h-full block">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/projects/create" className="w-full h-full block">
                    Create Project
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-sm hover:text-gray-500 transition-colors">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm">
                Sign Up
              </Link>
            </li>
          </>
        )}
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
