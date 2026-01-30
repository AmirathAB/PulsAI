/* Barre de recherche globale */

'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ placeholder = 'Rechercher...', onSearch }) {
  const [query, setQuery] = useState('')

  // Gérer la saisie
  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  // Effacer la recherche
  const handleClear = () => {
    setQuery('')
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <div className="relative flex-1 lg:w-72">
      {/* Icône recherche */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
      
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-dark-card border border-custom rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
      />
      
      {/* Bouton effacer */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}