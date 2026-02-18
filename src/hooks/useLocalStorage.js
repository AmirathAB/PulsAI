/* Hook générique de persistance localStorage
   - Lit la valeur au premier rendu
   - Écrit automatiquement à chaque changement
   - Gère les erreurs (localStorage désactivé, JSON invalide)
   - SSR-safe (Next.js) grâce à la vérification typeof window
*/

'use client'

import { useState, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  // Initialiser depuis localStorage si disponible, sinon valeur par défaut
  const [storedValue, setStoredValue] = useState(() => {
    // typeof window === 'undefined' détecte le rendu côté serveur (Next.js SSR)
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      // JSON.parse reconvertit la string stockée en objet/tableau/valeur JS
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Si le JSON est corrompu ou localStorage bloqué, on repart des valeurs par défaut
      console.warn(`useLocalStorage: erreur lecture "${key}"`, error)
      return initialValue
    }
  })

  // Setter qui met à jour le state React ET localStorage en même temps
  const setValue = useCallback((value) => {
    try {
      // Accepte une fonction updater comme useState : setVal(prev => prev + 1)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        // JSON.stringify sérialise l'objet pour le stockage en string
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // Peut arriver si localStorage est plein (quota dépassé)
      console.warn(`useLocalStorage: erreur écriture "${key}"`, error)
    }
  }, [key, storedValue])

  // Supprimer la clé du localStorage et remettre la valeur par défaut
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`useLocalStorage: erreur suppression "${key}"`, error)
    }
  }, [key, initialValue])

  // Retourne le même tuple que useState, plus une fonction de suppression
  return [storedValue, setValue, removeValue]
}
