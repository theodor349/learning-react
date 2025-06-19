import * as React from "react"

export interface SectionHeadingProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  )
}
