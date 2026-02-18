/* Paramètres - Sécurité */

'use client'

import { useState } from 'react'
import { Save, Eye, EyeOff, Shield, Key, Smartphone, LogOut } from 'lucide-react'
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

const sessions = [
  { id: 1, device: 'Chrome · Windows 11', location: 'Paris, France', time: 'Maintenant', current: true },
  { id: 2, device: 'Safari · iPhone 15', location: 'Lyon, France', time: 'Il y a 2h', current: false },
  { id: 3, device: 'Firefox · macOS', location: 'Marseille, France', time: 'Il y a 1 jour', current: false },
]

export default function SettingsSecurity() {
  const { success, error } = useToast()
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' })

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      error('Les mots de passe ne correspondent pas.')
      return
    }
    if (passwords.new.length < 8) {
      error('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    success('Mot de passe mis à jour avec succès !')
    setPasswords({ old: '', new: '', confirm: '' })
  }

  const handleRevokeSession = (sessionId) => {
    success('Session révoquée.')
  }

  const strengthLevel = () => {
    const pwd = passwords.new
    if (!pwd) return null
    if (pwd.length < 6) return { label: 'Faible', color: 'bg-danger', width: '25%' }
    if (pwd.length < 8) return { label: 'Moyen', color: 'bg-warning', width: '50%' }
    if (pwd.length < 12 || !/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { label: 'Bien', color: 'bg-primary', width: '75%' }
    return { label: 'Fort', color: 'bg-secondary', width: '100%' }
  }
  const strength = strengthLevel()

  return (
    <div className="space-y-6">
      {/* Changement de mot de passe */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 badge-blue rounded-xl flex items-center justify-center">
            <Key size={20} />
          </div>
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Mot de passe</h2>
            <p className="text-muted text-sm">Mettez à jour votre mot de passe de connexion</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Ancien mdp */}
          <div>
            <label className="block text-sm font-medium mb-2">Mot de passe actuel</label>
            <div className="relative">
              <input
                type={showOld ? 'text' : 'password'}
                value={passwords.old}
                onChange={(e) => setPasswords(p => ({ ...p, old: e.target.value }))}
                required
                className="w-full px-4 py-3 pr-12 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Nouveau mdp */}
          <div>
            <label className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
                required
                className="w-full px-4 py-3 pr-12 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Indicateur de force */}
            {strength && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} rounded-full transition-all`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className="text-xs text-muted mt-1">Force : <span className="font-medium text-white">{strength.label}</span></p>
              </div>
            )}
          </div>

          {/* Confirmation */}
          <div>
            <label className="block text-sm font-medium mb-2">Confirmer le nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                required
                className="w-full px-4 py-3 pr-12 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="gradient-primary px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Save size={18} />
              Mettre à jour le mot de passe
            </button>
          </div>
        </form>
      </div>

      {/* Double authentification */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 badge-green rounded-xl flex items-center justify-center">
            <Smartphone size={20} />
          </div>
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Double authentification (2FA)</h2>
            <p className="text-muted text-sm">Ajoutez une couche de sécurité supplémentaire</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-custom/50">
            <div>
              <p className="font-medium text-sm">Activer la 2FA</p>
              <p className="text-muted text-xs mt-0.5">Via application d'authentification (Google Authenticator, etc.)</p>
            </div>
            <Toggle checked={mfaEnabled} onChange={setMfaEnabled} />
          </div>

          {mfaEnabled && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <p className="text-sm text-primary font-medium mb-2">2FA activée ✓</p>
              <p className="text-xs text-muted">Votre compte est protégé par une authentification à deux facteurs.</p>
            </div>
          )}

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Alertes de connexion</p>
              <p className="text-muted text-xs mt-0.5">Être notifié par email en cas de nouvelle connexion</p>
            </div>
            <Toggle checked={loginAlerts} onChange={setLoginAlerts} />
          </div>
        </div>
      </div>

      {/* Sessions actives */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 badge-orange rounded-xl flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Sessions actives</h2>
            <p className="text-muted text-sm">Gérez les appareils connectés à votre compte</p>
          </div>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-dark-light rounded-xl border border-custom/50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${session.current ? 'bg-secondary' : 'bg-gray-600'}`} />
                <div>
                  <p className="font-medium text-sm">{session.device}</p>
                  <p className="text-muted text-xs mt-0.5">{session.location} · {session.time}</p>
                </div>
              </div>
              {session.current ? (
                <span className="badge-green px-2.5 py-1 rounded-full text-xs font-medium">
                  Actuelle
                </span>
              ) : (
                <button
                  onClick={() => handleRevokeSession(session.id)}
                  className="flex items-center gap-1.5 text-xs text-muted hover:text-danger transition-colors"
                >
                  <LogOut size={14} />
                  Révoquer
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
