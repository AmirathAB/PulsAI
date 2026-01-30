   // Layout Principal - Contient le Sidebar sur toutes les pages

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
          {/* Menu latéral */}
          <Sidebar />
          
          {/* Contenu principal (décalé de 280px à cause du Sidebar) */}
          <main className="flex-1 ml-[280px] min-h-screen relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}