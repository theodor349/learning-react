"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"
import { Activity, Category, activities, categories } from "@/app/activities/data";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ColumnHeader } from "./components/columnHeader"
import { CategorySelector } from "./components/categorySelector"

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ColumnHeader<Activity, Activity>
        column={column}
        title="Activity"
        items={activities}
        getItemLabel={(activity) => activity.name}
        getItemKey={(activity) => activity.id}
        filterFn={(activity, query) => 
          activity.name.toLowerCase().includes(query.toLowerCase())
        }
      />
    ),
  },
  {
    id: "categoryname",
    accessorKey: "category.name",
    cell: ({ row }) => {
      const category = row.original.category
      return (
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full border border-solid border-primary/50"
            style={{ backgroundColor: category.hexColor }}
          />
          <span>{category.name}</span>
        </div>
      )
    },
    header: ({ column }) => (
      <ColumnHeader<Activity, Category>
        column={column}
        title="Category"
        items={categories}
        getItemLabel={(category) => category.name}
        getItemKey={(category) => category.id}
        filterFn={(category, query) => 
          category.name.toLowerCase().includes(query.toLowerCase())
        }
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = React.useState(false)
      const activity = row.original

      const handleSelectCategory = (category: Category) => {
        // In a real app, this would update the activities category
        console.log(`Changing ${activity.name} category to ${category.name}`)
      }

      return (
        <div className="flex justify-end">
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
          <CategorySelector
            open={open}
            onOpenChange={setOpen}
            categories={categories}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      )
    }
  }
]