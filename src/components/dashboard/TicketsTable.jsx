/* Tableau tickets - Responsive avec overflow */

'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// MODIFIÉ : les tickets ne sont plus une constante figée mais une valeur initiale de secours
// Elle ne s'applique que si la clé 'pulsai_tickets' n'existe pas encore dans localStorage
const INITIAL_TICKETS = [
  { id: 'TKT-2847', title: 'Problème de connexion', status: 'Ouvert', priority: 'Haute', client: { name: 'Marie Dubois', initials: 'MD', color: '#3590E3' } },
  { id: 'TKT-2846', title: 'Question facturation', status: 'En attente', priority: 'Moyenne', client: { name: 'Jean Laurent', initials: 'JL', color: '#BAF09D' } },
  { id: 'TKT-2845', title: 'Demande fonctionnalité', status: 'Résolu', priority: 'Basse', client: { name: 'Sophie Petit', initials: 'SP', color: '#10b981' } },
]

// Avant : les badges étaient stockés directement dans les données statiques (statusBadge, bar, priorityBadge)
// Maintenant les données viennent de localStorage et ne contiennent pas ces classes CSS
const getStatusBadge = (status) => ({
  'Ouvert':     { badge: 'badge-blue',   bar: 'bg-primary' },
  'En attente': { badge: 'badge-orange', bar: 'bg-warning' },
  'Résolu':     { badge: 'badge-green',  bar: 'bg-secondary' },
}[status] || { badge: 'badge-blue', bar: 'bg-primary' })

const getPriorityBadge = (priority) => ({
  'Haute':   'badge-red',
  'Moyenne': 'badge-orange',
  'Basse':   'badge-green',
}[priority] || 'badge-blue')

export default function TicketsTable({ searchQuery = '' }) {
  // les tickets créés/modifiés/supprimés dans /tickets s'affichent ici en temps réel
  // On n'a besoin que de la valeur en lecture, pas du setter (on ne modifie pas les tickets ici)
  const [tickets] = useLocalStorage('pulsai_tickets', INITIAL_TICKETS)

  //  filtre + tri dynamique basé sur les vrais tickets localStorage
  // Avant : filtrage sur 3 tickets statiques sans tri
  // Maintenant : on trie par urgence (Ouvert > En attente > Résolu) puis on limite à 3
  const displayed = useMemo(() => {
    let filtered = tickets
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = tickets.filter(t =>
        t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q)
      )
    }
    // AJOUTÉ : tri par urgence pour toujours mettre les tickets les plus critiques en avant
    return [...filtered]
      .sort((a, b) => {
        const order = { 'Ouvert': 0, 'En attente': 1, 'Résolu': 2 }
        return (order[a.status] ?? 3) - (order[b.status] ?? 3)
      })
      .slice(0, 3)
  }, [tickets, searchQuery])

  // AJOUTÉ : compteur de tickets ouverts pour afficher une alerte visuelle dans le titre
  const openCount = tickets.filter(t => t.status === 'Ouvert').length

  return (
    <div className="bg-dark-card border border-custom rounded-2xl p-5 lg:p-6">
      <div className="flex justify-between items-center mb-5 lg:mb-6">
        <div>
          <h2 className="font-unbounded text-base lg:text-lg font-semibold">Tickets en cours</h2>
          {openCount > 0 && (
            <p className="text-muted text-xs mt-0.5">
              <span className="text-danger font-medium">{openCount}</span> ticket{openCount > 1 ? 's' : ''} ouvert{openCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
        <Link href="/tickets" className="text-primary text-sm font-medium flex items-center gap-1 hover:opacity-80">
          Gérer <ArrowRight size={16} />
        </Link>
      </div>

      {/* Table wrapper avec overflow */}
      <div className="overflow-x-auto -mx-5 lg:-mx-6 px-5 lg:px-6">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-custom">
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-3">Ticket</th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-3">Statut</th>
              <th className="text-left text-muted text-xs lg:text-sm font-medium pb-3">Priorité</th>
            </tr>
          </thead>
          <tbody>
            {/* AJOUTÉ : état vide si aucun ticket ne correspond à la recherche */}
            {displayed.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-6 text-center text-muted text-sm">Aucun ticket trouvé</td>
              </tr>
            ) : (
              displayed.map((t) => {
                // les badges sont maintenant calculés dynamiquement via les helpers
                // Avant : t.statusBadge, t.bar, t.priorityBadge venaient directement des données statiques
                const { badge: statusBadge, bar } = getStatusBadge(t.status)
                const priorityBadge = getPriorityBadge(t.priority)
                return (
                  <tr key={t.id} className="border-b border-custom/50 hover:bg-dark-light/50 transition-colors">
                    <td className="py-3 lg:py-4">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className={`w-1 h-8 lg:h-10 rounded-full ${bar}`} />
                        <div>
                          <div className="font-semibold text-xs lg:text-sm">#{t.id}</div>
                          <div className="text-muted text-xs">{t.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4">
                      <span className={`px-2.5 lg:px-3 py-1 rounded-full text-xs font-medium ${statusBadge}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 lg:py-4">
                      <span className={`px-2.5 lg:px-3 py-1 rounded-full text-xs font-medium ${priorityBadge}`}>
                        {t.priority}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* AJOUTÉ : lien "voir tout" si le nombre de tickets dépasse 3 */}
      {tickets.length > 3 && (
        <p className="text-center text-muted text-xs mt-4">
          +{tickets.length - 3} autre{tickets.length - 3 > 1 ? 's' : ''} ticket{tickets.length - 3 > 1 ? 's' : ''} —{' '}
          <Link href="/tickets" className="text-primary hover:opacity-80">voir tout</Link>
        </p>
      )}
    </div>
  )
}
