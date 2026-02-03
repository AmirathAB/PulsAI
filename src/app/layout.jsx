'use client'

import { useState } from 'react'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import MobileMenu from '@/components/layout/MobileMenu'
import Providers from '@/components/layout/Providers' // <-- IMPORT

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="fr">
      <body className="bg-dark min-h-screen">
        <Providers> 
          <div className="flex">
            <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 lg:ml-[280px] min-h-screen relative z-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
