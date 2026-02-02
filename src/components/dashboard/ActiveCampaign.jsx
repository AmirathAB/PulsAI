/* Campagne active */

import { Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ActiveCampaign() {
  return (
    <div className="bg-dark-card border border-custom rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-unbounded text-lg font-semibold">Campagne active</h2>
        <Link
          href="/campaigns"
          className="text-primary text-sm font-medium flex items-center gap-1"
        >
          Voir <ArrowRight size={16} />
        </Link>{' '}
      </div>
      <div className="p-4 bg-dark-light-50 rounded-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 badge-blue rounded-xl flex items-center justify-center">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Newsletter Janvier 2026</h3>
            <p className="text-muted text-sm">18,642 destinataires</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="font-unbounded text-xl font-bold text-primary">42.3%</div>
            <div className="text-muted text-xs">Ouverture</div>
          </div>
          <div className="text-center">
            <div className="font-unbounded text-xl font-bold text-secondary-custom">12.8%</div>
            <div className="text-muted text-xs">Clics</div>
          </div>
          <div className="text-center">
            <div className="font-unbounded text-xl font-bold text-warning">2.1%</div>
            <div className="text-muted text-xs">Conversion</div>
          </div>
        </div>
        <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full" style={{ width: '75%' }} />
        </div>
        <p className="text-center text-muted text-xs mt-2">75% de la campagne terminée</p>
      </div>
    </div>
  )
}
