/* Modal de visualisation des détails du ticket (lecture seule) */

'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TicketDetailsModal({ isOpen, onClose, ticket }) {
  if (!ticket) return null

  // Styles des statuts
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Ouvert':
        return { badge: 'badge-blue', text: 'Ouvert' }
      case 'En attente':
        return { badge: 'badge-orange', text: 'En attente' }
      case 'Résolu':
        return { badge: 'badge-green', text: 'Résolu' }
      default:
        return { badge: 'badge-blue', text: status }
    }
  }

  // Styles des priorités
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Haute':
        return { badge: 'badge-red', text: 'Haute' }
      case 'Moyenne':
        return { badge: 'badge-orange', text: 'Moyenne' }
      case 'Basse':
        return { badge: 'badge-green', text: 'Basse' }
      default:
        return { badge: 'badge-blue', text: priority }
    }
  }

  const statusStyle = getStatusStyle(ticket.status)
  const priorityStyle = getPriorityStyle(ticket.priority)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                <div>
                  <h2 className="font-unbounded text-xl font-bold text-white">
                    Détails du ticket
                  </h2>
                  <p className="text-sm text-muted mt-1">ID: {ticket.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg bg-dark-card hover:bg-dark flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-muted" />
                </button>
              </div>

              {/* Contenu */}
              <div className="p-6 space-y-6">
                {/* Titre du ticket */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Titre
                  </label>
                  <p className="text-white text-base">{ticket.title}</p>
                </div>

                {/* Grille : Statut + Priorité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Statut */}
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                      Statut
                    </label>
                    <span
                      className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.badge}`}
                    >
                      {statusStyle.text}
                    </span>
                  </div>

                  {/* Priorité */}
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">
                      Priorité
                    </label>
                    <span
                      className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${priorityStyle.badge}`}
                    >
                      {priorityStyle.text}
                    </span>
                  </div>
                </div>

                {/* Assigné à */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Assigné à
                  </label>
                  <p className="text-white text-base">{ticket.assignedTo}</p>
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Client
                  </label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm text-white"
                      style={{ backgroundColor: ticket.client.color }}
                    >
                      {ticket.client.initials}
                    </div>
                    <span className="text-white text-base">{ticket.client.name}</span>
                  </div>
                </div>

                {/* Date de création */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Créé le
                  </label>
                  <p className="text-white text-base">{ticket.createdAt}</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Description
                  </label>
                  {ticket.description ? (
                    <div className="bg-dark-card border border-custom rounded-xl p-4">
                      <p className="text-white text-base whitespace-pre-wrap">
                        {ticket.description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted italic">Aucune description fournie</p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-custom">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-medium text-white gradient-primary hover:opacity-90 transition-opacity"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}