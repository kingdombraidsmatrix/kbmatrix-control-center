import React from 'react'

interface PageHeaderProps {
  title?: React.ReactNode
  children?: React.ReactNode
  subtitle?: React.ReactNode
}
export function PageHeader({ title, children, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h2 className="font-semibold">{title ?? children}</h2>
      {!!subtitle && (
        <p className="text-muted-foreground font-medium text-sm leading-none">
          {subtitle}
        </p>
      )}
    </div>
  )
}
