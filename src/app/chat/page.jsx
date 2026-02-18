'use client'

import { useState, useRef } from 'react'
import Header from '@/components/layout/Header'
import ConversationsSidebar from '@/components/chat/ConversationsSidebar'
import ChatArea from '@/components/chat/ChatArea'
import ContactPanel from '@/components/chat/ContactPanel'
import { chatConversations, chatMessages } from '@/utils/data'
// Hook de persistance localStorage pour les messages
import { useLocalStorage } from '@/hooks/useLocalStorage'

// -- IA contextuelle : quelques règles simples basées sur des mots-clés --
const AI_RESPONSES = [
  { keywords: ['prix', 'tarif', 'abonnement', '€'], response: "Nos plans démarrent à 29€/mois (Starter), 99€/mois (Pro) et Enterprise sur mesure — tous avec 14 jours d'essai gratuit. Quel est votre volume de conversations mensuel ?" },
  { keywords: ['annuler', 'résilier', 'quitter'],   response: "Je comprends votre souhait. Avant de procéder, pourriez-vous me partager la raison ? Peut-être puis-je vous proposer une alternative adaptée." },
  { keywords: ['bug', 'erreur', 'problème'],         response: "Désolé pour ce désagrément ! 🛠️ Pouvez-vous décrire le comportement observé et votre navigateur ? Je remonte ça immédiatement à l'équipe technique." },
  { keywords: ['démo', 'demo', 'essai'],             response: "Bonne idée ! 🎯 Nos démos personnalisées durent 30 min. Je peux réserver mardi 14h, jeudi 10h ou jeudi 15h — lequel vous convient ?" },
  { keywords: ['merci', 'super', 'parfait'],         response: "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions." },
  { keywords: ['bonjour', 'salut', 'hello'],         response: "Bonjour ! 👋 Comment puis-je vous aider aujourd'hui ?" },
]

// Retourne la réponse IA selon le message, ou une réponse générique
function getAIResponse(userMessage) {
  const lower = userMessage.toLowerCase()
  const match = AI_RESPONSES.find(rule => rule.keywords.some(k => lower.includes(k)))
  return match?.response ?? "Je prends note de votre message. 🤔 Pouvez-vous me donner plus de détails pour que je vous aide au mieux ?"
}

// -- Simulation temps réel : messages entrants sur d'autres conversations --
const SIM_MESSAGES = [
  { delay: 3000,  name: 'Jean Laurent',  content: 'Puis-je avoir une facture pro forma ?'        },
  { delay: 8000,  name: 'Sophie Petit',  content: 'Jeudi 15h me convient parfaitement !'          },
  { delay: 15000, name: 'Pierre Martin', content: 'Je veux bien rester si le support s\'améliore.' },
]

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [showSidebar, setShowSidebar] = useState(false)

  //  useState(chatMessages) remplacé par useLocalStorage
  // L'historique des messages est maintenant persisté sous la clé 'pulsai_chat_messages'
  // chatMessages (depuis data.js) sert uniquement de valeur initiale au premier lancement
  const [messages, setMessages] = useLocalStorage('pulsai_chat_messages', chatMessages)

  // -- Typing indicator : true pendant que l'IA "écrit" --
  const [isTyping, setIsTyping] = useState(false)

  // -- Simulation : conversations avec badges unread --
  const [conversations, setConversations] = useState(chatConversations)
  const [simRunning, setSimRunning] = useState(false)
  const simTimers = useRef([])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      // Date.now() au lieu de messages.length + 1
      // Évite les doublons d'ID si des messages ont été supprimés du localStorage
      id: Date.now(),
      sender: 'user',
      name: 'Marie Dubois',
      content: message,
      timestamp: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    //  setMessages persiste aussi dans localStorage automatiquement
    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Afficher le typing indicator pendant que l'IA prépare sa réponse
    setIsTyping(true)

    // Simuler une réponse IA contextuelle (délai légèrement variable pour le réalisme)
    setTimeout(() => {
      const aiResponse = {
        //  Date.now() + 1 pour garantir un ID unique même en cas d'appels rapides
        id: Date.now() + 1,
        sender: 'ai',
        name: 'PulsAI',
        // Réponse contextuelle basée sur les mots-clés du message
        content: getAIResponse(newMessage.content),
        timestamp: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      // setMessages persiste aussi dans localStorage automatiquement
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1200 + Math.random() * 600) // délai entre 1.2s et 1.8s
  }

  // -- Lance la simulation : messages entrants planifiés sur d'autres conversations --
  const handleStartSim = () => {
    if (simRunning) return
    setSimRunning(true)

    simTimers.current = SIM_MESSAGES.map(({ delay, name, content }) =>
      setTimeout(() => {
        setConversations(prev =>
          prev.map(c =>
            c.name === name
              ? { ...c, lastMessage: content, unread: (c.unread || 0) + 1 }
              : c
          )
        )
      }, delay)
    )
  }

  // -- Stoppe et nettoie les timers de simulation --
  const handleStopSim = () => {
    simTimers.current.forEach(clearTimeout)
    setSimRunning(false)
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Chat AI"
        subtitle="Conversations en temps réel avec l'intelligence artificielle"
      />

      {/* Toggle Mobile */}
      <div className="md:hidden px-4 py-2 flex gap-2 border-b border-border">
        <button
          onClick={() => setShowSidebar(true)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            showSidebar
              ? 'bg-primary text-white'
              : 'bg-background-hover text-text-secondary'
          }`}
        >
          Conversations
        </button>
        <button
          onClick={() => setShowSidebar(false)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            !showSidebar
              ? 'bg-primary text-white'
              : 'bg-background-hover text-text-secondary'
          }`}
        >
          Chat
        </button>
      </div>

      <div className="p-2 sm:p-4 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 lg:gap-6 h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)] lg:h-[calc(100vh-200px)]">
          {/* Sidebar - Masquée sur mobile sauf si showSidebar=true */}
          <div className={`${showSidebar ? 'block' : 'hidden'} md:block md:col-span-4 lg:col-span-3`}>
            <ConversationsSidebar
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
              // Props simulation
              simRunning={simRunning}
              onStartSim={handleStartSim}
              onStopSim={handleStopSim}
            />
          </div>

          {/* Chat Area - Masquée sur mobile si showSidebar=true */}
          <div className={`${showSidebar ? 'hidden' : 'block'} md:block md:col-span-8 lg:col-span-6`}>
            <ChatArea
              messages={messages}
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
              // Prop typing indicator
              isTyping={isTyping}
            />
          </div>

          {/* Contact Panel - Visible uniquement sur grands écrans */}
          <ContactPanel />
        </div>
      </div>
    </div>
  )
}
