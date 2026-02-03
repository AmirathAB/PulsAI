/* Carte statistique du dashboard */

'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import Card from './Card'

export default function StatCard({ data, index = 0 }) {
  const Icon = Icons[data.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:border-primary/50 transition-all group">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ backgroundColor: data.bgColor }}
          >
            <Icon size={24} style={{ color: data.iconColor }} />
          </div>

          <div
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              data.changeType === 'positive'
                ? 'bg-status-success/20 text-status-success'
                : 'bg-status-error/20 text-status-error'
            }`}
          >
            {data.change}
          </div>
        </div>

        <h3 className="text-4xl font-bold text-white mb-2">{data.value}</h3>
        <p className="text-sm text-text-secondary">{data.title}</p>
      </Card>
    </motion.div>
  )
}
