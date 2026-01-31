/* Page Dashboard */

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
    <div className="p-6 lg:p-8">
      <Header title="Dashboard" subtitle="Bienvenue, voici un aperçu de votre activité" onSearch={setSearchQuery} />
      <QuickStats />
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <RecentChats searchQuery={searchQuery} />
        <ActivityFeed />
      </section>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TicketsTable searchQuery={searchQuery} />
        <ActiveCampaign />
      </section>
    </div>
  )
}