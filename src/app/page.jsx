// Page Dashboard

import Header from '@/components/layout/Header'
import { MessageSquare, CheckCircle, Zap, Mail, ArrowRight, Send } from 'lucide-react'
/* ---- Données ---- */
const stats = [
  {
    icon: MessageSquare,
    value: '2,847',
    label: 'Conversations actives',
    trend: '12%',
    trendUp: true,
    badge: 'badge-blue',
  },
  {
    icon: CheckCircle,
    value: '94.2%',
    label: 'Taux de résolution IA',
    trend: '8%',
    trendUp: true,
    badge: 'badge-green',
  },
  {
    icon: Zap,
    value: '12s',
    label: 'Temps de réponse moyen',
    trend: '3s',
    trendUp: true,
    badge: 'badge-orange',
  },
  {
    icon: Mail,
    value: '18,642',
    label: 'Emails envoyés ce mois',
    trend: '24%',
    trendUp: true,
    badge: 'badge-red',
  },
]

const recentChats = [
  {
    initials: 'MD',
    name: 'Marie Dubois',
    message: "J'aimerais avoir des informations sur vos tarifs...",
    time: 'Il y a 2 min',
    unread: true,
  },
  {
    initials: 'JL',
    name: 'Jean Laurent',
    message: "Merci pour votre aide, c'était parfait!",
    time: 'Il y a 15 min',
    unread: false,
  },
  {
    initials: 'SP',
    name: 'Sophie Petit',
    message: 'Est-ce que vous proposez une démo gratuite?',
    time: 'Il y a 1h',
    unread: true,
  },
  {
    initials: 'PM',
    name: 'Pierre Martin',
    message: 'Je souhaite modifier mon abonnement',
    time: 'Il y a 2h',
    unread: false,
  },
]

const activities = [
  {
    title: 'Nouveau ticket créé',
    desc: '#TKT-2847 - Problème de connexion',
    time: 'Il y a 5 min',
    dot: 'bg-primary',
  },
  {
    title: 'Campagne lancée',
    desc: 'Newsletter Janvier 2026',
    time: 'Il y a 1h',
    dot: 'bg-secondary',
  },
  {
    title: 'Message contact reçu',
    desc: 'Alice Moreau - Demande de partenariat',
    time: 'Il y a 3h',
    dot: 'bg-warning',
  },
  { title: 'IA mise à jour', desc: 'Nouveau modèle déployé', time: 'Il y a 5h', dot: 'bg-danger' },
]

const tickets = [
  {
    id: 'TKT-2847',
    title: 'Problème de connexion',
    status: 'Ouvert',
    statusBadge: 'badge-blue',
    priority: 'Haute',
    priorityBadge: 'badge-red',
    bar: 'bg-danger',
  },
  {
    id: 'TKT-2846',
    title: 'Question facturation',
    status: 'En attente',
    statusBadge: 'badge-orange',
    priority: 'Moyenne',
    priorityBadge: 'badge-orange',
    bar: 'bg-warning',
  },
  {
    id: 'TKT-2845',
    title: 'Demande fonctionnalité',
    status: 'Résolu',
    statusBadge: 'badge-green',
    priority: 'Basse',
    priorityBadge: 'badge-green',
    bar: 'bg-secondary',
  },
]

/* ---- Composant ---- */
export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8">
      <Header title="Dashboard" subtitle="Bienvenue, voici un aperçu de votre activité" />

      {/* Statistiques */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="bg-dark-card border border-custom rounded-2xl p-6 hover:-translate-y-1 hover:border-primary card-hover transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.badge}`}
                >
                  <Icon size={24} />
                </div>
                <span className="badge-green px-2.5 py-1 rounded-md text-xs font-semibold">
                  ↑ {stat.trend}
                </span>
              </div>
              <div className="font-unbounded text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-muted">{stat.label}</div>
            </div>
          )
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Conversations */}
        <div className="xl:col-span-2 bg-dark-card border border-custom rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-unbounded text-lg font-semibold">Conversations IA récentes</h2>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              Voir tout <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {recentChats.map((chat, i) => (
              <div
                key={i}
                className="relative flex items-center gap-4 p-4 rounded-xl hover:bg-dark-light cursor-pointer transition-colors"
              >
                <div className="w-11 h-11 rounded-full gradient-mixed flex items-center justify-center font-semibold flex-shrink-0">
                  {chat.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{chat.name}</span>
                    <span className="text-muted text-xs">{chat.time}</span>
                  </div>
                  <p className="text-muted text-sm truncate">{chat.message}</p>
                </div>
                {chat.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Activités */}
        <div className="bg-dark-card border border-custom rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-unbounded text-lg font-semibold">Activité récente</h2>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              Tout voir <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="relative pl-6">
                {i < activities.length - 1 && (
                  <div className="absolute left-[5px] top-6 w-px h-[calc(100%+0.5rem)] bg-gray-700" />
                )}
                <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full ${a.dot}`} />
                <h4 className="font-medium text-sm">{a.title}</h4>
                <p className="text-muted text-xs mt-0.5">{a.desc}</p>
                <span className="text-gray-600 text-xs">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Tickets */}
        <div className="bg-dark-card border border-custom rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-unbounded text-lg font-semibold">Tickets en cours</h2>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              Gérer <ArrowRight size={16} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-custom">
                <th className="text-left text-muted text-sm font-medium pb-3">Ticket</th>
                <th className="text-left text-muted text-sm font-medium pb-3">Statut</th>
                <th className="text-left text-muted text-sm font-medium pb-3">Priorité</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-custom/50 hover:bg-dark-light/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-10 rounded-full ${t.bar}`} />
                      <div>
                        <div className="font-semibold text-sm">#{t.id}</div>
                        <div className="text-muted text-xs">{t.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${t.statusBadge}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${t.priorityBadge}`}
                    >
                      {t.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Campagne */}
        <div className="bg-dark-card border border-custom rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-unbounded text-lg font-semibold">Campagne active</h2>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              Voir <ArrowRight size={16} />
            </button>
          </div>
          <div className="p-4 bg-dark-light-50 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 badge-blue rounded-xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Newsletter Janvier 2026</h3>
                <p className="text-muted text-sm">18,642 destinataires</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="font-unbounded text-xl font-bold text-primary">42.3%</div>
                <div className="text-muted text-xs">Ouverture</div>
              </div>
              <div className="text-center">
                <div className="font-unbounded text-xl font-bold text-secondary-custom">12.8%</div>
                <div className="text-muted text-xs">Clics</div>
              </div>
              <div className="text-center">
                <div className="font-unbounded text-xl font-bold text-warning">2.1%</div>
                <div className="text-muted text-xs">Conversion</div>
              </div>
            </div>
            <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-center text-muted text-xs mt-2">75% de la campagne terminée</p>
          </div>
        </div>
      </section>
    </div>
  )
}
