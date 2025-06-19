import * as React from "react"
import { Button } from "@/components/ui/button"

export interface FormActionsProps {
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  className?: string
}

export function FormActions({
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  className = "",
}: FormActionsProps) {
  return (
    <div className={`flex items-center justify-end gap-2 ${className}`}>
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}
      <Button type="submit">{submitLabel}</Button>
    </div>
  )
}
