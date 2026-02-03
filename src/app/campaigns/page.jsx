'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import CampaignModal from '@/components/campaigns/CampaignModal'
import { useModal } from '@/hooks/useModal'
import * as Icons from 'lucide-react'
import { campaignsData } from '@/utils/data'
import { useSearch } from '@/contexts/SearchContext'

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const { searchQuery } = useSearch()
  const campaignModal = useModal()
  
  //  State local pour les campagnes (initialisé avec les données existantes)
  const [campaigns, setCampaigns] = useState(campaignsData)

  //  Fonction pour ajouter une nouvelle campagne
  const handleAddCampaign = (newCampaign) => {
    const campaign = {
      id: Date.now(), // ID unique
      title: newCampaign.name,
      description: newCampaign.content || newCampaign.subject,
      status: newCampaign.sendDate ? 'Planifiée' : 'Brouillon',
      statusColor: newCampaign.sendDate ? '#F59E0B' : '#6B7280',
      icon: getCampaignIcon(newCampaign.type),
      scheduledDate: newCampaign.sendDate 
        ? new Date(newCampaign.sendDate).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : null,
      lastEdited: 'À l\'instant',
      recipients: getSegmentCount(newCampaign.segment),
    }
    
    setCampaigns(prev => [campaign, ...prev]) 
  }

  // Helper pour l'icône selon le type
  const getCampaignIcon = (type) => {
    const icons = {
      newsletter: 'Mail',
      promo: 'Gift',
      relance: 'Bell',
      onboarding: 'UserPlus',
    }
    return icons[type] || 'Mail'
  }

  // Helper pour le nombre de destinataires
  const getSegmentCount = (segment) => {
    const counts = {
      all: '12,450',
      active: '8,320',
      vip: '1,250',
      inactive: '2,880',
    }
    return counts[segment] || '0'
  }

  //  Calcul dynamique des compteurs
  const tabCounts = useMemo(() => ({
    all: campaigns.length,
    active: campaigns.filter(c => c.status === 'Active').length,
    scheduled: campaigns.filter(c => c.status === 'Planifiée').length,
    draft: campaigns.filter(c => c.status === 'Brouillon').length,
  }), [campaigns])

  const tabs = [
    { label: 'Toutes', count: tabCounts.all },
    { label: 'Actives', count: tabCounts.active },
    { label: 'Planifiées', count: tabCounts.scheduled },
    { label: 'Brouillons', count: tabCounts.draft },
  ]

  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns 

    if (activeTab === 1) {
      filtered = filtered.filter(c => c.status === 'Active')
    } else if (activeTab === 2) {
      filtered = filtered.filter(c => c.status === 'Planifiée')
    } else if (activeTab === 3) {
      filtered = filtered.filter(c => c.status === 'Brouillon')
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        campaign =>
          campaign.title.toLowerCase().includes(query) ||
          campaign.description.toLowerCase().includes(query) ||
          campaign.status.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [activeTab, searchQuery, campaigns]) 

  return (
    <div className="min-h-screen">
      <Header
        title="Campagnes"
        subtitle="Gestion de vos campagnes marketing"
      />

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === index
                    ? 'bg-primary text-white'
                    : 'bg-background-card text-text-secondary hover:text-white hover:bg-background-hover'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === index ? 'bg-white/20' : 'bg-background-hover'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <Button onClick={campaignModal.open}>
            <Icons.Plus size={20} className="mr-2" />
            Nouvelle campagne
          </Button>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">
              {searchQuery.trim()
                ? `Aucune campagne trouvée pour "${searchQuery}"`
                : 'Aucune campagne dans cette catégorie'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCampaigns.map((campaign, index) => {
              const Icon = Icons[campaign.icon]

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-primary/50 group">
                    {/* ... reste du code identique ... */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {Icon && <Icon size={24} className="text-primary" />}
                        </div>
                        <div>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2"
                            style={{
                              backgroundColor: `${campaign.statusColor}20`,
                              color: campaign.statusColor,
                            }}
                          >
                            {campaign.status}
                          </span>
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {campaign.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                      {campaign.description}
                    </p>

                    {campaign.sent ? (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Envoyés</p>
                          <p className="text-lg font-bold text-white">{campaign.sent}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Ouverture</p>
                          <p className="text-lg font-bold text-status-success">{campaign.openRate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Clics</p>
                          <p className="text-lg font-bold text-primary">{campaign.clickRate}</p>
                        </div>
                      </div>
                    ) : campaign.scheduledDate ? (
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-text-muted mb-1">Programmée pour</p>
                        <p className="text-sm font-semibold text-white">{campaign.scheduledDate}</p>
                        <p className="text-xs text-text-muted mt-2">{campaign.recipients} destinataires</p>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-text-muted">Dernière modification</p>
                        <p className="text-sm font-semibold text-white">{campaign.lastEdited}</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {/*  Passe la fonction onAdd au modal */}
        <CampaignModal
          isOpen={campaignModal.isOpen}
          onClose={campaignModal.close}
          onAdd={handleAddCampaign}
        />
      </div>
    </div>
  )
}