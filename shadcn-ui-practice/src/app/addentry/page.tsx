"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { activities } from "@/app/activities/data"
import { Check, ChevronDown, Clock, Plus, Trash, X } from "lucide-react"

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



  // Activity inputs
  const [activityInputs, setActivityInputs] = React.useState<string[]>([""])

  // Add another activity input field
  const addActivityInput = () => {
    setActivityInputs([...activityInputs, ""])
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

    if (validActivities.length === 0) {
      alert("Please enter at least one activity")
      return
    }

    // Here you would normally send this data to your backend
    console.log("Submitting entry:", {
      timestamp,
      activities: validActivities
    })

    // Reset the form
    setActivityInputs([""])
    setTimestamp(roundToNearestFifteen(new Date()))

    // Show success message
    alert("Entry added successfully!")
  }

  return (
    <div className="container py-8 max-w-3xl">

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Timestamp section */}
        <div className="space-y-4">
          <div className="flex gap-4">
            {/* Date picker */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal"
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
            </div>
            {/* Time picker */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1">
                Time
              </Label>
              <div className="flex gap-2">
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
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={subtractFifteenMinutes}>
              -15 min
            </Button>
            <Button
              type="button"
              variant="outline"
              size={"sm"}
              onClick={resetTimestamp}
              title="Reset to current time"
            >
              Now
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={addFifteenMinutes}>
              +15 min
            </Button>
          </div>
        </div>

        {/* Activities section */}
        <div className="space-y-4">
          {activityInputs.map((activity, index) => (
            <div key={index} className="flex items-center gap-2">
              <ActivityInput
                value={activity}
                onChange={(value) => updateActivityInput(index, value)}
                className="flex-1"
              />
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

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 p-0"
          >
            <Plus className="h-4 w-4 mr-2" />
          </Button>
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full">
          Save Entry
        </Button>
      </form>
    </div>
  )
}

interface ActivityInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

function ActivityInput({ value, onChange, className }: ActivityInputProps) {
  const [open, setOpen] = React.useState(false)

  // Filter activities based on input
  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`relative ${className}`}>
          <Input
            placeholder="Enter an activity..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
            onFocus={() => setOpen(true)}
          />
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search activities..." />
          <CommandList>
            <CommandEmpty>No activities found.</CommandEmpty>
            <CommandGroup>
              {filteredActivities.map((activity) => (
                <CommandItem
                  key={activity.id}
                  onSelect={() => {
                    onChange(activity.name)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: activity.category.hexColor }}
                  />
                  {activity.name}
                  {value === activity.name && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}