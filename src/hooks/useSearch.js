/* Hook de recherche réutilisable */

'use client'

import { useState, useMemo } from 'react'

export default function useSearch(data, searchFields) {
  const [query, setQuery] = useState('')

  // Filtrer les données
  const filteredData = useMemo(() => {
    if (!query.trim()) return data

    const lowerQuery = query.toLowerCase()

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery)
        }
        return false
      })
    })
  }, [data, query, searchFields])

  return {
    query,
    setQuery,
    filteredData,
  }
}