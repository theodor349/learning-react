"use client"

import * as React from "react"
import { Column } from "@tanstack/react-table"
import { Check, ChevronsUpDown } from "lucide-react"

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

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  items?: any[]
  getItemLabel?: (item: any) => string
  getItemKey?: (item: any) => string | number
  filterFn?: (item: any, query: string) => boolean
}

export function ColumnHeader<TData, TValue>(
  props: ColumnHeaderProps<TData, TValue>
) {
  const { column, title, items, getItemLabel, getItemKey, filterFn } = props
  const [open, setOpen] = React.useState(false)

  if (!column.getCanFilter()) {
    return <div>{title}</div>
  }

  if (items && getItemLabel && getItemKey && filterFn) {
    return (
      <div className="flex items-center space-x-2">
        <DropdownFilter
          column={column}
          title={title}
          items={items}
          getItemLabel={getItemLabel}
          getItemKey={getItemKey}
          filterFn={filterFn}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div>{title}</div>
      <Input
        placeholder={`Filter ${title.toLowerCase()}...`}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-8 w-full"
      />
    </div>
  )
}

function DropdownFilter<TData, TValue>({
  column,
  title,
  items,
  getItemLabel,
  getItemKey,
  filterFn,
}: ColumnHeaderProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false)
  const facets = column.getFacetedUniqueValues()
  const selectedValues = new Set(((column.getFilterValue() as string[]) || []))

  return (
    <div className="flex items-center space-x-2">
      <div>{title}</div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
          >
            <ChevronsUpDown className="h-3.5 w-3.5 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedValues.has(getItemKey(item).toString())
                  const itemKey = getItemKey(item).toString()
                  const itemLabel = getItemLabel(item)

                  return (
                    <CommandItem
                      key={itemKey}
                      value={itemKey}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(itemKey)
                        } else {
                          selectedValues.add(itemKey)
                        }
                        const filterValues = Array.from(selectedValues)
                        column.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        )
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      <span>{itemLabel}</span>
                      {facets?.get(itemKey) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(itemKey)}
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
