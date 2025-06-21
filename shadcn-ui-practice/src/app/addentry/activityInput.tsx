import * as React from "react";
import {activities, categories} from "@/app/activities/data";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Check, Plus, X} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {
  Dialog,
  DialogContent, DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface ActivityInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ActivityInput({value, onChange, className}: ActivityInputProps) {
  const [open, setOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [useMobileView, setUseMobileView] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  // Detect mobile screens on mount and window resize
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Only update if open to prevent unnecessary rerenders
      if (open) {
        setUseMobileView(mobile)
      }
    }

    checkMobile() // Check initially

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [open])

  // When opening, set the initial mode based on current screen size
  React.useEffect(() => {
    if (open) {
      setUseMobileView(isMobile)
      if (isMobile) {
        setOpen(false)
        setDialogOpen(true)
      }
    }
  }, [open, isMobile])

  // Filter activities based on input
  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(value.toLowerCase())
  )

  // Check if the input value exists in predefined activities
  const activityExists = activities.some(activity => 
    activity.name.toLowerCase() === value.toLowerCase()
  )

  // Show the "Add new activity" option only when there's a non-empty value 
  // and it doesn't exist in our predefined list
  const showAddOption = value.trim() !== "" && !activityExists

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTitle>
        </DialogTitle>
        <DialogContent className="p-0" position="top">
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Search activities..."
              value={value}
              onValueChange={onChange}
            />
            <CommandList>
              <CommandEmpty>
                {value.trim() !== "" ? (
                  <CommandItem
                    onSelect={() => {
                      onChange(value);
                      setDialogOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add <strong>"{value}"</strong> as a new activity</span>
                  </CommandItem>
                ) : (
                  "No activities found."
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredActivities.map((activity) => (
                  <CommandItem
                    key={activity.id}
                    onSelect={() => {
                      onChange(activity.name);
                      setDialogOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    {activity.category && (
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{backgroundColor: activity.category.hexColor}}
                      />
                    )}
                    {activity.name}
                    {value === activity.name && (
                      <Check className="ml-auto h-4 w-4"/>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Add a custom activity option when it doesn't exist */}
              {showAddOption && (
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onChange(value);
                      setDialogOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add <strong>"{value}"</strong> as a new activity</span>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className={`relative ${className}`}>
          <Input
            placeholder="Enter an activity..."
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              isMobile ? setDialogOpen(true) : setOpen(true); // Open dialog on mobile, popover on desktop
            }}
            className="w-full"
            onClick={() => isMobile ? setDialogOpen(true) : setOpen(true)}
          />
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setOpen(false);
                setDialogOpen(false);
              }}
            >
              <X className="h-4 w-4"/>
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        style={{
          width: 'var(--radix-popover-trigger-width)',
          maxWidth: '400px'
        }}
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <Command>
          <CommandInput 
            placeholder="Search activities..."
            value={value}
            onValueChange={onChange}
            onFocus={(e) => {
              e.stopPropagation();
            }}
          />
          <CommandList>
            <CommandEmpty>
              {value.trim() !== "" ? (
                <CommandItem
                  onSelect={() => {
                    onChange(value);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add <strong>"{value}"</strong> as a new activity</span>
                </CommandItem>
              ) : (
                "No activities found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {filteredActivities.map((activity) => (
                <CommandItem
                  key={activity.id}
                  onSelect={() => {
                    onChange(activity.name);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  {activity.category && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{backgroundColor: activity.category.hexColor}}
                    />
                  )}
                  {activity.name}
                  {value === activity.name && (
                    <Check className="ml-auto h-4 w-4"/>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Add a custom activity option when it doesn't exist */}
            {showAddOption && (
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onChange(value);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add <strong>"{value}"</strong> as a new activity</span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </>
  );
}