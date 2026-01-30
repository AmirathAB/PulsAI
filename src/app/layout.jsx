/* Layout principal */

import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

export const metadata = {
  title: 'PulsAI - CRM Intelligent',
  description: 'Plateforme CRM avec IA conversationnelle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-dark min-h-screen">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-[280px] min-h-screen relative z-10">{children}</main>
        </div>
      </body>
    </html>
  )
}