/* Layout principal - Responsive avec menu mobile */

'use client'

import { useState } from 'react'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import MobileMenu from '@/components/layout/MobileMenu'

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="fr">
      <body className="bg-dark min-h-screen">
        <div className="flex">
          {/* Menu hamburger mobile */}
          <MobileMenu isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Contenu principal */}
          <main className="flex-1 lg:ml-[280px] min-h-screen relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
