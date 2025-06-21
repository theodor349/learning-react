"use client"

import { useState, useCallback } from 'react';
import { format, parseISO, addHours, isWithinInterval, differenceInMinutes } from 'date-fns';
import { calendarData, Entry, Activity } from '@/app/calendar/data';
import AddEntryDialog from './AddEntryDialog';

interface DayViewProps {
  date: Date;
}

interface TimeBlockProps {
  hour: number;
  minute: number;
  onTimeBlockClick: (hour: number, minute: number) => void;
  entries: Entry[];
}

const DayView = ({ date }: DayViewProps) => {
  const [selectedTime, setSelectedTime] = useState<{ hour: number; minute: number } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

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
    return formatDateForComparison(entry.StartTime) === today;
  });

  return (
    <div className="relative">
      <div className="calendar-grid pb-20">
        {hours.map((hour) => (
          <TimeBlock 
            key={hour} 
            hour={hour} 
            minute={0} 
            onTimeBlockClick={handleTimeBlockClick}
            entries={todaysEntries}
          />
        ))}
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

const TimeBlock = ({ hour, minute, onTimeBlockClick, entries }: TimeBlockProps) => {
  // Create minutes for each quarter hour
  const minutes = [0, 15, 30, 45];

  // Used for checking if an entry falls within this time block
  const timeBlockStart = new Date().setHours(hour, minute, 0, 0);

  return (
    <div className="time-block relative">
      <div className="hour-label sticky left-0 bg-background z-10 w-16 pr-2 text-right text-sm text-muted-foreground">
        {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
      </div>

      <div className="hour-block border-t border-gray-200 h-[60px] relative">
        {minutes.map((min, index) => (
          <div 
            key={min}
            className={`minute-block h-[15px] ${index > 0 ? 'border-t border-dotted border-gray-200' : ''}`}
            onClick={() => onTimeBlockClick(hour, min)}
          />
        ))}

        {/* Render entries that start within this hour */}
        {entries.map((entry, index) => {
          const startTime = parseISO(entry.StartTime);
          const startHour = startTime.getHours();
          const startMinute = startTime.getMinutes();

          // Skip if this entry doesn't start in this hour block
          if (startHour !== hour) return null;

          // Calculate entry height and position
          const topPosition = (startMinute / 60) * 100;
          let height;
          let duration;

          if (entry.EndTime) {
            const endTime = parseISO(entry.EndTime);
            duration = differenceInMinutes(endTime, startTime);
            height = (duration / 60) * 100;
          } else {
            // Default to 12 hours if no end time
            duration = 12 * 60;
            height = 1200; // 12 hours
          }

          // Get primary category (lowest sort order)
          const primaryCategory = entry.Activities.reduce((prev, current) => {
            return prev.category.sortOrder < current.category.sortOrder ? prev : current;
          }).category;

          // Format title from activities
          const title = entry.Activities.map(activity => activity.name).join(' + ');

          // Determine what information to display based on duration
          let contentToDisplay;
          if (duration < 15) {
            contentToDisplay = (
              <div className="truncate">{title}</div>
            );
          } else if (duration < 60) {
            contentToDisplay = (
              <>
                <div className="font-medium truncate">{title}</div>
                <div className="text-xs">
                  {format(startTime, 'h:mm a')} - {format(parseISO(entry.EndTime!), 'h:mm a')}
                </div>
              </>
            );
          } else {
            // For entries >= 1 hour
            const hours = Math.floor(duration / 60);
            const mins = duration % 60;
            contentToDisplay = (
              <>
                <div className="font-medium truncate">{title}</div>
                <div className="text-xs">
                  {format(startTime, 'h:mm a')} - {entry.EndTime ? format(parseISO(entry.EndTime), 'h:mm a') : 'No end time'}
                </div>
                {entry.EndTime && (
                  <div className="text-xs">
                    Duration: {hours}h {mins > 0 ? `${mins}m` : ''}
                  </div>
                )}
              </>
            );
          }

          return (
            <div
              key={`${entry.StartTime}-${index}`}
              className="absolute left-16 right-0 overflow-hidden rounded px-2 py-1 text-xs cursor-pointer"
              style={{
                top: `${topPosition}%`,
                height: `${Math.min(height, 100)}%`,
                backgroundColor: primaryCategory.color,
                color: '#ffffff',
                zIndex: 5
              }}
              onClick={() => onTimeBlockClick(hour, startMinute)}
            >
              {contentToDisplay}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;
