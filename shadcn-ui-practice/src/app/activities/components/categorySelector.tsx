"use client"

import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { type Category } from "../data"

interface CategorySelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: Category[]
  onSelectCategory: (category: Category) => void
}

export function CategorySelector({
  open,
  onOpenChange,
  categories,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Select a category..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {categories.map((category) => (
          <CommandItem 
            key={category.id} 
            onSelect={() => {
              onSelectCategory(category)
              onOpenChange(false)
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.hexColor }}
              />
              <span>{category.name}</span>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
