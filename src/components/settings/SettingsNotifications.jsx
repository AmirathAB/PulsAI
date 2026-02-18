/* Paramètres - Notifications */

'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { useToast } from '@/contexts/ToastContext'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        checked ? 'bg-primary' : 'bg-dark-light border border-custom'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function NotifRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-custom/50 last:border-0">
      <div className="flex-1 pr-6">
        <p className="font-medium text-sm">{label}</p>
        {description && <p className="text-muted text-xs mt-0.5">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export default function SettingsNotifications() {
  const { success } = useToast()
  const [notifs, setNotifs] = useState({
    newTicket: true,
    ticketResolved: true,
    newMessage: true,
    campaignSent: false,
    campaignReport: true,
    aiAlert: true,
    weeklyReport: true,
    teamActivity: false,
    browserPush: true,
    emailDigest: true,
    soundAlert: false,
  })

  const toggle = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))

  const handleSave = () => {
    success('Préférences de notifications enregistrées !')
  }

  return (
    <div className="space-y-6">
      {/* Tickets */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-1">Tickets</h2>
        <p className="text-muted text-sm mb-5">Alertes liées à la gestion des tickets support</p>
        <div>
          <NotifRow
            label="Nouveau ticket créé"
            description="Recevoir une alerte à chaque création de ticket"
            checked={notifs.newTicket}
            onChange={() => toggle('newTicket')}
          />
          <NotifRow
            label="Ticket résolu"
            description="Notification quand un ticket passe en statut Résolu"
            checked={notifs.ticketResolved}
            onChange={() => toggle('ticketResolved')}
          />
        </div>
      </div>

      {/* Chat & IA */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-1">Chat & IA</h2>
        <p className="text-muted text-sm mb-5">Alertes liées aux conversations et à l'IA</p>
        <div>
          <NotifRow
            label="Nouveau message reçu"
            description="Notification pour chaque nouveau message client"
            checked={notifs.newMessage}
            onChange={() => toggle('newMessage')}
          />
          <NotifRow
            label="Alerte IA"
            description="Quand l'IA détecte une anomalie ou un cas urgent"
            checked={notifs.aiAlert}
            onChange={() => toggle('aiAlert')}
          />
        </div>
      </div>

      {/* Campagnes */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-1">Campagnes</h2>
        <p className="text-muted text-sm mb-5">Alertes liées aux campagnes marketing</p>
        <div>
          <NotifRow
            label="Campagne envoyée"
            description="Confirmation à chaque envoi de campagne"
            checked={notifs.campaignSent}
            onChange={() => toggle('campaignSent')}
          />
          <NotifRow
            label="Rapport de campagne"
            description="Résumé des performances après 24h"
            checked={notifs.campaignReport}
            onChange={() => toggle('campaignReport')}
          />
        </div>
      </div>

      {/* Rapports & Équipe */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-1">Rapports & Équipe</h2>
        <p className="text-muted text-sm mb-5">Résumés périodiques et activité de l'équipe</p>
        <div>
          <NotifRow
            label="Rapport hebdomadaire"
            description="Bilan de performances chaque lundi matin"
            checked={notifs.weeklyReport}
            onChange={() => toggle('weeklyReport')}
          />
          <NotifRow
            label="Activité de l'équipe"
            description="Quand un membre de l'équipe effectue une action"
            checked={notifs.teamActivity}
            onChange={() => toggle('teamActivity')}
          />
        </div>
      </div>

      {/* Canaux de réception */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <h2 className="font-unbounded text-lg font-semibold mb-1">Canaux de réception</h2>
        <p className="text-muted text-sm mb-5">Comment vous souhaitez recevoir les alertes</p>
        <div>
          <NotifRow
            label="Notifications navigateur"
            description="Alertes push dans votre navigateur"
            checked={notifs.browserPush}
            onChange={() => toggle('browserPush')}
          />
          <NotifRow
            label="Résumé par email"
            description="Email récapitulatif quotidien des événements"
            checked={notifs.emailDigest}
            onChange={() => toggle('emailDigest')}
          />
          <NotifRow
            label="Alertes sonores"
            description="Son joué à la réception d'une notification"
            checked={notifs.soundAlert}
            onChange={() => toggle('soundAlert')}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="gradient-primary px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Save size={18} />
          Enregistrer les préférences
        </button>
      </div>
    </div>
  )
}
