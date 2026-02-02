'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastContext'

export default function CampaignModal({ isOpen, onClose }) {
  const { success } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    type: 'newsletter',
    sendDate: '',
    segment: 'all',
    subject: '',
    content: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    success('Campagne créée avec succès !')
    onClose()
    setFormData({
      name: '',
      type: 'newsletter',
      sendDate: '',
      segment: 'all',
      subject: '',
      content: '',
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nouvelle campagne">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Nom de la campagne
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Newsletter Février 2026"
            className="w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={e =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white focus:outline-none focus:border-primary"
            >
              <option value="newsletter">Newsletter</option>
              <option value="promo">Promotion</option>
              <option value="relance">Relance</option>
              <option value="onboarding">Onboarding</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Date d'envoi
            </label>
            <input
              type="datetime-local"
              value={formData.sendDate}
              onChange={e =>
                setFormData({ ...formData, sendDate: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Segment cible
          </label>
          <select
            value={formData.segment}
            onChange={e =>
              setFormData({ ...formData, segment: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white focus:outline-none focus:border-primary"
          >
            <option value="all">Tous les contacts</option>
            <option value="active">Contacts actifs</option>
            <option value="vip">Clients VIP</option>
            <option value="inactive">Contacts inactifs</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Objet de l'email
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={e =>
              setFormData({ ...formData, subject: e.target.value })
            }
            placeholder="Ex: 🎉 Découvrez nos nouveautés !"
            className="w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Contenu
          </label>
          <textarea
            value={formData.content}
            onChange={e =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            rows={6}
            placeholder="Rédigez le contenu de votre campagne..."
            className="w-full px-4 py-2.5 bg-background-hover border border-border rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6"
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              success('Brouillon enregistré !')
              onClose()
            }}
            className="px-6"
          >
            Enregistrer brouillon
          </Button>
          <Button type="submit" className="px-6">
            Créer la campagne
          </Button>
        </div>
      </form>
    </Modal>
  )
}
