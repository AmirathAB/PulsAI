/* Paramètres - Configuration IA & Chat */

'use client'

import { useState } from 'react'
import { Save, Bot, Zap, MessageSquare } from 'lucide-react'
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

export default function SettingsAI() {
  const { success } = useToast()
  const [config, setConfig] = useState({
    model: 'gpt-4',
    responseStyle: 'professional',
    autoReply: true,
    autoReplyDelay: '5',
    maxTokens: '500',
    temperature: '0.7',
    contextMemory: true,
    humanHandoff: true,
    handoffThreshold: '3',
    greetingMessage: 'Bonjour ! Je suis PulsAI, votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
    signature: 'L\'équipe PulsAI',
  })

  const update = (field, value) => setConfig(prev => ({ ...prev, [field]: value }))

  const handleSave = () => {
    success('Configuration IA enregistrée avec succès !')
  }

  return (
    <div className="space-y-6">
      {/* Modèle IA */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 badge-blue rounded-xl flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Modèle IA</h2>
            <p className="text-muted text-sm">Choisissez et configurez le moteur d'intelligence artificielle</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Modèle de langage</label>
            <select
              value={config.model}
              onChange={(e) => update('model', e.target.value)}
              className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="gpt-4">GPT-4 (Recommandé)</option>
              <option value="gpt-3.5">GPT-3.5 Turbo (Rapide)</option>
              <option value="claude-3">Claude 3 Opus</option>
              <option value="claude-3-sonnet">Claude 3 Sonnet</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Créativité (température)
                <span className="text-muted ml-2 font-normal">{config.temperature}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature}
                onChange={(e) => update('temperature', e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>Précis</span>
                <span>Créatif</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Longueur max (tokens)
              </label>
              <input
                type="number"
                value={config.maxTokens}
                onChange={(e) => update('maxTokens', e.target.value)}
                min="100"
                max="2000"
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Style de réponse</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'professional', label: 'Professionnel', desc: 'Formel et précis' },
                { value: 'friendly', label: 'Amical', desc: 'Chaleureux et détendu' },
                { value: 'concise', label: 'Concis', desc: 'Bref et direct' },
              ].map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => update('responseStyle', style.value)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    config.responseStyle === style.value
                      ? 'border-primary bg-primary/15'
                      : 'border-custom bg-dark-light hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium text-sm">{style.label}</p>
                  <p className="text-muted text-xs mt-0.5">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comportement auto */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 badge-green rounded-xl flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Réponse automatique</h2>
            <p className="text-muted text-sm">Comportement de l'IA en dehors des heures de bureau</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-custom/50">
            <div>
              <p className="font-medium text-sm">Activer la réponse automatique</p>
              <p className="text-muted text-xs mt-0.5">L'IA répond automatiquement aux nouveaux messages</p>
            </div>
            <Toggle
              checked={config.autoReply}
              onChange={(val) => update('autoReply', val)}
            />
          </div>

          {config.autoReply && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Délai avant réponse (secondes)
              </label>
              <input
                type="number"
                value={config.autoReplyDelay}
                onChange={(e) => update('autoReplyDelay', e.target.value)}
                min="1"
                max="60"
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}

          <div className="flex items-center justify-between py-3 border-b border-custom/50">
            <div>
              <p className="font-medium text-sm">Mémoire contextuelle</p>
              <p className="text-muted text-xs mt-0.5">L'IA se souvient des échanges précédents avec le client</p>
            </div>
            <Toggle
              checked={config.contextMemory}
              onChange={(val) => update('contextMemory', val)}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-custom/50">
            <div>
              <p className="font-medium text-sm">Transfert vers agent humain</p>
              <p className="text-muted text-xs mt-0.5">Si l'IA ne peut pas résoudre le problème, transfère à un agent</p>
            </div>
            <Toggle
              checked={config.humanHandoff}
              onChange={(val) => update('humanHandoff', val)}
            />
          </div>

          {config.humanHandoff && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Transfert après X tentatives infructueuses
              </label>
              <input
                type="number"
                value={config.handoffThreshold}
                onChange={(e) => update('handoffThreshold', e.target.value)}
                min="1"
                max="10"
                className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          )}
        </div>
      </div>

      {/* Messages personnalisés */}
      <div className="bg-dark-card border border-custom rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 badge-orange rounded-xl flex items-center justify-center">
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 className="font-unbounded text-lg font-semibold">Messages personnalisés</h2>
            <p className="text-muted text-sm">Personnalisez les messages envoyés par l'IA</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Message d'accueil</label>
            <textarea
              value={config.greetingMessage}
              onChange={(e) => update('greetingMessage', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Signature</label>
            <input
              type="text"
              value={config.signature}
              onChange={(e) => update('signature', e.target.value)}
              className="w-full px-4 py-3 bg-dark-light border border-custom rounded-xl text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="gradient-primary px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Save size={18} />
          Enregistrer la configuration
        </button>
      </div>
    </div>
  )
}
