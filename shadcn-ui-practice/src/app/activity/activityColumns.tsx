"use client"

import * as React from "react"

import { ColumnDef } from "@tanstack/react-table"
import {MoreVertical, ArrowUpDown, Filter, Calendar, Smile, Calculator, User, CreditCard, Settings} from "lucide-react"

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

const categories: Category[] = [
  {
    id: 1,
    name: "Fitness",
    normalisedName: "fitness",
    hexColor: "#FF5733",
    sortOrder: 1
  },
  {
    id: 2,
    name: "Wellness",
    normalisedName: "wellness",
    hexColor: "#33FF57",
    sortOrder: 2
  },
  {
    id: 3,
    name: "Sports",
    normalisedName: "sports",
    hexColor: "#3357FF",
    sortOrder: 3
  },
  {
    id: 4,
    name: "Outdoor",
    normalisedName: "outdoor",
    hexColor: "#FFA500",
    sortOrder: 4
  },
  {
    id: 5,
    name: "Arts",
    normalisedName: "arts",
    hexColor: "#800080",
    sortOrder: 5
  },
  {
    id: 6,
    name: "Learning",
    normalisedName: "learning",
    hexColor: "#008080",
    sortOrder: 6
  },
  {
    id: 7,
    name: "Social",
    normalisedName: "social",
    hexColor: "#FF1493",
    sortOrder: 7
  },
  {
    id: 8,
    name: "Work",
    normalisedName: "work",
    hexColor: "#A9A9A9",
    sortOrder: 8
  },
  {
    id: 9,
    name: "Finances",
    normalisedName: "finances",
    hexColor: "#228B22",
    sortOrder: 9
  },
  {
    id: 10,
    name: "Home",
    normalisedName: "home",
    hexColor: "#CD853F",
    sortOrder: 10
  },
  {
    id: 11,
    name: "Travel",
    normalisedName: "travel",
    hexColor: "#4682B4",
    sortOrder: 11
  },
  {
    id: 12,
    name: "Hobbies",
    normalisedName: "hobbies",
    hexColor: "#FFD700",
    sortOrder: 12
  },
  {
    id: 13,
    name: "Self-Care",
    normalisedName: "self-care",
    hexColor: "#FF69B4",
    sortOrder: 13
  },
  {
    id: 14,
    name: "Volunteering",
    normalisedName: "volunteering",
    hexColor: "#8A2BE2",
    sortOrder: 14
  },
  {
    id: 15,
    name: "Pets",
    normalisedName: "pets",
    hexColor: "#BC8F8F",
    sortOrder: 15
  },
  {
    id: 16,
    name: "Shopping",
    normalisedName: "shopping",
    hexColor: "#DAA520",
    sortOrder: 16
  },
  {
    id: 17,
    name: "Medical",
    normalisedName: "medical",
    hexColor: "#FF0000",
    sortOrder: 17
  }
];

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Activity = {
  id: number;
  name: string;
  normalisedName: string;
  category: Category;
}

export type Category = {
  id: number;
  name: string;
  normalisedName: string;
  hexColor: string;
  sortOrder: number;
}

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
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
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    id: "categoryname",
    accessorKey: "category.name",
    header: ({ column }) => {
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
          >
            <Filter className="h-4 w-4" />
          </Button>
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