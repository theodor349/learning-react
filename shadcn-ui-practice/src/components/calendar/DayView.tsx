"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { format, parseISO, addHours, isWithinInterval, differenceInMinutes } from 'date-fns';
import { calendarData, Entry, Activity } from '@/app/calendar/data';
import AddEntryDialog from './AddEntryDialog';

const HOUR_HEIGHT_PX = 100;
const QUARTER_HEIGHT_PX = HOUR_HEIGHT_PX / 4;

interface DayViewProps {
  date: Date;
}

const DayView = ({ date }: DayViewProps) => {
  const [selectedTime, setSelectedTime] = useState<{ hour: number; minute: number } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  // Reference for time marker
  const [currentTimeTop, setCurrentTimeTop] = useState(0);
  const [showTimeMarker, setShowTimeMarker] = useState(false);

  // Create array of hours (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleTimeBlockClick = useCallback((hour: number, minute: number) => {
    setSelectedTime({ hour, minute });
    setIsDialogOpen(true);
  }, []);

  const handleEntryClick = useCallback((entry: Entry) => {
    setSelectedEntry(entry);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedTime(null);
    setSelectedEntry(null);
  }, []);

  const formatDateForComparison = (dateStr: string) => {
    return format(parseISO(dateStr), 'yyyy-MM-dd');
  };

  const today = format(date, 'yyyy-MM-dd');

  // Filter entries for today
  const todaysEntries = calendarData.filter(entry => {
    return true; // formatDateForComparison(entry.StartTime) === today;
  });

  // Update current time marker position
  useEffect(() => {
    const updateTimeMarker = () => {
      const now = new Date();
      const totalMinutes = (now.getHours() * 60 + now.getMinutes()) * (HOUR_HEIGHT_PX / 60);
      setCurrentTimeTop(totalMinutes);

      // Only show time marker if viewing current date
      const today = new Date();
      setShowTimeMarker(format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'));
    };

    // Update immediately and then every minute
    updateTimeMarker();
    const interval = setInterval(updateTimeMarker, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="relative">
      <div className="flex-grow w-full overflow-y-auto custom-scrollbar relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="relative w-full">
            {/* Timeline background grid */}
            <div className="absolute w-full grid grid-cols-[60px_1fr] -z-10">
              {hours.map((hour) => (
                <React.Fragment key={hour}>
                  <div className="text-xs md:text-sm text-right text-muted-foreground pr-2 md:pr-4 -translate-y-2">
                    {hour > 0 ? `${String(hour).padStart(2, '0')}:00` : ''}
                  </div>
                  <div className="flex flex-col border-l border-secondary">
                    {[0, 1, 2, 3].map((quarter) => (
                      <div 
                        key={quarter}
                        className={`w-full border-b ${quarter === 3 ? 'border-secondary' : 'border-secondary/50 border-dashed'} hover:bg-primary/10 cursor-pointer`}
                        style={{ height: `${QUARTER_HEIGHT_PX}px` }}
                        onClick={() => handleTimeBlockClick(hour, quarter * 15)}
                      />
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Current Time Marker */}
            {showTimeMarker && (
              <div 
                className="absolute w-[calc(100%-60px)] ml-[60px] h-0.5 bg-red-500 z-10"
                style={{ top: `${currentTimeTop}px` }}
              />
            )}

            {/* Events Container */}
            <div className="relative w-[calc(100%-60px)] ml-[60px]" style={{ height: `${24 * HOUR_HEIGHT_PX}px` }}>
              {todaysEntries.map((entry, index) => {
                const startTime = parseISO(entry.StartTime);
                const startHour = startTime.getHours();
                const startMinute = startTime.getMinutes();
                let showTime = false;

                // Calculate top position based on start time (minutes from midnight)
                const topPosition = (startHour * 60 + startMinute) * (HOUR_HEIGHT_PX / 60);

                // Calculate height based on duration
                let height;
                if (entry.EndTime) {
                  const endTime = parseISO(entry.EndTime);
                  const duration = differenceInMinutes(endTime, startTime);
                  height = duration * (HOUR_HEIGHT_PX / 60);
                  if(duration > 15)
                  {
                    showTime = true;
                  }
                } else {
                  // Default height if no end time
                  height = HOUR_HEIGHT_PX; // 1 hour default
                }

                // Get primary category for styling
                const primaryCategory = entry.Activities.reduce((prev, current) => {
                  return prev.category.sortOrder < current.category.sortOrder ? prev : current;
                }).category;

                // Format title from activities
                const title = entry.Activities.map(activity => activity.name).join(' + ');

                return (
                  <div 
                    key={`${entry.StartTime}-${index}`}
                    className="absolute w-full p-0.5"
                    style={{ top: `${topPosition}px`, height: `${height}px` }}
                    onClick={() => handleEntryClick(entry)}
                  >
                    <div className="h-full bg-secondary/50 border-l-10 rounded-r-lg px-2 flex flex-col justify-start shadow-sm cursor-pointer"
                         style={{ borderLeftColor: primaryCategory.color }}
                    >
                      <p className="font-semibold text-primary text-sm">{title}</p>
                      {showTime && <p className="text-xs text-primary/80">
                        {format(startTime, 'HH:mm')} - {entry.EndTime ? format(parseISO(entry.EndTime), 'HH:mm') : 'ongoing'}
                      </p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AddEntryDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        selectedTime={selectedTime} 
        selectedEntry={selectedEntry}
      />
    </div>
  );
};


export default DayView;
