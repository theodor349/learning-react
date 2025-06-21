"use client"

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Entry } from '@/app/calendar/data';

interface AddEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: { hour: number; minute: number } | null;
  selectedEntry: Entry | null;
}

const AddEntryDialog = ({
  isOpen,
  onClose,
  selectedTime,
  selectedEntry,
}: AddEntryDialogProps) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedEntry) {
      // Pre-fill with selected entry data
      setTitle(selectedEntry.Activities.map(activity => activity.name).join(' + '));

      const start = new Date(selectedEntry.StartTime);
      setStartTime(format(start, 'HH:mm'));

      if (selectedEntry.EndTime) {
        const end = new Date(selectedEntry.EndTime);
        setEndTime(format(end, 'HH:mm'));
      } else {
        setEndTime('');
      }
    } else if (selectedTime) {
      // Pre-fill with selected time
      setTitle('');
      const formattedHour = String(selectedTime.hour).padStart(2, '0');
      const formattedMinute = String(selectedTime.minute).padStart(2, '0');
      setStartTime(`${formattedHour}:${formattedMinute}`);
      setEndTime('');
    }
  }, [selectedTime, selectedEntry]);

  const handleSubmit = () => {
    // In a real app, this would save the entry to the backend
    console.log('Saving entry:', { title, startTime, endTime });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {selectedEntry ? 'Edit Calendar Entry' : 'Add Calendar Entry'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Activities
            </Label>
            <input
              id="title"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Activity name(s)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-time" className="text-right">
              Start Time
            </Label>
            <input
              id="start-time"
              type="time"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-time" className="text-right">
              End Time
            </Label>
            <input
              id="end-time"
              type="time"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryDialog;
