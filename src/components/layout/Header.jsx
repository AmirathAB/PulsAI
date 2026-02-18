/* Header - Responsive optimisé */

'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Mettre la  valeur par défaut si aucun profil n'est encore enregistré
const DEFAULT_PROFILE = { firstName: 'Admin', lastName: 'Boss' }

export default function Header({ title, subtitle, onSearch }) {
  const [query, setQuery] = useState('')

  // On utilise [profile] sans setter car le Header ne modifie pas le profil, il le lit seulement
  const [profile] = useLocalStorage('pulsai_profile', DEFAULT_PROFILE)

  //  lecture de la photo de profil en base64 (même clé que SettingsProfile)
  const [avatarUrl] = useLocalStorage('pulsai_avatar', null)

  //  calcul des initiales depuis le prénom et nom stockés
  const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase() || 'AB'
  const displayName = profile.firstName || 'Admin'

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
  }

  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 lg:mb-8">
      {/* Titre */}
      <div className="pl-16 lg:pl-0">
        <h1 className="font-unbounded text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">
          {title}
        </h1>
        <p className="text-muted text-sm lg:text-base mt-1">{subtitle}</p>
      </div>

      {/* Recherche + Profil */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        {/* Recherche */}
        <div className="relative flex-1 lg:flex-none lg:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Rechercher..."
            className="w-full pl-11 pr-10 py-2.5 lg:py-3 bg-dark-card border border-custom rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Profil */}
        <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-dark-card border border-custom rounded-xl cursor-pointer hover:border-primary transition-colors">
          {/* MODIFIÉ : affiche la photo uploadée si elle existe, sinon les initiales calculées */}
          {/* Avant : avatar statique "AB" et texte statique "Admin" */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full gradient-secondary flex items-center justify-center font-semibold text-sm text-gray-900">
              {initials}
            </div>
          )}
          {/* affiche le prénom depuis le profil sauvegardé */}
          <span className="hidden sm:block font-medium text-sm lg:text-base">{displayName}</span>
        </div>
      </div>
    </header>
  )
}
