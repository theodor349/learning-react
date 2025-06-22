"use client"

import DayView from '@/components/calendar/DayView';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

export default function CalendarPage() {
  const today = new Date();

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-secondary/30 backdrop-blur-sm border-b border-accent/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Date Display */}
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground rounded-md w-14 h-16 flex flex-col items-center justify-center mr-3">
              <span className="text-xs font-bold uppercase">{format(today, 'MMM')}</span>
              <span className="text-2xl font-bold">{format(today, 'd')}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg">{format(today, 'EEEE')}</span>
              <span className="text-primary/70">{format(today, 'yyyy') + ", week " + format(today, 'ww') }</span>
            </div>
          </div>

          {/* New Event Button */}
          <button 
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 flex items-center shadow-sm hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            onClick={() => {/* Handle new event */}}
          >
            <Plus className="h-5 w-5" />
            <span className="ml-2 hidden md:inline">New Event</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto container mx-auto">
        <DayView date={today} />
      </div>
    </div>
  );
}