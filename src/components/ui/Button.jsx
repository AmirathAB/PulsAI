/* Pour créér un bouton personnalisé et réutilisable */
'use client'

export default function Button({ 
  children, 
  variant = 'primary', 
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 hover:shadow-primary/40',
    outline: 'border-2 border-border text-text-secondary hover:bg-background-hover hover:text-white',
    danger: 'bg-status-error hover:bg-red-600 text-white',
    ghost: 'hover:bg-background-hover text-text-secondary hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}