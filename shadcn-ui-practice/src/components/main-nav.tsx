import React from "react";
import Link from "next/link";
import { CalendarDays, User, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button"

// Navigation item type definition
interface NavItem {
  name: string;
  icon: React.ComponentType<any>; // Using ComponentType for icon components
  path: string;
}

// Define the navigation items
const navItems: NavItem[] = [
  { name: 'Calendar', icon: CalendarDays, path: '/' },
  { name: 'Add Entry', icon: PlusCircle, path: '/settings' },
  { name: 'Manage', icon: User, path: '/profile' },
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
        h-screen
        bg-background
        border-r
        p-2
      ">
        {/* Navigation links */}
        <ul className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={buttonVariants({ variant: "ghost", className: "w-full" })}
              >
                <item.icon className="h-5 w-5" />
                <span className={"w-18"} >{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
