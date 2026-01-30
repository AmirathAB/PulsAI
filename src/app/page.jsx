/* Page Dashboard - Responsive optimisé */

'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import QuickStats from '@/components/dashboard/QuickStats'
import RecentChats from '@/components/dashboard/RecentChats'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import TicketsTable from '@/components/dashboard/TicketsTable'
import ActiveCampaign from '@/components/dashboard/ActiveCampaign'

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header
        title="Dashboard"
        subtitle="Bienvenue, voici un aperçu de votre activité"
        onSearch={setSearchQuery}
      />

      {/* Stats rapides */}
      <QuickStats />

      {/* Conversations + Activité */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
        <RecentChats searchQuery={searchQuery} />
        <ActivityFeed />
      </section>

      {/* Tickets + Campagne */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <TicketsTable searchQuery={searchQuery} />
        <ActiveCampaign />
      </section>
    </div>
  )
}
