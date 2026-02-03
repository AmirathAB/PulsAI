/*
le composant visuel qui :

écoute les toasts via useToast()

les affiche à l’écran

gère les animations d’entrée / sortie

permet la fermeture manuelle
*/

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'
import { useToast } from '@/contexts/ToastContext'

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
}

const colors = {
  success: 'border-l-status-success',
  error: 'border-l-status-error',
  info: 'border-l-status-info',
  warning: 'border-l-status-warning',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-8 right-8 z-[2000] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = icons[toast.type] || Info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`
                flex items-center gap-3 px-4 py-3
                bg-background-card border border-border rounded-lg
                shadow-lg min-w-[300px] max-w-[400px]
                ${colors[toast.type] || colors.info} border-l-4
              `}
            >
              <Icon
                size={20}
                className={
                  toast.type === 'success'
                    ? 'text-status-success'
                    : toast.type === 'error'
                    ? 'text-status-error'
                    : toast.type === 'warning'
                    ? 'text-status-warning'
                    : 'text-status-info'
                }
              />
              <span className="flex-1 text-sm text-white">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-background-hover rounded transition-colors text-text-secondary hover:text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
