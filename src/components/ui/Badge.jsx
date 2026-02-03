/* Pour créer le badge */ 
'use client'

import { cn } from '@/utils/helpers'

export default function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-background-hover text-text-secondary',
    primary: 'bg-primary/20 text-primary',
    success: 'bg-status-success/20 text-status-success',
    warning: 'bg-status-warning/20 text-status-warning',
    error: 'bg-status-error/20 text-status-error',
  }

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold inline-block',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
