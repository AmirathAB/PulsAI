/* Hook pour uploader et persister une image en base64 dans localStorage
   - Lit le fichier via FileReader
   - Encode en base64
   - Stocke dans localStorage sous la clé fournie
   - Retourne l'URL prévisualisable
*/

'use client'

import { useState, useCallback } from 'react'
// On réutilise useLocalStorage pour la persistance de l'image
import { useLocalStorage } from './useLocalStorage'

export function useFileUpload(storageKey) {
  // L'image est stockée en base64 dans localStorage sous la clé fournie
  const [storedImage, setStoredImage] = useLocalStorage(storageKey, null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const uploadFile = useCallback((file) => {
    if (!file) return

    // Vérification du format : on n'accepte que les images courantes
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      setError('Format invalide. Utilisez JPG, PNG ou WebP.')
      return
    }
    // Limite à 2 Mo : 2 * 1024 * 1024 = 2 097 152 octets
    if (file.size > 2 * 1024 * 1024) {
      setError('Fichier trop lourd. Maximum 2 Mo.')
      return
    }

    setIsLoading(true)
    setError(null)

    // FileReader lit le fichier de façon asynchrone côté navigateur
    const reader = new FileReader()
    // onload se déclenche quand la lecture est terminée
    reader.onload = (e) => {
      // e.target.result contient la string base64 : "data:image/jpeg;base64,/9j/4AAQ..."
      setStoredImage(e.target.result)
      setIsLoading(false)
    }
    reader.onerror = () => {
      setError('Erreur lors de la lecture du fichier.')
      setIsLoading(false)
    }
    // readAsDataURL encode le fichier en base64 avec le préfixe data URI
    reader.readAsDataURL(file)
  }, [setStoredImage])

  // Supprime l'image du localStorage et remet null
  const removeImage = useCallback(() => {
    setStoredImage(null)
    setError(null)
  }, [setStoredImage])

  return {
    imageUrl: storedImage,  
    uploadFile,             
    removeImage,            
    isLoading,              
    error,                  
  }
}
