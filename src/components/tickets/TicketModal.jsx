/* Modal de création de ticket */

'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const clients = [
  'Marie Dubois',
  'Jean Laurent',
  'Sophie Petit',
  'Alice Moreau',
  'Paul Durand',
]

const agents = ['Thomas R.', 'Sophie M.', 'Pierre L.', 'Non assigné']

export default function TicketModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Basse',
    assignedTo: 'Non assigné',
    client: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Générer un ID unique pour le ticket
    const newTicketId = `TKT-${Math.floor(Math.random() * 10000)}`
    
    // Créer l'objet client avec initiales et couleur
    const clientName = formData.client
    const initials = clientName.split(' ').map(n => n[0]).join('')
    const colors = ['#3590E3', '#BAF09D', '#10b981', '#06b6d4', '#f59e0b']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    // Construire le nouveau ticket
    const newTicket = {
      id: newTicketId,
      title: formData.title,
      client: { 
        name: clientName, 
        initials: initials, 
        color: randomColor 
      },
      status: 'Ouvert',
      priority: formData.priority,
      assignedTo: formData.assignedTo,
      createdAt: 'À l\'instant',
    }
    
    // Envoyer le nouveau ticket au parent
    if (onSubmit) {
      onSubmit(newTicket)
    }
    
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      priority: 'Basse',
      assignedTo: 'Non assigné',
      client: '',
      description: '',
    })
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-light border border-custom rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-custom">
                <h2 className="font-unbounded text-xl font-bold text-white">
                  Nouveau ticket
                </h2>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-lg bg-dark-card hover:bg-dark flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-muted" />
                </button>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Titre du ticket */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Titre du ticket
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Décrivez brièvement le problème"
                    required
                    className="w-full px-4 py-3 bg-dark-card border border-custom rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Priorité */}
                <div>
                  <label className="block text-sm font-medium mb-2">Priorité</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-card border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                  </select>
                </div>

                {/* Assigné à */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Assigné à
                  </label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedTo: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-card border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    {agents.map((agent) => (
                      <option key={agent} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium mb-2">Client</label>
                  <select
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-dark-card border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Décrivez le problème en détail..."
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-card border border-custom rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* Boutons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 rounded-xl font-medium text-white bg-dark-card border border-custom hover:border-primary transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-medium text-white gradient-primary hover:opacity-90 transition-opacity"
                  >
                    Créer le ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}