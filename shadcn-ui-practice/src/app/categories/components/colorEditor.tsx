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

interface ColorEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialColor: string
  onSave: (color: string) => void
}

export function ColorEditor({
  open,
  onOpenChange,
  initialColor,
  onSave,
}: ColorEditorProps) {
  const [color, setColor] = React.useState(initialColor)

  React.useEffect(() => {
    setColor(initialColor)
  }, [initialColor])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Color</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 p-1"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <div className="col-span-3 flex justify-center">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: color }}
            >
              Preview
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(color)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
