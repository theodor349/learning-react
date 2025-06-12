import React from "react";
import Link from "next/link";
import { Home, Settings, User, Info } from "lucide-react";

import { cn } from "@/lib/utils";

// Navigation item type definition
interface NavItem {
  name: string;
  icon: React.ComponentType<any>; // Using ComponentType for icon components
  path: string;
}

// Define the navigation items
const navItems: NavItem[] = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Profile', icon: User, path: '/profile' },
  { name: 'About', icon: Info, path: '/about' },
];

export default function MainNav() {
  return (
    <>
      {/* Mobile Navigation - shown on small screens at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background">
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
        flex-col
        h-screen w-60
        bg-background
        border-r
        p-6
      ">
        {/* Navigation links */}
        <ul className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={cn(
                  "flex items-center space-x-3 rounded-md px-3 py-2",
                  "text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
