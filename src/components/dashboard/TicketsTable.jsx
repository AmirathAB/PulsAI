/* Tableau tickets - Responsive avec overflow */

'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const tickets = [
  { id: 'TKT-2847', title: 'Problème de connexion', status: 'Ouvert', statusBadge: 'badge-blue', priority: 'Haute', priorityBadge: 'badge-red', bar: 'bg-danger' },
  { id: 'TKT-2846', title: 'Question facturation', status: 'En attente', statusBadge: 'badge-orange', priority: 'Moyenne', priorityBadge: 'badge-orange', bar: 'bg-warning' },
  { id: 'TKT-2845', title: 'Demande fonctionnalité', status: 'Résolu', statusBadge: 'badge-green', priority: 'Basse', priorityBadge: 'badge-green', bar: 'bg-secondary' },
]

export default function TicketsTable({ searchQuery = '' }) {
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return tickets
    const q = searchQuery.toLowerCase()
    return tickets.filter((t) => t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <div className="bg-dark-card border border-custom rounded-2xl p-5 lg:p-6">
      <div className="flex justify-between items-center mb-5 lg:mb-6">
        <h2 className="font-unbounded text-base lg:text-lg font-semibold">Tickets en cours</h2>
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
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-custom/50 hover:bg-dark-light/50 transition-colors">
                <td className="py-3 lg:py-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className={`w-1 h-8 lg:h-10 rounded-full ${t.bar}`} />
                    <div>
                      <div className="font-semibold text-xs lg:text-sm">#{t.id}</div>
                      <div className="text-muted text-xs">{t.title}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 lg:py-4">
                  <span className={`px-2.5 lg:px-3 py-1 rounded-full text-xs font-medium ${t.statusBadge}`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-3 lg:py-4">
                  <span className={`px-2.5 lg:px-3 py-1 rounded-full text-xs font-medium ${t.priorityBadge}`}>
                    {t.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}