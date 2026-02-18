/* Paramètres - Gestion de l'équipe */

'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Mail } from 'lucide-react'
import { useToast } from '@/contexts/ToastContext'

const initialMembers = [
  { id: 1, initials: 'AB', name: 'Admin Boss', email: 'admin@pulsai.io', role: 'Administrateur', color: '#3590E3', status: 'Actif' },
  { id: 2, initials: 'TR', name: 'Thomas Rousseau', email: 'thomas@pulsai.io', role: 'Agent support', color: '#10b981', status: 'Actif' },
  { id: 3, initials: 'SM', name: 'Sophie Martin', email: 'sophie@pulsai.io', role: 'Agent support', color: '#f59e0b', status: 'Actif' },
  { id: 4, initials: 'PL', name: 'Pierre Lambert', email: 'pierre@pulsai.io', role: 'Superviseur', color: '#ef4444', status: 'Inactif' },
]

const roles = ['Administrateur', 'Superviseur', 'Agent support', 'Lecteur']

const roleColors = {
  'Administrateur': 'badge-blue',
  'Superviseur': 'badge-orange',
  'Agent support': 'badge-green',
  'Lecteur': 'badge-red',
}

export default function SettingsTeam() {
  const { success } = useToast()
  const [members, setMembers] = useState(initialMembers)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteData, setInviteData] = useState({ email: '', role: 'Agent support' })

  const handleInvite = (e) => {
    e.preventDefault()
    if (!inviteData.email.trim()) return

    const newMember = {
      id: Date.now(),
      initials: inviteData.email.substring(0, 2).toUpperCase(),
      name: inviteData.email.split('@')[0],
      email: inviteData.email,
      role: inviteData.role,
      color: '#3590E3',
      status: 'Invité',
    }
    setMembers(prev => [...prev, newMember])
    setInviteData({ email: '', role: 'Agent support' })
    setShowInviteForm(false)
    success(`Invitation envoyée à ${inviteData.email} !`)
  }

  const handleDelete = (memberId) => {
    if (window.confirm('Supprimer ce membre de l\'équipe ?')) {
      setMembers(prev => prev.filter(m => m.id !== memberId))
      success('Membre supprimé de l\'équipe.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats équipe */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Membres actifs', value: members.filter(m => m.status === 'Actif').length, badge: 'badge-green' },
          { label: 'Invitations en attente', value: members.filter(m => m.status === 'Invité').length, badge: 'badge-orange' },
          { label: 'Total membres', value: members.length, badge: 'badge-blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-dark-card border border-custom rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.badge}`}>
              <span className="font-bold text-lg">{stat.value}</span>
            </div>
            <p className="text-muted text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Liste des membres */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Membres de l'équipe</h2>
            <p className="text-muted text-sm mt-1">Gérez les accès et les rôles</p>
          </div>
          <button
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="gradient-primary px-4 py-2.5 rounded-xl font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity text-sm"
          >
            <Plus size={18} />
            Inviter
          </button>
        </div>

        {/* Formulaire d'invitation */}
        {showInviteForm && (
          <form
            onSubmit={handleInvite}
            className="mb-6 p-4 bg-dark-light border border-primary/30 rounded-xl space-y-3"
          >
            <h3 className="font-medium text-sm text-primary">Inviter un nouveau membre</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                required
                value={inviteData.email}
                onChange={(e) => setInviteData(p => ({ ...p, email: e.target.value }))}
                placeholder="email@exemple.com"
                className="w-full px-4 py-2.5 bg-dark-card border border-custom rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <select
                value={inviteData.role}
                onChange={(e) => setInviteData(p => ({ ...p, role: e.target.value }))}
                className="w-full px-4 py-2.5 bg-dark-card border border-custom rounded-xl text-white text-sm focus:outline-none focus:border-primary transition-colors"
              >
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="gradient-primary px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 hover:opacity-90"
              >
                <Mail size={14} />
                Envoyer l'invitation
              </button>
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 rounded-lg text-sm text-muted hover:text-white transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {/* Tableau des membres */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-custom">
                <th className="text-left text-muted text-xs font-medium pb-3 uppercase tracking-wider">Membre</th>
                <th className="text-left text-muted text-xs font-medium pb-3 uppercase tracking-wider">Rôle</th>
                <th className="text-left text-muted text-xs font-medium pb-3 uppercase tracking-wider">Statut</th>
                <th className="text-left text-muted text-xs font-medium pb-3 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-custom/50 hover:bg-dark-light/30 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm text-white flex-shrink-0"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-muted text-xs">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[member.role] || 'badge-blue'}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Actif' ? 'badge-green' :
                      member.status === 'Invité' ? 'badge-orange' : 'badge-red'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 rounded-lg bg-dark-light hover:bg-warning/20 flex items-center justify-center transition-colors group"
                        title="Modifier le rôle"
                      >
                        <Edit2 size={14} className="text-muted group-hover:text-warning transition-colors" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="w-8 h-8 rounded-lg bg-dark-light hover:bg-danger/20 flex items-center justify-center transition-colors group"
                        title="Retirer de l'équipe"
                      >
                        <Trash2 size={14} className="text-muted group-hover:text-danger transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
