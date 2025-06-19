"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import { ActivityInput } from "@/app/addentry/components/activityInput"

interface ActivityInputListProps {
  activityInputs: string[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, value: string) => void
}

export function ActivityInputList({
  activityInputs,
  onAdd,
  onRemove,
  onChange,
}: ActivityInputListProps) {
  return (
    <div className="space-y-4">
      {activityInputs.map((activity, index) => (
        <div key={index} className="flex items-center gap-2">
          <ActivityInput
            value={activity}
            onChange={(value) => onChange(index, value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            title="Remove activity"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onAdd}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Add another activity
      </Button>
    </div>
  )
}
