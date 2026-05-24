import { useState, useEffect } from 'react'
import { FeedbackType } from '../types'

interface UserPreferences {
  contentTypes: string[]
  feedbackTypes: FeedbackType[]
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({ contentTypes: [], feedbackTypes: [] })

  useEffect(() => {
    // LocalStorage'dan tercihleri yükle
    const savedPreferences = localStorage.getItem('userPreferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  const updatePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences)
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences))
  }

  return { preferences, updatePreferences }
}