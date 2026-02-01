'use client'

import { cn } from '@/utils/helpers'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all'

  const variants = {
    primary:
      'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20',
    secondary:
      'bg-background-card border border-border hover:bg-background-hover text-text-secondary hover:text-white',
    outline:
      'border border-border hover:bg-background-hover text-text-secondary hover:text-white',
    ghost: 'hover:bg-background-hover text-text-secondary hover:text-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
