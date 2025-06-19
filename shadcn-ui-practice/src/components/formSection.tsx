import * as React from "react"
import { SectionHeading } from "@/components/sectionHeading"

interface FormSectionProps {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}

export function FormSection({
  title,
  description,
  className = "",
  children,
}: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SectionHeading title={title} description={description} />
      {children}
    </div>
  )
}
