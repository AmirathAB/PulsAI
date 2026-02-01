"use client"

import { SearchProvider } from '@/contexts/SearchContext'
import { ToastProvider } from '@/contexts/ToastContext'
import ToastContainer from '@/components/ui/ToastContainer'

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <SearchProvider>
        {children}
        <ToastContainer />
      </SearchProvider>
    </ToastProvider>
  )
}
