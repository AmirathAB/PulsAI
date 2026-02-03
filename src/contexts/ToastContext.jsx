/* Gestion des notifications temporaire : succès; erreur; info et warning*/ 

'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }, [])

  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success: message => addToast(message, 'success'),
        error: message => addToast(message, 'error'),
        info: message => addToast(message, 'info'),
        warning: message => addToast(message, 'warning'),
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
