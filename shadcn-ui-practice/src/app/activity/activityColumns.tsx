"use client"

import * as React from "react"

import { ColumnDef } from "@tanstack/react-table"
import {MoreVertical, ArrowUpDown, Filter, Calendar, Smile, Calculator, User, CreditCard, Settings} from "lucide-react"

import {Activity, Category, activities, categories} from "@/app/activity/data";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"



export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      const [filterOpen, setFilterOpen] = React.useState(false)
      const [inputValue, setInputValue] = React.useState("")

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          column.setFilterValue(inputValue)
          setFilterOpen(false)
        }
      }

      const filteredActivities = activities.filter(activity =>
        activity.name.toLowerCase().includes(inputValue.toLowerCase())
      )

      return (
        <div className={"flex flex-row items-center"}>
          <label className={"mr-2"}>Activity</label>
          <Button
            size={"sm"}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button
            size={"sm"}
            variant="ghost"
            onClick={() => setFilterOpen(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <CommandDialog open={filterOpen} onOpenChange={setFilterOpen} showCloseButton={false}>
            <CommandInput 
              placeholder="Filter activities..." 
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
            />
            <CommandList>
              <CommandEmpty>No activities found</CommandEmpty>
                {filteredActivities.map((activity) => (
                  <CommandItem 
                    key={activity.id}
                    onSelect={() => {
                      column.setFilterValue(inputValue)
                      setFilterOpen(false)
                    }}
                  >
                    <span>{activity.name}</span>
                  </CommandItem>
                ))}
            </CommandList>
          </CommandDialog>
        </div>
      )
    },
  },
  {
    id: "categoryname",
    accessorKey: "category.name",
    header: ({ column }) => {
      const [filterOpen, setFilterOpen] = React.useState(false)
      const [inputValue, setInputValue] = React.useState("")

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          column.setFilterValue(inputValue)
          setFilterOpen(false)
        }
      }

      const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      )

      return (
        <div className={"flex flex-row items-center"}>
          <label className={"mr-2"}>Category</label>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setFilterOpen(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <CommandDialog open={filterOpen} onOpenChange={setFilterOpen} showCloseButton={false}>
            <CommandInput 
              placeholder="Filter categories..." 
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
            />
            <CommandList>
              <CommandEmpty>No categories found</CommandEmpty>
              <CommandGroup heading="Categories">
                {filteredCategories.map((category) => (
                  <CommandItem 
                    key={category.id} 
                    onSelect={() => {
                      column.setFilterValue(inputValue)
                      setFilterOpen(false)
                    }}
                  >
                    <span>{category.name}</span>
                  </CommandItem>
                ))}
                <CommandSeparator />
                <CommandItem 
                  onSelect={() => {
                    column.setFilterValue("")
                    setFilterOpen(false)
                  }}
                >
                  Clear Filter
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      const [open, setOpen] = React.useState(false)

      return (
        <div className={"flex justify-end"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  Change Category
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Select a category..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {categories.map((category) => (
                <CommandItem key={category.id} onSelect={() => setOpen(false)}>
                  <span>{category.name}</span>
                </CommandItem>
              ))}
            </CommandList>
          </CommandDialog>
        </div>
      )
    }
  }
]