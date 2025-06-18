"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface SortOrderEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialSortOrder: number
  onSave: (sortOrder: number) => void
}

export function SortOrderEditor({
  open,
  onOpenChange,
  initialSortOrder,
  onSave,
}: SortOrderEditorProps) {
  const [sortOrder, setSortOrder] = React.useState(initialSortOrder)

  React.useEffect(() => {
    setSortOrder(initialSortOrder)
  }, [initialSortOrder])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Sort Order</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sortOrder" className="text-right">
              Sort Order
            </Label>
            <Input
              id="sortOrder"
              type="number"
              min="1"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value))}
              className="col-span-3 h-10"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(sortOrder)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
