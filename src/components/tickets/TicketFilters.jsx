/* Filtres de tickets - Onglets de statut */

'use client'

const filters = [
  { label: 'Tous', key: 'Tous' },
  { label: 'Ouverts', key: 'Ouverts' },
  { label: 'En attente', key: 'En attente' },
  { label: 'Résolus', key: 'Résolus' },
]

export default function TicketFilters({ activeFilter, setActiveFilter, counts }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6 lg:mb-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key
        const count = counts[filter.key] || 0

        return (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`
              px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
              ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-dark-card border border-custom text-muted hover:border-primary hover:text-white'
              }
            `}
          >
            {filter.label} ({count})
          </button>
        )
      })}
    </div>
  )
}
