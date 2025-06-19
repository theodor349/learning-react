"use client"

import * as React from "react"
import { ChevronDown, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateTimePickerProps {
  value: Date
  onChange: (date: Date) => void
  onReset?: () => void
  timeStep?: number
}

export function DateTimePicker({
  value,
  onChange,
  onReset,
  timeStep = 900, // 15 minutes by default
}: DateTimePickerProps) {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)

  const updateTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    const newDate = new Date(value)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    onChange(newDate)
  }

  const updateDate = (date: Date | undefined) => {
    if (!date) return

    const newDate = new Date(value)
    newDate.setFullYear(date.getFullYear())
    newDate.setMonth(date.getMonth())
    newDate.setDate(date.getDate())
    onChange(newDate)
  }

  return (
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
              {value.toLocaleDateString()}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  updateDate(date)
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
            step={timeStep}
            value={`${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`}
            onChange={(e) => updateTime(e.target.value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          {onReset && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={onReset}
              title="Reset to current time"
            >
              <Clock className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
