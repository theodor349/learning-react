"use client"

import { Card } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "front",
    header: "Front",
  },
  {
    accessorKey: "back",
    header: "Back",
  },
]
