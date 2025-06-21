"use client";

import * as React from "react";
import { activities } from "@/app/activities/data";
import { Check, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface CommandContentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSelect: (value: string) => void;
}

export function CommandContent({ inputValue, setInputValue, handleSelect }: CommandContentProps) {
  // Filter activities based on input
  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Check if the input value exists in predefined activities
  const activityExists = activities.some(
    (activity) => activity.name.toLowerCase() === inputValue.toLowerCase()
  );

  // Show the "Add new activity" option only when there's a non-empty value
  // and it doesn't exist in our predefined list
  const showAddOption = inputValue.trim() !== "" && !activityExists;

  return (
    <Command>
      <CommandInput
        placeholder="Search activities..."
        value={inputValue}
        onValueChange={setInputValue}
      />
      <CommandList>
        <CommandEmpty>
          {inputValue.trim() !== "" ? (
            <CommandItem
              onSelect={() => handleSelect(inputValue)}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>
                Add <strong>"{inputValue}"</strong> as a new activity
              </span>
            </CommandItem>
          ) : (
            "No activities found."
          )}
        </CommandEmpty>
        <CommandGroup>
          {filteredActivities.map((activity) => (
            <CommandItem
              key={activity.id}
              onSelect={() => handleSelect(activity.name)}
              className="flex items-center gap-2"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: activity.category.hexColor }}
              />
              {activity.name}
              {inputValue === activity.name && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        {showAddOption && (
          <CommandGroup>
            <CommandItem
              onSelect={() => handleSelect(inputValue)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>
                Add <strong>"{inputValue}"</strong> as a new activity
              </span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
