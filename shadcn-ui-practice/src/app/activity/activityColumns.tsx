"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
    header: "Activity",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({row}) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Change Category</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]