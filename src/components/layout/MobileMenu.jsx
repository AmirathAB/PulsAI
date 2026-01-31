/* Menu mobile - Bouton hamburger */

'use client'

import { Menu } from 'lucide-react'

export default function MobileMenu({ isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg"
      aria-label="Menu"
    >
      <Menu size={24} className="text-white" />
    </button>
  )
}
