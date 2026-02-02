/* Activité récente */

import { ArrowRight } from 'lucide-react'

const activities = [
  { title: 'Nouveau ticket créé', desc: '#TKT-2847 - Problème de connexion', time: 'Il y a 5 min', dot: 'bg-primary' },
  { title: 'Campagne lancée', desc: 'Newsletter Janvier 2026', time: 'Il y a 1h', dot: 'bg-secondary' },
  { title: 'Message contact reçu', desc: 'Alice Moreau - Demande de partenariat', time: 'Il y a 3h', dot: 'bg-warning' },
  { title: 'IA mise à jour', desc: 'Nouveau modèle déployé', time: 'Il y a 5h', dot: 'bg-danger' },
]

export default function ActivityFeed() {
  return (
    <div className="bg-dark-card border border-custom rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-unbounded text-lg font-semibold">Activité récente</h2>
      </div>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="relative pl-6">
            {i < activities.length - 1 && <div className="absolute left-[5px] top-6 w-px h-[calc(100%+0.5rem)] bg-gray-700" />}
            <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full ${a.dot}`} />
            <h4 className="font-medium text-sm">{a.title}</h4>
            <p className="text-muted text-xs mt-0.5">{a.desc}</p>
            <span className="text-gray-600 text-xs">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}