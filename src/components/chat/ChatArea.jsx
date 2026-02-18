/* La section de chat */
'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile, Paperclip } from 'lucide-react'

// -- Typing indicator : 3 points animés pendant que l'IA écrit --
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-background-hover rounded-xl px-4 py-3 flex items-center gap-1">
        <span className="text-xs text-text-muted mr-2">PulsAI</span>
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-primary inline-block"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatArea({ messages, message, onMessageChange, onSendMessage, isTyping }) {
  // Ref pour auto-scroller vers le bas à chaque nouveau message
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  return (
    <div className="col-span-1 md:col-span-8 lg:col-span-6 bg-background-card rounded-xl border border-border overflow-hidden flex flex-col">
      {' '}
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white text-sm">
            MD
          </div>
          <div>
            <h3 className="font-semibold text-white">Marie Dubois</h3>
            <p className="text-xs text-green-400">En ligne</p>{' '}
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[70%] rounded-xl p-3 sm:p-4 ${
                msg.sender === 'user' ? 'bg-primary text-white' : 'bg-background-hover text-white'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{msg.name}</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p
                className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-white/70' : 'text-text-muted'}`}
              >
                {msg.timestamp}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator affiché pendant que l'IA prépare sa réponse */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ancre pour le scroll automatique */}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <div className="p-2 sm:p-3 md:p-4 border-t border-border">
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {/* Boutons cachés sur mobile */}
          <button className="hidden sm:block p-2 hover:bg-background-hover rounded-lg transition-colors text-text-secondary hover:text-white">
            <Paperclip size={20} />
          </button>
          <button className="hidden sm:block p-2 hover:bg-background-hover rounded-lg transition-colors text-text-secondary hover:text-white">
            <Smile size={20} />
          </button>
          <button className="p-2 hover:bg-background-hover rounded-lg transition-colors text-text-secondary hover:text-white">
            <Paperclip size={20} />
          </button>
          <button className="p-2 hover:bg-background-hover rounded-lg transition-colors text-text-secondary hover:text-white">
            <Smile size={20} />
          </button>
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2.5 bg-background-hover border border-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
          <button
            onClick={onSendMessage}
            className="p-2.5 bg-primary hover:bg-primary-dark rounded-lg transition-colors text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
