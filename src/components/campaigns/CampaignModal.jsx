'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastContext'
import { 
  Mail, 
  Gift, 
  Bell, 
  UserPlus, 
  Calendar,
  Users, 
  Sparkles, 
  Star, 
  Moon,
  Lightbulb,
  Save,
} from 'lucide-react'

// ✅ AJOUTE onAdd ICI
export default function CampaignModal({ isOpen, onClose, onAdd }) {
  const { success } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    type: 'newsletter',
    sendDate: '',
    segment: 'all',
    subject: '',
    content: '',
  })

  // ✅ Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      name: '',
      type: 'newsletter',
      sendDate: '',
      segment: 'all',
      subject: '',
      content: '',
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    if (formData.sendDate && new Date(formData.sendDate) < new Date()) {
      alert('La date d\'envoi doit être dans le futur')
      return
    }
    
    // ✅ APPELLE onAdd ICI !
    if (onAdd) {
      onAdd(formData)
    }
    
    success('Campagne créée avec succès !')
    resetForm()
    onClose()
  }

  // ✅ Fonction pour sauvegarder en brouillon
  const handleSaveDraft = () => {
    if (onAdd) {
      onAdd({ ...formData, sendDate: '' }) // Sans date = brouillon
    }
    success('Brouillon enregistré !')
    resetForm()
    onClose()
  }

  const inputClasses = "w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"

  const minDateTime = new Date().toISOString().slice(0, 16)

  const campaignTypes = [
    { value: 'newsletter', label: 'Newsletter', icon: Mail },
    { value: 'promo', label: 'Promotion', icon: Gift },
    { value: 'relance', label: 'Relance', icon: Bell },
    { value: 'onboarding', label: 'Onboarding', icon: UserPlus },
  ]

  const segments = [
    { value: 'all', label: 'Tous les contacts', icon: Users },
    { value: 'active', label: 'Contacts actifs', icon: Sparkles },
    { value: 'vip', label: 'Clients VIP', icon: Star },
    { value: 'inactive', label: 'Contacts inactifs', icon: Moon },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle campagne" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom de la campagne */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Nom de la campagne <span className="text-status-error">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Newsletter Février 2026"
            className={inputClasses}
          />
        </div>

        {/* Type et Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Type de campagne
            </label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className={`${inputClasses} pl-10`}
              >
                {campaignTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {(() => {
                const selectedType = campaignTypes.find(t => t.value === formData.type)
                const Icon = selectedType?.icon || Mail
                return (
                  <Icon 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" 
                  />
                )
              })()}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Date et heure d'envoi
            </label>
            <input
              type="datetime-local"
              value={formData.sendDate}
              onChange={e => setFormData({ ...formData, sendDate: e.target.value })}
              min={minDateTime}
              className={inputClasses}
            />
            <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
              <Calendar size={12} />
              Sélectionnez une date future
            </p>
          </div>
        </div>

        {/* Segment cible */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Segment cible
          </label>
          <div className="relative">
            <select
              value={formData.segment}
              onChange={e => setFormData({ ...formData, segment: e.target.value })}
              className={`${inputClasses} pl-10`}
            >
              {segments.map(segment => (
                <option key={segment.value} value={segment.value}>
                  {segment.label}
                </option>
              ))}
            </select>
            {(() => {
              const selectedSegment = segments.find(s => s.value === formData.segment)
              const Icon = selectedSegment?.icon || Users
              return (
                <Icon 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" 
                />
              )
            })()}
          </div>
        </div>

        {/* Objet */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Objet de l'email <span className="text-status-error">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Ex: Découvrez nos nouveautés !"
            className={inputClasses}
          />
          <p className="text-xs text-text-muted mt-1">
            {formData.subject.length}/100 caractères
          </p>
        </div>

        {/* Contenu */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Contenu du message <span className="text-status-error">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            required
            rows={8}
            placeholder="Rédigez le contenu de votre campagne..."
            className={`${inputClasses} resize-none`}
          />
          <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
            <Lightbulb size={12} className="text-yellow-500" />
            Astuce : Personnalisez avec {'{prenom}'}, {'{nom}'} • {formData.content.length} caractères
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto px-6"
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}  // ✅ UTILISE LA FONCTION
            className="w-full sm:w-auto px-6"
          >
            <Save size={16} className="mr-2" />
            Enregistrer brouillon
          </Button>
          <Button type="submit" className="w-full sm:w-auto px-6">
            <Sparkles size={16} className="mr-2" />
            Créer la campagne
          </Button>
        </div>
      </form>
    </Modal>
  )
}