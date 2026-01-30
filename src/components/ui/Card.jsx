/* Composant Card réutilisable */

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-dark-card border border-custom rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}