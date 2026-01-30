/* Sidebar - Responsive avec drawer mobile */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, Ticket, Mail, Bot, X } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Statistiques', href: '/stats', icon: BarChart3 },
  { name: 'Tickets', href: '/tickets', icon: Ticket, badge: 5 },
  { name: 'Campagnes', href: '/campaigns', icon: Mail },
  { name: 'Chat AI', href: '/chat', icon: Bot, badge: 12 },
]

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/70 z-40 animate-fadeIn"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-dark-light border-r border-custom z-50
          w-[280px]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Bouton fermer mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-6 right-6 text-muted hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center font-bold text-xl">
            P
          </div>
          <span className="font-unbounded text-2xl font-bold text-gradient">PulsAI</span>
        </div>

        {/* Navigation */}
        <nav className="px-4 mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`relative flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-muted hover:bg-primary/10 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-primary rounded-r-full" />
                    )}
                    <Icon size={20} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-danger text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
