/* Cartes statistiques - Responsive optimisé */

import { MessageSquare, CheckCircle, Zap, Mail } from 'lucide-react'

const stats = [
  { icon: MessageSquare, value: '2,847', label: 'Conversations actives', trend: '12%', badge: 'badge-blue' },
  { icon: CheckCircle, value: '94.2%', label: 'Taux de résolution IA', trend: '8%', badge: 'badge-green' },
  { icon: Zap, value: '12s', label: 'Temps de réponse moyen', trend: '3s', badge: 'badge-orange' },
  { icon: Mail, value: '18,642', label: 'Emails envoyés ce mois', trend: '24%', badge: 'badge-red' },
]

export default function QuickStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div
            key={i}
            className="bg-dark-card border border-custom rounded-2xl p-5 lg:p-6 lg:hover:-translate-y-1 lg:hover:border-primary card-hover transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3 lg:mb-4">
              <div className={`w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${stat.badge}`}>
                <Icon size={22} className="lg:w-6 lg:h-6" />
              </div>
              <span className="badge-green px-2.5 py-1 rounded-md text-xs font-semibold">
                ↑ {stat.trend}
              </span>
            </div>
            <div className="font-unbounded text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-muted text-sm lg:text-base">{stat.label}</div>
          </div>
        )
      })}
    </section>
  )
}
