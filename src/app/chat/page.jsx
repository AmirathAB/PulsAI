'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/layout/Header'
import ConversationsSidebar from '@/components/chat/ConversationsSidebar'
import ChatArea from '@/components/chat/ChatArea'
import ContactPanel from '@/components/chat/ContactPanel'
import { chatConversations, chatMessages } from '@/utils/data'

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(chatMessages)
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [showSidebar, setShowSidebar] = useState(false)

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      name: 'Marie Dubois',
      content: message,
      timestamp: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // Simuler une réponse IA
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        name: 'PulsAI',
        content:
          "Merci pour votre message ! Je suis en train d'analyser votre demande. Un de nos conseillers va prendre en charge votre dossier dans les plus brefs délais. 😊",
        timestamp: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
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
              conversations={chatConversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          </div>

          {/* Chat Area - Masquée sur mobile si showSidebar=true */}
          <div className={`${showSidebar ? 'hidden' : 'block'} md:block md:col-span-8 lg:col-span-6`}>
            <ChatArea
              messages={messages}
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Contact Panel - Visible uniquement sur grands écrans */}
          <ContactPanel />
        </div>
      </div>
    </div>
  )
}