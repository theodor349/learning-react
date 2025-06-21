import * as React from "react";
import { CommandDialog } from "@/components/ui/command";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CommandContent } from "./commandPopoverContent";

export interface CommandPopoverProps {
  activeInput: number | null;
  setActiveInput: (index: number | null) => void;
  values: string[];
  onChange: (index: number, value: string) => void;
}

export function CommandPopover({
  activeInput,
  setActiveInput,
  values,
  onChange,
}: CommandPopoverProps) {
  const [inputValue, setInputValue] = React.useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // When active input changes, update the input value
  React.useEffect(() => {
    if (activeInput !== null) {
      setInputValue(values[activeInput] || "");
    } else {
      setInputValue("");
    }
  }, [activeInput, values]);

  const handleSelect = (value: string) => {
    if (activeInput !== null) {
      onChange(activeInput, value);
      setActiveInput(null);
    }
  };

  const closeCommand = () => {
    setActiveInput(null);
  };

  // Render nothing if no input is active
  if (activeInput === null) {
    return null;
  }

  if (isDesktop) {
    // Desktop version - position the command under the input field
    return (
      <div className="relative w-full">
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-popover shadow-md">
          <CommandContent 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSelect={handleSelect}
          />
        </div>
      </div>
    );
  }

  // Mobile version - use CommandDialog that opens from the top
  return (
    <CommandDialog
      open={activeInput !== null}
      onOpenChange={(open) => {
        if (!open) closeCommand();
      }}
      showCloseButton={true}
    >
      <CommandContent 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSelect={handleSelect}
      />
    </CommandDialog>
  );
}
