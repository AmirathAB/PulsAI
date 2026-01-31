/* Tableau de tickets - Avec pagination */

'use client'

import { useState } from 'react'
import { Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 5

export default function TicketTable({ tickets }) {
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTickets = tickets.slice(startIndex, endIndex)

  // Styles des statuts
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Ouvert':
        return { badge: 'badge-blue', text: 'Ouvert', bar: 'bg-primary' }
      case 'En attente':
        return { badge: 'badge-orange', text: 'En attente', bar: 'bg-warning' }
      case 'Résolu':
        return { badge: 'badge-green', text: 'Résolu', bar: 'bg-secondary' }
      default:
        return { badge: 'badge-blue', text: status, bar: 'bg-primary' }
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

  return (
    <div className="bg-dark-card border border-custom rounded-2xl p-5 lg:p-6">
      {/* Table wrapper avec overflow */}
      <div className="overflow-x-auto -mx-5 lg:-mx-6 px-5 lg:px-6">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-custom">
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Ticket
              </th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Client
              </th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Priorité
              </th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Assigné à
              </th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Créé
              </th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-4 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-muted">
                  Aucun ticket trouvé
                </td>
              </tr>
            ) : (
              currentTickets.map((ticket) => {
                const statusStyle = getStatusStyle(ticket.status)
                const priorityStyle = getPriorityStyle(ticket.priority)

                return (
                  <tr
                    key={ticket.id}
                    className="border-b border-custom/50 hover:bg-dark-light/30 transition-colors"
                  >
                    {/* Ticket */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-12 rounded-full ${statusStyle.bar}`} />
                        <div>
                          <div className="font-semibold text-sm">#{ticket.id}</div>
                          <div className="text-muted text-xs mt-0.5">{ticket.title}</div>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm text-white"
                          style={{ backgroundColor: ticket.client.color }}
                        >
                          {ticket.client.initials}
                        </div>
                        <span className="text-sm">{ticket.client.name}</span>
                      </div>
                    </td>

                    {/* Statut */}
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.badge}`}
                      >
                        {statusStyle.text}
                      </span>
                    </td>

                    {/* Priorité */}
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyle.badge}`}
                      >
                        {priorityStyle.text}
                      </span>
                    </td>

                    {/* Assigné à */}
                    <td className="py-4">
                      <span className="text-sm">{ticket.assignedTo}</span>
                    </td>

                    {/* Créé */}
                    <td className="py-4">
                      <span className="text-sm text-muted">{ticket.createdAt}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-lg bg-dark-light hover:bg-primary/20 flex items-center justify-center transition-colors"
                          title="Voir"
                        >
                          <Eye size={16} className="text-muted hover:text-primary" />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg bg-dark-light hover:bg-warning/20 flex items-center justify-center transition-colors"
                          title="Modifier"
                        >
                          <Edit2 size={16} className="text-muted hover:text-warning" />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg bg-dark-light hover:bg-danger/20 flex items-center justify-center transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={16} className="text-muted hover:text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 rounded-lg bg-dark-light border border-custom flex items-center justify-center hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-medium text-sm transition-colors ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-dark-light border border-custom hover:border-primary'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 rounded-lg bg-dark-light border border-custom flex items-center justify-center hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
