/* Conversations récentes */

'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import { recentChats } from '@/utils/data'

export default function RecentChats({ searchQuery = '' }) {
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return recentChats
    const q = searchQuery.toLowerCase()
    return recentChats.filter((c) => c.name.toLowerCase().includes(q) || c.message.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="xl:col-span-2">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-unbounded text-lg font-semibold">Conversations IA récentes</h2>
          <Link href="/chat" className="flex items-center gap-1 text-sm text-primary hover:opacity-80">Voir tout <ArrowRight size={16} /></Link>
        </div>
        <div className="space-y-3">
          {filtered.map((chat, i) => (
            <motion.div key={chat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="relative flex items-center gap-4 p-4 rounded-xl hover:bg-dark-light cursor-pointer transition-colors">
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-semibold flex-shrink-0" style={{ backgroundColor: chat.color }}>{chat.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-muted text-xs">{chat.time}</span>
                </div>
                <p className="text-muted text-sm truncate">{chat.message}</p>
              </div>
              {chat.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}