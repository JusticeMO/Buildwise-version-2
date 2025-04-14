
import React from 'react';
import { Building, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const NavbarRentalManagement = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Rental Management</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <Link to="/tenant/login" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="flex items-center gap-2 text-sm font-medium leading-none">
                  <User size={18} />
                  <span>Tenant Portal</span>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Access your rental account to manage payments, messages and maintenance requests
                </p>
              </Link>
              <Link to="/landlord/login" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="flex items-center gap-2 text-sm font-medium leading-none">
                  <Users size={18} />
                  <span>Landlord Portal</span>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Manage your properties, tenants, and rental income
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarRentalManagement;
