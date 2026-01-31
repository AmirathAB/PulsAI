/* Page Statistiques */

'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import { Users, Mail, MessageSquare, Ticket, ArrowRight } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

/* ---- Données ---- */

const stats = [
  { icon: Users, value: '45,892', label: 'Total contacts', trend: '18%', badge: 'badge-blue' },
  { icon: Mail, value: '156,432', label: 'Emails envoyés', trend: '24%', badge: 'badge-green' },
  { icon: MessageSquare, value: '28,547', label: 'Conversations IA', trend: '32%', badge: 'badge-orange' },
  { icon: Ticket, value: '1,234', label: 'Tickets résolus', trend: '5%', badge: 'badge-red' },
]

const conversationsData = [
  { jour: 'Lun', conversations: 320, resolutions: 280 },
  { jour: 'Mar', conversations: 450, resolutions: 400 },
  { jour: 'Mer', conversations: 380, resolutions: 350 },
  { jour: 'Jeu', conversations: 520, resolutions: 480 },
  { jour: 'Ven', conversations: 480, resolutions: 440 },
  { jour: 'Sam', conversations: 350, resolutions: 320 },
  { jour: 'Dim', conversations: 290, resolutions: 260 },
]

const campaignsData = [
  { name: 'Newsletter', ouverture: 42, clics: 12 },
  { name: 'Relance', ouverture: 38, clics: 8 },
  { name: 'Promo', ouverture: 52, clics: 18 },
  { name: 'Onboarding', ouverture: 65, clics: 28 },
  { name: 'Feedback', ouverture: 45, clics: 15 },
]

const channelsData = [
  { name: 'Chat', value: 45, color: '#3590E3' },
  { name: 'Email', value: 30, color: '#BAF09D' },
  { name: 'Téléphone', value: 15, color: '#f59e0b' },
  { name: 'Réseaux', value: 10, color: '#ef4444' },
]

const indicators = [
  { label: 'Satisfaction client', value: '94.2%' },
  { label: 'Temps de réponse', value: '12s' },
  { label: 'Résolution 1er contact', value: '87%' },
  { label: 'Note moyenne IA', value: '4.8/5' },
]

const tooltipStyle = { backgroundColor: '#2d3748', border: '1px solid #4B5563', borderRadius: '8px' }

// Fonction de filtrage
const filterData = (data, query, field) => {
  if (!query.trim()) return data
  return data.filter((item) => item[field].toLowerCase().includes(query.toLowerCase()))
}

/* ---- Composant ---- */

export default function Stats() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStats = useMemo(() => filterData(stats, searchQuery, 'label'), [searchQuery])
  const filteredCampaigns = useMemo(() => filterData(campaignsData, searchQuery, 'name'), [searchQuery])
  const filteredChannels = useMemo(() => filterData(channelsData, searchQuery, 'name'), [searchQuery])
  const filteredIndicators = useMemo(() => filterData(indicators, searchQuery, 'label'), [searchQuery])

  return (
    <div className="p-6 lg:p-8">
      <Header title="Statistiques" subtitle="Analysez vos performances en détail" onSearch={setSearchQuery} />

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {filteredStats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-dark-card border border-custom rounded-2xl p-6 hover:-translate-y-1 hover:border-primary card-hover transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.badge}`}><Icon size={24} /></div>
                <span className="badge-green px-2.5 py-1 rounded-md text-xs font-semibold">↑ {stat.trend}</span>
              </div>
              <div className="font-unbounded text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-muted">{stat.label}</div>
            </div>
          )
        })}
      </section>

      {/* Graphiques */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Ligne */}
        <div className="xl:col-span-2 bg-dark-card border border-custom rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-unbounded text-lg font-semibold">Évolution des conversations</h2>
            <select className="bg-dark-light border border-custom rounded-lg px-3 py-2 text-sm text-muted focus:outline-none focus:border-primary">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="jour" stroke="#D1D5DB" fontSize={12} />
                <YAxis stroke="#D1D5DB" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line type="monotone" dataKey="conversations" stroke="#3590E3" strokeWidth={2} name="Conversations" />
                <Line type="monotone" dataKey="resolutions" stroke="#BAF09D" strokeWidth={2} name="Résolutions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Circulaire */}
        <div className="bg-dark-card border border-custom rounded-2xl p-6">
          <h2 className="font-unbounded text-lg font-semibold mb-6">Répartition par canal</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={filteredChannels} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {filteredChannels.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend formatter={(value) => <span className="text-muted text-sm">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Barres + Indicateurs */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Barres */}
        <div className="bg-dark-card border border-custom rounded-2xl p-6">
          <h2 className="font-unbounded text-lg font-semibold mb-6">Performance des campagnes</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCampaigns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="name" stroke="#D1D5DB" fontSize={12} />
                <YAxis stroke="#D1D5DB" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar dataKey="ouverture" fill="#3590E3" radius={[4, 4, 0, 0]} name="Ouverture %" />
                <Bar dataKey="clics" fill="#BAF09D" radius={[4, 4, 0, 0]} name="Clics %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Indicateurs */}
        <div className="bg-dark-card border border-custom rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-unbounded text-lg font-semibold">Indicateurs clés</h2>
            <button className="text-primary text-sm font-medium flex items-center gap-1">Détails <ArrowRight size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {filteredIndicators.map((ind, i) => (
              <div key={i} className="bg-dark-light-50 rounded-xl p-4 text-center">
                <div className="font-unbounded text-2xl font-bold text-primary">{ind.value}</div>
                <div className="text-muted text-sm mt-1">{ind.label}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Objectif mensuel</span>
              <span className="text-primary font-semibold">78%</span>
            </div>
            <div className="w-full h-3 bg-dark rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}