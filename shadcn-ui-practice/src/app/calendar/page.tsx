"use client"

import DayView from '@/components/calendar/DayView';
import { Button } from '@/components/ui/button';
import { addDays, format, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const goToPreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const goToNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--nav-height-mobile))] md:h-[calc(100vh-var(--nav-height))]">
      {/* Header Section */}
      <div className="z-10 bg-secondary/30 backdrop-blur-sm border-b border-accent/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Date Display */}
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground rounded-md w-14 h-16 flex flex-col items-center justify-center mr-3">
              <span className="text-xs font-bold uppercase">{format(selectedDate, 'MMM')}</span>
              <span className="text-2xl font-bold">{format(selectedDate, 'd')}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg">{format(selectedDate, 'EEEE')}</span>
              <span className="text-primary/70">{format(selectedDate, 'yyyy') + ", week " + format(selectedDate, 'ww') }</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPreviousDay}
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNextDay}
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto container mx-auto">
        <DayView date={selectedDate} />
      </div>
    </div>
  );
}