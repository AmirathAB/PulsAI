
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function ConversationsSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter(
    conv =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
<div className="col-span-1 md:col-span-4 lg:col-span-3 bg-background-card rounded-xl border border-border overflow-hidden flex flex-col">      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            size={16}
          />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-background-hover border border-border rounded-lg text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-text-muted text-sm">
              Aucune conversation trouvée pour "{searchQuery}"
            </p>
          </div>
        ) : (
          filteredConversations.map((conv, index) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectConversation(conv.id)}
              className={`p-4 border-b border-border cursor-pointer transition-all ${
                selectedConversation === conv.id
                  ? 'bg-background-hover border-l-4 border-l-primary'
                  : 'hover:bg-background-hover/50 border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ backgroundColor: conv.color }}
                >
                  {conv.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-text-muted">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-text-secondary truncate flex-1">
                      {conv.lastMessage}
                    </p>
                    {conv.unread > 0 && (
                      <span className="ml-2 bg-status-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}