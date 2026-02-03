/* Section card du dashboard */
'use client'

import { cn } from '@/utils/helpers'

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-background-card rounded-xl p-6 border border-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
