/* Page Tickets - Gestion des tickets support */

'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Header from '@/components/layout/Header'
import TicketFilters from '@/components/tickets/TicketFilters'
import TicketTable from '@/components/tickets/TicketTable'
import TicketModal from '@/components/tickets/TicketModal'

// Données tickets
const ticketsData = [
  {
    id: 'TKT-2847',
    title: 'Problème de connexion',
    client: { name: 'Marie Dubois', initials: 'MD', color: '#3590E3' },
    status: 'Ouvert',
    priority: 'Haute',
    assignedTo: 'Thomas R.',
    createdAt: 'Il y a 2h',
  },
  {
    id: 'TKT-2846',
    title: 'Question sur la facturation',
    client: { name: 'Jean Laurent', initials: 'JL', color: '#BAF09D' },
    status: 'En attente',
    priority: 'Moyenne',
    assignedTo: 'Sophie M.',
    createdAt: 'Il y a 4h',
  },
  {
    id: 'TKT-2845',
    title: 'Demande de fonctionnalité',
    client: { name: 'Sophie Petit', initials: 'SP', color: '#10b981' },
    status: 'Résolu',
    priority: 'Basse',
    assignedTo: 'Pierre L.',
    createdAt: 'Il y a 1j',
  },
  {
    id: 'TKT-2844',
    title: 'Bug critique application',
    client: { name: 'Alice Moreau', initials: 'AM', color: '#06b6d4' },
    status: 'Ouvert',
    priority: 'Haute',
    assignedTo: 'Thomas R.',
    createdAt: 'Il y a 1j',
  },
  {
    id: 'TKT-2843',
    title: 'Intégration API',
    client: { name: 'Paul Durand', initials: 'PD', color: '#f59e0b' },
    status: 'En attente',
    priority: 'Moyenne',
    assignedTo: 'Non assigné',
    createdAt: 'Il y a 2j',
  },
]

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filtrage des tickets
  const filteredTickets = useMemo(() => {
    let filtered = ticketsData

    // Filtrer par statut
    if (activeFilter !== 'Tous') {
      filtered = filtered.filter((ticket) => ticket.status === activeFilter)
    }

    // Filtrer par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (ticket) =>
          ticket.id.toLowerCase().includes(query) ||
          ticket.title.toLowerCase().includes(query) ||
          ticket.client.name.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [activeFilter, searchQuery])

  // Compter tickets par statut
  const counts = {
    Tous: ticketsData.length,
    Ouverts: ticketsData.filter((t) => t.status === 'Ouvert').length,
    'En attente': ticketsData.filter((t) => t.status === 'En attente').length,
    Résolus: ticketsData.filter((t) => t.status === 'Résolu').length,
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 lg:mb-8">
        <div className="pl-16 lg:pl-0">
          <h1 className="font-unbounded text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">
            Tickets
          </h1>
          <p className="text-muted text-sm lg:text-base mt-1">
            Gérez les demandes de support client
          </p>
        </div>

        {/* Recherche + Bouton */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-4 pr-4 py-2.5 lg:py-3 bg-dark-card border border-custom rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="gradient-primary px-4 py-2.5 lg:py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus size={20} />
            Nouveau ticket
          </button>
        </div>
      </div>

      {/* Filtres */}
      <TicketFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        counts={counts}
      />

      {/* Tableau */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TicketTable tickets={filteredTickets} />
      </motion.div>

      {/* Modal nouveau ticket */}
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
