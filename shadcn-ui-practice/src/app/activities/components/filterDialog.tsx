"use client"

import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

interface FilterDialogProps<T> {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder: string
  items: T[]
  inputValue: string
  onInputChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  getItemLabel: (item: T) => string
  getItemKey: (item: T) => string | number
}

export function FilterDialog<T>({
  open,
  onOpenChange,
  placeholder,
  items,
  inputValue,
  onInputChange,
  onKeyDown,
  getItemLabel,
  getItemKey,
}: FilterDialogProps<T>) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} showCloseButton={false}>
      <CommandInput
        placeholder={placeholder}
        value={inputValue}
        onValueChange={onInputChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <CommandList>
        <div className="flex flex-col">
          <div className="overflow-hidden p-1">
            {items.map((item) => (
              <div
                key={getItemKey(item)}
                className="relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none"
              >
                <span>{getItemLabel(item)}</span>
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 border-t bg-popover mt-auto flex items-center gap-2 px-2 py-1.5 text-sm select-none text-muted-foreground">
            Press Enter to filter or Esc to cancel
          </div>
        </div>
      </CommandList>
    </CommandDialog>
  )
}
