"use client"

import * as React from "react"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {ChevronDown, PlusCircle, TimerReset, Trash, Search} from "lucide-react"
import { toast } from "sonner"
import { ActivitySelector } from "@/app/addentry/ActivitySelector"

export default function AddEntryPage() {
  // Helper to round date to nearest 15 minutes
  const roundToNearestFifteen = (date: Date): Date => {
    const minutes = date.getMinutes()
    const roundedMinutes = Math.round(minutes / 15) * 15
    const newDate = new Date(date)
    newDate.setMinutes(roundedMinutes)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)
    return newDate
  }

  // Initialize timestamp to current time rounded to nearest 15 minutes
  const [timestamp, setTimestamp] = React.useState<Date>(() => roundToNearestFifteen(new Date()))

  // State to control the date picker popover
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)

  // Track which activity input is currently active
  const [activeInput, setActiveInput] = React.useState<number | null>(null)

  // Activity inputs
  const [activityInputs, setActivityInputs] = React.useState<string[]>([""])

  // Add another activity input field
  const addActivityInput = () => {
    const newIndex = activityInputs.length;
    setActivityInputs([...activityInputs, ""]);
    // Set this new input as active after a short delay to allow for state update
    setTimeout(() => setActiveInput(newIndex), 50);
  }

  // Remove an activity input field
  const removeActivityInput = (index: number) => {
    if (activityInputs.length === 1) {
      // If it's the last input, just clear it instead of removing
      setActivityInputs([""])
    } else {
      const newInputs = [...activityInputs]
      newInputs.splice(index, 1)
      setActivityInputs(newInputs)
    }
  }

  // Update an activity input value
  const updateActivityInput = (index: number, value: string) => {
    const newInputs = [...activityInputs]
    newInputs[index] = value
    setActivityInputs(newInputs)
  }


  // Add 15 minutes to timestamp
  const addFifteenMinutes = () => {
    const newTimestamp = new Date(timestamp)
    newTimestamp.setMinutes(timestamp.getMinutes() + 15)
    setTimestamp(newTimestamp)
  }

  // Subtract 15 minutes from timestamp
  const subtractFifteenMinutes = () => {
    const newTimestamp = new Date(timestamp)
    newTimestamp.setMinutes(timestamp.getMinutes() - 15)
    setTimestamp(newTimestamp)
  }

  // Reset timestamp to current time
  const resetTimestamp = () => {
    setTimestamp(roundToNearestFifteen(new Date()))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Filter out empty activity inputs
    const validActivities = activityInputs.filter(activity => activity.trim() !== "")

    // Here you would normally send this data to your backend
    console.log("Submitting entry:", {
      timestamp,
      activities: validActivities
    })

    // Show success toast notification with more details
    toast.success("Entry added successfully!", {
      description: `Added ${validActivities.length} ${validActivities.length === 1 ? 'activity' : 'activities'} for ${timestamp.toLocaleString()}`,
    })
  }

      // Close the command input when clicking outside
      const formRef = React.useRef<HTMLFormElement>(null);

      React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
      }, []);

      return (
    <div className="container p-2 md:py-10 max-w-xl mx-auto">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
          {/* Timestamp section */}
          <div className="space-y-5 bg-muted/30 p-4 rounded-md">
            <div className="flex flex-row gap-2">
              {/* Date picker */}
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="flex-grow justify-between font-normal bg-background/80 hover:bg-background"
                  >
                    {timestamp.toLocaleDateString()}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={timestamp}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (date) {
                        const newDate = new Date(timestamp)
                        newDate.setFullYear(date.getFullYear())
                        newDate.setMonth(date.getMonth())
                        newDate.setDate(date.getDate())
                        setTimestamp(newDate)
                        // Close the popover when a date is selected
                        setDatePickerOpen(false)
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={resetTimestamp}
                title="Reset to current time"
              >
                <TimerReset/>
              </Button>
            </div>

            <div className="flex flex-row justify-center gap-2">
              <Button type="button" variant="outline" onClick={subtractFifteenMinutes} className="bg-background/80 hover:bg-background">
                -15 min
              </Button>

              <Input
                type="time"
                id="time-picker"
                step="900" // 15 minutes (15 * 60 seconds)
                value={`${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':').map(Number)
                  const newDate = new Date(timestamp)
                  newDate.setHours(hours)
                  newDate.setMinutes(minutes)
                  setTimestamp(newDate)
                }}
                className="bg-background/80 appearance-none font-mono flex-grow text-center"
              />

              <Button type="button" variant="outline" onClick={addFifteenMinutes} className="bg-background/80 hover:bg-background">
                +15 min
              </Button>
            </div>
          </div>

          {/* Activities section */}
          <div className="space-y-1 bg-muted/30 p-4 rounded-md relative">
            {/* ActivitySelector component to be shown when an input is focused */}
            <ActivitySelector
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              values={activityInputs}
              onChange={updateActivityInput}
            />

            {activityInputs.map((activity, index) => (
              <div key={index} className="flex items-center gap-2 p-1 rounded">
                <div className="relative flex-1">
                  <Input
                    placeholder="Enter an activity..."
                    value={activity}
                    onClick={() => setActiveInput(index)}
                    readOnly
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => {
                      if (activity) {
                        updateActivityInput(index, "");
                      } else {
                        setActiveInput(index);
                      }
                    }}
                  >
                    {activity ? <Trash className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeActivityInput(index)}
                  title="Remove activity"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addActivityInput}
              >
                <PlusCircle className="h-4 w-4" />
                Add Activity
              </Button>
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full py-6 text-base font-medium transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          >
            Add Entry
          </Button>
        </form>
    </div>
  )
}