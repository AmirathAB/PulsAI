'use client'

import { motion } from 'framer-motion'

export default function ContactPanel() {
  const contactDetails = [
    { 
      label: 'EMAIL', 
      value: 'marie.dubois@example.com'
    },
    { 
      label: 'TÉLÉPHONE', 
      value: '+33 6 12 34 56 78'
    },
    { 
      label: 'ENTREPRISE', 
      value: 'TechCorp SAS'
    },
    { 
      label: 'CONVERSATIONS', 
      value: '47 conversations'
    },
  ]

  return (
    <div className="col-span-3 bg-[#1a2332] rounded-2xl p-8 font-['Ubuntu']">
      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#3590E3] flex items-center justify-center font-bold text-white text-3xl mx-auto mb-4 shadow-lg shadow-[#3590E3]/20">
          MD
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">
          Marie Dubois
        </h3>
        
        <p className="text-sm text-gray-400">
          Client Premium
        </p>
      </motion.div>

      {/* Contact Details */}
      <div className="space-y-4">
        {contactDetails.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="p-4 bg-[#273447] rounded-xl hover:bg-[#2d3d52] transition-colors cursor-pointer"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
              {item.label}
            </p>
            <p className="text-sm text-white font-medium">
              {item.value}
            </p>
          </motion.div>
        ))}

        {/* Satisfaction */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-4 bg-[#273447] rounded-xl hover:bg-[#2d3d52] transition-colors cursor-pointer"
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
            SATISFACTION
          </p>
          <p className="text-sm text-[#BAF09D] font-bold">
            98.5%
          </p>
        </motion.div>
      </div>
    </div>
  )
}