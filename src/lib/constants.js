export const NAVIGATION_ITEMS = [
  {
    label: 'Dashboard',
    href: '/',
    icon: 'LayoutDashboard',
    badge: null,
  },
  {
    label: 'Statistiques',
    href: '/stats',
    icon: 'BarChart3',
    badge: null,
  },
  {
    label: 'Tickets',
    href: '/tickets',
    icon: 'Ticket',
    badge: 5,
  },
  {
    label: 'Campagnes',
    href: '/campaigns',
    icon: 'Mail',
    badge: null,
  },
  {
    label: 'Chat AI',
    href: '/chat',
    icon: 'MessageSquare',
    badge: 12,
  },
]

export const TICKET_STATUSES = ['Tous', 'Ouverts', 'En attente', 'Résolus']

export const CAMPAIGN_STATUSES = ['Toutes', 'Actives', 'Planifiées', 'Brouillons']

export const COLORS = {
  primary: '#3590E3',
  secondary: '#BAF09D',
  background: '#1a2332',
  card: '#2a3647',
  sidebar: '#1e293b',
  hover: '#334155',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#374151',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3590E3',
}
