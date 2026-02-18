/* Page Paramètres - Gestion complète des préférences */

'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import SettingsProfile from '@/components/settings/SettingsProfile'
import SettingsNotifications from '@/components/settings/SettingsNotifications'
import SettingsAI from '@/components/settings/SettingsAI'
import SettingsTeam from '@/components/settings/SettingsTeam'
import SettingsSecurity from '@/components/settings/SettingsSecurity'
import { User, Bell, Bot, Users, Shield } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'IA & Chat', icon: Bot },
  { id: 'team', label: 'Équipe', icon: Users },
  { id: 'security', label: 'Sécurité', icon: Shield },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <SettingsProfile />
      case 'notifications':
        return <SettingsNotifications />
      case 'ai':
        return <SettingsAI />
      case 'team':
        return <SettingsTeam />
      case 'security':
        return <SettingsSecurity />
      default:
        return <SettingsProfile />
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header
        title="Paramètres"
        subtitle="Configurez votre espace de travail PulsAI"
        onSearch={() => {}}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de navigation des onglets */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="bg-dark-card border border-custom rounded-2xl p-3">
            <ul className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-left ${
                        isActive
                          ? 'bg-primary/15 text-primary'
                          : 'text-muted hover:bg-primary/10 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] bg-primary rounded-r-full" />
                      )}
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
