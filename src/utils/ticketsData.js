/* Données des tickets - Centralisées */

export const ticketsData = [
  {
    id: 'TKT-2847',
    title: 'Problème de connexion',
    client: { name: 'Marie Dubois', initials: 'MD', color: '#3590E3' },
    status: 'Ouvert',
    priority: 'Haute',
    assignedTo: 'Thomas R.',
    createdAt: 'Il y a 2h',
  },
  {
    id: 'TKT-2846',
    title: 'Question sur la facturation',
    client: { name: 'Jean Laurent', initials: 'JL', color: '#BAF09D' },
    status: 'En attente',
    priority: 'Moyenne',
    assignedTo: 'Sophie M.',
    createdAt: 'Il y a 4h',
  },
  {
    id: 'TKT-2845',
    title: 'Demande de fonctionnalité',
    client: { name: 'Sophie Petit', initials: 'SP', color: '#10b981' },
    status: 'Résolu',
    priority: 'Basse',
    assignedTo: 'Pierre L.',
    createdAt: 'Il y a 1j',
  },
  {
    id: 'TKT-2844',
    title: 'Bug critique application',
    client: { name: 'Alice Moreau', initials: 'AM', color: '#06b6d4' },
    status: 'Ouvert',
    priority: 'Haute',
    assignedTo: 'Thomas R.',
    createdAt: 'Il y a 1j',
  },
  {
    id: 'TKT-2843',
    title: 'Intégration API',
    client: { name: 'Paul Durand', initials: 'PD', color: '#f59e0b' },
    status: 'En attente',
    priority: 'Moyenne',
    assignedTo: 'Non assigné',
    createdAt: 'Il y a 2j',
  },
]

export const clients = [
  'Marie Dubois',
  'Jean Laurent',
  'Sophie Petit',
  'Alice Moreau',
  'Paul Durand',
]

export const agents = ['Thomas R.', 'Sophie M.', 'Pierre L.', 'Non assigné']

export const statuses = ['Ouvert', 'En attente', 'Résolu']

export const priorities = ['Basse', 'Moyenne', 'Haute']
