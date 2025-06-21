"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SimpleCommandContent } from "./SimpleCommandContent";
import { createPortal } from "react-dom";

interface ActivitySelectorProps {
  activeInput: number | null;
  setActiveInput: (index: number | null) => void;
  values: string[];
  onChange: (index: number, value: string) => void;
}

export function ActivitySelector({
  activeInput,
  setActiveInput,
  values,
  onChange,
}: ActivitySelectorProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);
  const inputRef = React.useRef<HTMLDivElement>(null);

  // Handle global keyboard events for Escape
  React.useEffect(() => {
    if (!isMounted || activeInput === null) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setActiveInput(null);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isMounted, activeInput, setActiveInput]);

  // Client-side only
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const closeSelector = () => {
    setActiveInput(null);
  };

  // Don't render anything if no input is active or if we're not mounted
  if (!isMounted || activeInput === null) {
    return null;
  }

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-background/80 backdrop-blur-sm"
      onClick={(e) => {
        // Close if clicking directly on the backdrop
        if (e.target === e.currentTarget) {
          closeSelector();
        }
      }}
      onMouseDown={(e) => {
        // Only handle clicks directly on the backdrop
        if (e.target !== e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      <div 
        ref={inputRef} 
        className="w-full max-w-md mx-auto mt-16 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <SimpleCommandContent
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSelect={handleSelect}
          onClose={closeSelector}
        />
      </div>
    </div>,
    document.body
  );
}
