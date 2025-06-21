"use client";

import * as React from "react";
import { activities } from "@/app/activities/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Search } from "lucide-react";

interface SimpleCommandContentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSelect: (value: string) => void;
  isDesktop: boolean;
  onClose: () => void;
}

export function SimpleCommandContent({
  inputValue,
  setInputValue,
  handleSelect,
  isDesktop,
  onClose,
}: SimpleCommandContentProps) {
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const itemsRef = React.useRef<HTMLDivElement[]>([]);

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

  // Calculate the total number of selectable items
  const hasAddOptionAtStart = filteredActivities.length === 0 && inputValue.trim() !== "";
  const hasAddOptionAtEnd = showAddOption && filteredActivities.length > 0;
  const totalItems = filteredActivities.length + 
    (hasAddOptionAtStart ? 1 : 0) + 
    (hasAddOptionAtEnd ? 1 : 0);

      // Handle keyboard navigation
      const handleKeyDown = (e: React.KeyboardEvent) => {
    // Don't capture regular typing
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (totalItems === 0) return;

        setHighlightedIndex(prev => {
          if (prev === null) return 0;
          return (prev + 1) % totalItems;
        });
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (totalItems === 0) return;

        setHighlightedIndex(prev => {
          if (prev === null) return totalItems - 1;
          return (prev - 1 + totalItems) % totalItems;
        });
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex !== null) {
          // Calculate which item is selected based on the index
          if (hasAddOptionAtStart && highlightedIndex === 0) {
            handleSelect(inputValue);
          } else if (hasAddOptionAtEnd && highlightedIndex === totalItems - 1) {
            handleSelect(inputValue);
          } else {
            // Adjust index to account for the add option at start
            const activityIndex = hasAddOptionAtStart ? highlightedIndex - 1 : highlightedIndex;
            handleSelect(filteredActivities[activityIndex].name);
          }
        }
        break;

      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
      };

      // Scroll highlighted item into view
      React.useEffect(() => {
    if (highlightedIndex !== null && itemsRef.current[highlightedIndex]) {
      itemsRef.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
      });
    }
      }, [highlightedIndex]);

      // Reset highlighted index when input changes
      React.useEffect(() => {
    setHighlightedIndex(null);
    // Clear the refs array
    itemsRef.current = [];
      }, [inputValue]);

      return (
    <div className="bg-popover rounded-md border shadow-md overflow-hidden flex flex-col">
      {/* Search input */}
      <div className="border-b px-3 py-2 flex items-center gap-2">
        <Search className="h-4 w-4 opacity-50" />
        <Input
          placeholder="Search activities..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-none shadow-none focus-visible:ring-0 px-0 py-1 h-8"
          autoFocus
        />
        {!isDesktop && (
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto -mr-2 h-8 px-2"
            onClick={onClose}
          >
            Cancel
          </Button>
        )}
      </div>

      {/* Results list */}
      <div className="max-h-[300px] overflow-y-auto py-2">
        {/* Add option at start (when no matches) */}
        {filteredActivities.length === 0 && inputValue.trim() !== "" && (
          <div 
            ref={el => {
              if (el) itemsRef.current[0] = el;
            }}
            className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 ${highlightedIndex === 0 ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
            onClick={() => handleSelect(inputValue)}
          >
            <Plus className="h-4 w-4" />
            <span>
              Add <strong>"{inputValue}"</strong> as a new activity
            </span>
          </div>
        )}

        {filteredActivities.length === 0 && inputValue.trim() === "" && (
          <div className="px-4 py-6 text-sm text-center text-muted-foreground">
            No activities found.
          </div>
        )}

        {/* Activity items */}
        {filteredActivities.map((activity, idx) => {
          // Calculate the correct highlight index
          const itemIdx = hasAddOptionAtStart ? idx + 1 : idx;

          return (
            <div
              key={activity.id}
              ref={el => {
                if (el) itemsRef.current[itemIdx] = el;
              }}
              className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 ${highlightedIndex === itemIdx ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
              onClick={() => handleSelect(activity.name)}
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: activity.category.hexColor }}
              />
              {activity.name}
              {inputValue === activity.name && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </div>
          );
        })}

        {/* Add option at end (when there are matches) */}
        {showAddOption && filteredActivities.length > 0 && (
          <div
            ref={el => {
              if (el) itemsRef.current[totalItems - 1] = el;
            }}
            className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 border-t mt-2 pt-3 ${highlightedIndex === totalItems - 1 ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
            onClick={() => handleSelect(inputValue)}
          >
            <Plus className="h-4 w-4" />
            <span>
              Add <strong>"{inputValue}"</strong> as a new activity
            </span>
          </div>
        )}
      </div>
      {isDesktop && (
        <div className="text-xs text-muted-foreground text-center border-t py-1">
          Use ↑ and ↓ to navigate, Enter to select
        </div>
      )}
    </div>
  );
}
