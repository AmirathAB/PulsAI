/* Fonctions utilitaires utilisées dans l'application pour */
/*Formatter des données
Gérer les classes CSS
Obtenir des couleurs selon les statuts/priorités*/

import clsx from 'clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('fr-FR').format(num)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function getStatusColor(status) {
  const statusColors = {
    Ouvert: '#3590E3',
    'En attente': '#F59E0B',
    Résolu: '#10B981',
    Fermé: '#64748B',
  }
  return statusColors[status] || '#94A3B8'
}

export function getPriorityColor(priority) {
  const priorityColors = {
    Haute: '#EF4444',
    Moyenne: '#F59E0B',
    Basse: '#10B981',
  }
  return priorityColors[priority] || '#94A3B8'
}
