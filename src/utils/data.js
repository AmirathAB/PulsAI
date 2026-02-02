// Dashboard Quick Stats
export const quickStats = [
  {
    icon: 'MessageSquare',
    title: 'Conversations actives',
    value: '2,847',
    change: '+12%',
    changeType: 'positive',
    bgColor: 'rgba(53, 144, 227, 0.1)',
    iconColor: '#3590E3',
  },
  {
    icon: 'CheckSquare',
    title: 'Taux de résolution IA',
    value: '94.2%',
    change: '+8%',
    changeType: 'positive',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    iconColor: '#10B981',
  },
  {
    icon: 'Zap',
    title: 'Temps de réponse moyen',
    value: '12s',
    change: '-3%',
    changeType: 'negative',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    iconColor: '#F59E0B',
  },
  {
    icon: 'Mail',
    title: 'Emails envoyés ce mois',
    value: '18,642',
    change: '+24%',
    changeType: 'positive',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    iconColor: '#EF4444',
  },
]

// Recent Chats
export const recentChats = [
  {
    id: 1,
    initials: 'MD',
    name: 'Marie Dubois',
    message: "J'aimerais avoir des informations...",
    time: 'il y a 2 min',
    color: '#3590E3',
  },
  {
    id: 2,
    initials: 'JL',
    name: 'Jean Laurent',
    message: "Merci pour votre aide, c'était parfait!",
    time: 'il y a 15 min',
    color: '#10B981',
  },
  {
    id: 3,
    initials: 'SP',
    name: 'Sophie Petit',
    message: 'Est-ce que vous proposez une démo gratuite?',
    time: 'il y a 1h',
    color: '#F59E0B',
  },
  {
    id: 4,
    initials: 'PM',
    name: 'Pierre Martin',
    message: 'Je souhaite modifier mon abonnement',
    time: 'il y a 2h',
    color: '#EF4444',
  },
]

// Activity Feed
export const activityFeed = [
  {
    id: 1,
    type: 'ticket',
    title: 'Nouveau ticket créé',
    description: '#TKT-2847 - Problème de connexion',
    time: 'il y a 5 minutes',
    color: '#3590E3',
  },
  {
    id: 2,
    type: 'campaign',
    title: 'Campagne lancée',
    description: 'Newsletter Janvier 2026',
    time: 'il y a 1 heure',
    color: '#10B981',
  },
  {
    id: 3,
    type: 'contact',
    title: 'Contact ajouté',
    description: 'Alice Moreau - alice@example.com',
    time: 'il y a 3 heures',
    color: '#F59E0B',
  },
  {
    id: 4,
    type: 'ai',
    title: 'IA mise à jour',
    description: 'Nouveau modèle de réponse déployé',
    time: 'il y a 5 heures',
    color: '#EF4444',
  },
]

// Stats Overview KPIs
export const statsKPIs = [
  {
    icon: 'Users',
    title: 'Total contacts',
    value: '45,892',
    change: '+18%',
    changeType: 'positive',
  },
  {
    icon: 'Mail',
    title: 'Emails envoyés',
    value: '156,432',
    change: '+24%',
    changeType: 'positive',
  },
  {
    icon: 'MessageSquare',
    title: 'Conversations IA',
    value: '28,547',
    change: '+32%',
    changeType: 'positive',
  },
  {
    icon: 'CheckCircle',
    title: 'Tickets résolus',
    value: '1,234',
    change: '-8%',
    changeType: 'negative',
  },
]

// Line Chart Data
export const lineChartData = [
  { day: 'Lun', conversations: 320, resolutions: 290 },
  { day: 'Mar', conversations: 450, resolutions: 400 },
  { day: 'Mer', conversations: 350, resolutions: 310 },
  { day: 'Jeu', conversations: 530, resolutions: 490 },
  { day: 'Ven', conversations: 480, resolutions: 450 },
  { day: 'Sam', conversations: 320, resolutions: 280 },
  { day: 'Dim', conversations: 280, resolutions: 250 },
]

// Doughnut Chart Data
export const doughnutChartData = [
  { name: 'Chat', value: 35, color: '#3590E3' },
  { name: 'Email', value: 30, color: '#10B981' },
  { name: 'Téléphone', value: 20, color: '#F59E0B' },
  { name: 'Réseaux sociaux', value: 15, color: '#EF4444' },
]

// Bar Chart Data
export const barChartData = [
  { name: 'Newsletter', openRate: 42, clickRate: 8 },
  { name: 'Relance', openRate: 38, clickRate: 6 },
  { name: 'Promo', openRate: 52, clickRate: 15 },
  { name: 'Onboarding', openRate: 65, clickRate: 28 },
  { name: 'Feedback', openRate: 44, clickRate: 12 },
]

