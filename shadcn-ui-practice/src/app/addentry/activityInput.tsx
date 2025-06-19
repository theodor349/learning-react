import * as React from "react";
import {activities} from "@/app/activities/data";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Check, X} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

interface ActivityInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ActivityInput({value, onChange, className}: ActivityInputProps) {
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
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true); // Open the popover whenever the user types
            }}
            className="w-full"
            onClick={() => setOpen(true)}
          />
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              <X className="h-4 w-4"/>
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search activities..."
            value={value}
            onValueChange={onChange}
            onFocus={(e) => {
              // Prevent this focus event from causing the popover to close
              e.stopPropagation();
            }}
          />
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
                    style={{backgroundColor: activity.category.hexColor}}
                  />
                  {activity.name}
                  {value === activity.name && (
                    <Check className="ml-auto h-4 w-4"/>
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