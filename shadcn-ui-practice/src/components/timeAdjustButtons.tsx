"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface TimeAdjustButtonsProps {
  onAdjust: (minutes: number) => void
  className?: string
}

export function TimeAdjustButtons({ onAdjust, className }: TimeAdjustButtonsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onAdjust(-15)}
      >
        -15 min
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onAdjust(15)}
      >
        +15 min
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="sm" 
        onClick={() => onAdjust(30)}
      >
        +30 min
      </Button>
    </div>
  )
}