// Tickets Data
export const ticketsData = [
  {
    id: 'TKT-2847',
    title: 'Problème de connexion',
    client: { initials: 'MD', name: 'Marie Dubois' },
    status: 'Ouvert',
    statusColor: '#3590E3',
    priority: 'Haute',
    priorityColor: '#EF4444',
    assignedTo: 'Thomas R.',
    created: 'il y a 2h',
    icon: '🔴',
  },
  {
    id: 'TKT-2846',
    title: 'Question facturation',
    client: { initials: 'JL', name: 'Jean Laurent' },
    status: 'En attente',
    statusColor: '#F59E0B',
    priority: 'Moyenne',
    priorityColor: '#F59E0B',
    assignedTo: 'Sophie M.',
    created: 'il y a 4h',
    icon: '🟠',
  },
  {
    id: 'TKT-2845',
    title: 'Demande fonctionnalité',
    client: { initials: 'SP', name: 'Sophie Petit' },
    status: 'Résolu',
    statusColor: '#10B981',
    priority: 'Basse',
    priorityColor: '#10B981',
    assignedTo: 'Pierre L.',
    created: 'il y a 1j',
    icon: '🟢',
  },
  {
    id: 'TKT-2844',
    title: 'Bug critique application',
    client: { initials: 'AM', name: 'Alice Moreau' },
    status: 'Ouvert',
    statusColor: '#3590E3',
    priority: 'Haute',
    priorityColor: '#EF4444',
    assignedTo: 'Thomas R.',
    created: 'il y a 1j',
    icon: '🔴',
  },
  {
    id: 'TKT-2843',
    title: 'Intégration API',
    client: { initials: 'PD', name: 'Paul Durand' },
    status: 'En attente',
    statusColor: '#F59E0B',
    priority: 'Moyenne',
    priorityColor: '#F59E0B',
    assignedTo: 'Non assigné',
    created: 'il y a 2j',
    icon: '🟠',
  },
]

// Campaigns Data
export const campaignsData = [
  {
    id: 1,
    status: 'Active',
    statusColor: '#10B981',
    icon: 'Mail',
    title: 'Newsletter Janvier 2026',
    description:
      'Campagne mensuelle avec les dernières actualités et offres spéciales PulsAI.',
    sent: '18,642',
    openRate: '42.3%',
    clickRate: '12.8%',
  },
  {
    id: 2,
    status: 'Active',
    statusColor: '#10B981',
    icon: 'Target',
    title: 'Campagne de relance',
    description:
      'Réengagement des utilisateurs inactifs depuis plus de 30 jours.',
    sent: '5,234',
    openRate: '38.1%',
    clickRate: '8.4%',
  },
  {
    id: 3,
    status: 'Planifiée',
    statusColor: '#3590E3',
    icon: 'Gift',
    title: 'Offre Saint-Valentin',
    description:
      'Promotion spéciale avec 20% de réduction pour la Saint-Valentin.',
    scheduledDate: '14 Février 2026',
    recipients: '24,830',
  },
  {
    id: 4,
    status: 'Brouillon',
    statusColor: '#64748B',
    icon: 'FileText',
    title: 'Mise à jour produit Q1',
    description:
      'Annonce des nouvelles fonctionnalités et améliorations du premier trimestre.',
    lastEdited: 'il y a 2 jours',
  },
]

// Chat Conversations
export const chatConversations = [
  {
    id: 1,
    initials: 'MD',
    name: 'Marie Dubois',
    lastMessage: "J'aimerais avoir des informations...",
    time: '14:32',
    unread: 2,
    color: '#3590E3',
    active: true,
  },
  {
    id: 2,
    initials: 'JL',
    name: 'Jean Laurent',
    lastMessage: 'Merci pour votre aide!',
    time: '13:15',
    unread: 0,
    color: '#10B981',
    active: false,
  },
  {
    id: 3,
    initials: 'SP',
    name: 'Sophie Petit',
    lastMessage: 'Proposez-vous une démo?',
    time: '12:08',
    unread: 1,
    color: '#F59E0B',
    active: false,
  },
  {
    id: 4,
    initials: 'PM',
    name: 'Pierre Martin',
    lastMessage: 'Je souhaite modifier...',
    time: '11:45',
    unread: 0,
    color: '#EF4444',
    active: false,
  },
]

// Chat Messages
export const chatMessages = [
  {
    id: 1,
    sender: 'user',
    name: 'Marie Dubois',
    content:
      "Bonjour ! J'aimerais avoir des informations sur vos offres d'abonnement. Proposez-vous une version d'essai gratuite ?",
    timestamp: '14:28',
  },
  {
    id: 2,
    sender: 'ai',
    name: 'PulsAI',
    content:
      "Bonjour Marie ! 👋 Je suis ravi de vous aider.\n\nOui, nous proposons effectivement une période d'essai gratuite de 14 jours pour toutes nos offres ! Voici nos différents plans :\n\n✨ **Starter** - 29€/mois\n• Jusqu'à 1000 conversations/mois\n• Support par email\n• Intégrations de base\n\n🚀 **Pro** - 99€/mois\n• Conversations illimitées\n• Support prioritaire 24/7\n• Toutes les intégrations\n• Analytiques avancées\n\n💼 **Enterprise** - Sur mesure\n• Solutions personnalisées\n• Account manager dédié\n• SLA garantis\n\nSouhaitez-vous que je vous aide à démarrer un essai gratuit ?",
    timestamp: '14:29',
  },
  {
    id: 3,
    sender: 'user',
    name: 'Marie Dubois',
    content: "C'est parfait ! Est-ce que l'essai gratuit nécessite une carte bancaire ?",
    timestamp: '14:31',
  },
  {
    id: 4,
    sender: 'ai',
    name: 'PulsAI',
    content:
      "Absolument ! Nous offrons un essai gratuit de 14 jours avec accès complet à toutes les fonctionnalités, sans engagement et sans carte bancaire. 🚀\n\nJe peux vous créer un compte d'essai immédiatement si vous le souhaitez. Il me faudrait juste :\n• Votre adresse email professionnelle\n• Le nom de votre entreprise\n\nVoulez-vous que je procède ?",
    timestamp: '14:32',
  },
]
