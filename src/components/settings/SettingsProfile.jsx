/* Paramètres - Profil utilisateur */

'use client'

import { useState } from 'react'
import { Camera, Save } from 'lucide-react'
import { useToast } from '@/contexts/ToastContext'

export default function SettingsProfile() {
  const { success } = useToast()
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'Boss',
    email: 'admin@pulsai.io',
    phone: '+33 6 12 34 56 78',
    company: 'PulsAI SAS',
    role: 'Administrateur',
    timezone: 'Europe/Paris',
    language: 'fr',
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    success('Profil mis à jour avec succès !')
  }

  return (
    <div className="space-y-6">
      {/* Section avatar */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-6">Photo de profil</h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl gradient-secondary flex items-center justify-center font-bold text-3xl text-gray-900">
              AB
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-medium mb-1">Admin Boss</p>
            <p className="text-muted text-sm mb-3">JPG, PNG ou WebP · Max 2 Mo</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-dark-light border border-custom rounded-lg hover:border-primary transition-colors text-white">
                Changer la photo
              </button>
              <button className="px-4 py-2 text-sm text-muted hover:text-white transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section informations personnelles */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-6">Informations personnelles</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Prénom</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Adresse email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Entreprise</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Fuseau horaire</label>
              <select
                value={formData.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Langue</label>
              <select
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="gradient-primary px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Save size={18} />
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
