import './globals.css'

export const metadata = {
  title: 'PulsAI - CRM Intelligent',
  description: 'Plateforme CRM intelligente avec IA conversationnelle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
