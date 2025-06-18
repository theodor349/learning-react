"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"
import { Category, categories } from "@/app/categories/data";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ColumnHeader } from "./components/columnHeader"
import { ColorEditor } from "./components/colorEditor"
import { SortOrderEditor } from "./components/sortOrderEditor"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Sort Order" />
    ),
    cell: ({ row }) => {
      return <div>{row.getValue("sortOrder")}</div>
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.getValue("color") as string
      return (
        <div className="flex items-center">
          <div
            className="h-6 w-6 rounded-full mr-2"
            style={{ backgroundColor: color }}
          />
          <span>{color}</span>
        </div>
      )
    },
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
      const [colorEditorOpen, setColorEditorOpen] = React.useState(false)
      const [sortOrderEditorOpen, setSortOrderEditorOpen] = React.useState(false)

      // These would be connected to an API in a real application
      const handleColorChange = (newColor: string) => {
        console.log(`Changed color for ${category.name} to ${newColor}`)
        setColorEditorOpen(false)
      }

      const handleSortOrderChange = (newSortOrder: number) => {
        console.log(`Changed sort order for ${category.name} to ${newSortOrder}`)
        setSortOrderEditorOpen(false)
      }

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setColorEditorOpen(true)}>
                Change Color
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrderEditorOpen(true)}>
                Change Sort Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ColorEditor
            open={colorEditorOpen}
            onOpenChange={setColorEditorOpen}
            initialColor={category.color}
            onSave={handleColorChange}
          />

          <SortOrderEditor
            open={sortOrderEditorOpen}
            onOpenChange={setSortOrderEditorOpen}
            initialSortOrder={category.sortOrder}
            onSave={handleSortOrderChange}
          />
        </div>
      )
    },
  },
]
