import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { useUserPreferences } from '../hooks/useUserPreferences'
import { FeedbackType } from '../types'

interface UserPreferencesFormProps {
  onSubmit: (preferences: { contentTypes: string[]; feedbackTypes: FeedbackType[] }) => void
}

export function UserPreferencesForm({ onSubmit }: UserPreferencesFormProps) {
  const { preferences, updatePreferences } = useUserPreferences()
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(preferences.contentTypes)
  const [selectedFeedbackTypes, setSelectedFeedbackTypes] = useState<FeedbackType[]>(preferences.feedbackTypes)

  const [preferenceMetrics, setPreferenceMetrics] = useState({
    preferenceChanges: 0,
    lastChangeTime: Date.now()
  })

  const contentTypeOptions = [
    { id: 'news', label: 'Haberler' },
    { id: 'matches', label: 'Maçlar' },
    { id: 'highlights', label: 'Öne Çıkanlar' },
    { id: 'fanStories', label: 'Fan Hikayeleri' }
  ]

  const feedbackTypeOptions: { id: FeedbackType; label: string }[] = [
    { id: 'like', label: 'Beğenilen İçerikler' },
    { id: 'dislike', label: 'Beğenilmeyen İçerikler' }
  ]

  useEffect(() => {
    // Tercih değişikliklerini izle
    const interval = setInterval(() => {
      console.log('User Preference Metrics:', preferenceMetrics)
      // Burada metrikleri bir analytics servisine gönderilebilir
    }, 30000) // Her 30 saniyede bir raporla

    return () => clearInterval(interval)
  }, [preferenceMetrics])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPreferences = {
      contentTypes: selectedContentTypes,
      feedbackTypes: selectedFeedbackTypes
    }
    updatePreferences(newPreferences)
    onSubmit(newPreferences)
    setPreferenceMetrics(prev => ({
      preferenceChanges: prev.preferenceChanges + 1,
      lastChangeTime: Date.now()
    }))
  }

  const toggleContentType = (id: string) => {
    setSelectedContentTypes(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
    setPreferenceMetrics(prev => ({ ...prev, lastChangeTime: Date.now() }))
  }

  const toggleFeedbackType = (id: FeedbackType) => {
    setSelectedFeedbackTypes(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
    setPreferenceMetrics(prev => ({ ...prev, lastChangeTime: Date.now() }))
  }

  return (
    <GlassCard className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">İçerik Tercihleri</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">İçerik Türleri</h3>
          <div className="grid grid-cols-2 gap-2">
            {contentTypeOptions.map(option => (
              <label key={option.id} className="flex items-center gap-2 p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-elevated)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedContentTypes.includes(option.id)}
                  onChange={() => toggleContentType(option.id)}
                  className="h-4 w-4 rounded text-fb-gold-500 focus:ring-fb-gold-500"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Geri Bildirim Türleri</h3>
          <div className="grid grid-cols-2 gap-2">
            {feedbackTypeOptions.map(option => (
              <label key={option.id} className="flex items-center gap-2 p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-elevated)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFeedbackTypes.includes(option.id)}
                  onChange={() => toggleFeedbackType(option.id)}
                  className="h-4 w-4 rounded text-fb-gold-500 focus:ring-fb-gold-500"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">Tercihleri Kaydet</Button>
      </form>
    </GlassCard>
  )
}