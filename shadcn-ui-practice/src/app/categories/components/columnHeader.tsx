"use client"

import * as React from "react"
import { Column } from "@tanstack/react-table"
import {ArrowUpDown, Check, ChevronsUpDown, Filter} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

import { Input } from "@/components/ui/input"
import {FilterDialog} from "@/app/activities/components/filterDialog";

interface ColumnHeaderProps<T, U> {
  column: Column<T, unknown>
  title: string
  items: U[]
  getItemLabel: (item: U) => string
  getItemKey: (item: U) => string | number
  filterFn: (item: U, query: string) => boolean
  showFilter: boolean
}

export function ColumnHeader<T, U>({
                                     column,
                                     title,
                                     items,
                                     getItemLabel,
                                     getItemKey,
                                     filterFn,
                                     showFilter = true,
                                   }: ColumnHeaderProps<T, U>) {
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      column.setFilterValue(inputValue)
      setFilterOpen(false)
    }
  }

  const filteredItems = items.filter(item => filterFn(item, inputValue))

  return (
    <div className="flex flex-row items-center">
      <label className="mr-2">{title}</label>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
      {showFilter && <Button
        size="sm"
        variant="ghost"
        onClick={() => setFilterOpen(true)}
        className="relative"
      >
        <Filter className="h-4 w-4"/>
        {inputValue.length > 0 && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
        )}
      </Button>}
      <FilterDialog
        open={filterOpen}
        onOpenChange={setFilterOpen}
        placeholder={`Filter ${title.toLowerCase()}...`}
        items={filteredItems}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onKeyDown={handleKeyDown}
        getItemLabel={getItemLabel}
        getItemKey={getItemKey}
      />
    </div>
  )
}
