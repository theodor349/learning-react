"use client"

import { ColumnDef } from "@tanstack/react-table"

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
]