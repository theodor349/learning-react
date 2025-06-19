import React from "react";
import Link from "next/link";
import { CalendarDays, Tags, Zap, PlusCircle } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

// Navigation item type definition
interface NavItem {
  name: string;
  icon: React.ComponentType<any>; // Using ComponentType for icon components
  path: string;
}

// Define the navigation items
const navItems: NavItem[] = [
  { name: 'Calendar', icon: CalendarDays, path: '/calendar' },
  { name: 'Add Entry', icon: PlusCircle, path: '/addentry' },
  { name: 'Activities', icon: Zap, path: '/activities' },
  { name: 'Categories ', icon: Tags, path: '/categories' },
];

export default function MainNav() {
  return (
    <>
      {/* Mobile Navigation - shown on small screens at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background h-[var(--nav-height-mobile)]">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="flex flex-col items-center p-2 text-center">
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Navigation - hidden on small screens, visible on md and up */}
      <nav className="
        hidden md:flex
        h-[var(--nav-height)]
        bg-background
        border-r
        p-2
      ">
        {/* Navigation links */}
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link
                    href={item.path}
                    className="flex flex-row">
                    <item.icon className="h-5 w-5 mr-1" />
                    <span className="text-xs">{item.name}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
