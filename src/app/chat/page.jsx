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

      <div className="p-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          <ConversationsSidebar
            conversations={chatConversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />

          <ChatArea
            messages={messages}
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
          />

          <ContactPanel />
        </div>
      </div>
    </div>
  )
}