'use client'

import { motion } from 'framer-motion'
import { Send, Smile, Paperclip } from 'lucide-react'

export default function ChatArea({ messages, message, onMessageChange, onSendMessage }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  return (
    <div className="col-span-6 bg-background-card rounded-xl border border-border overflow-hidden flex flex-col">
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
              className={`max-w-[70%] rounded-xl p-4 ${
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
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
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
