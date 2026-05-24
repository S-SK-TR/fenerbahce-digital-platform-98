import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { useUserPreferences } from '../hooks/useUserPreferences'
import { FeedbackType, ContentFilterOptions } from '../types'
import { Calendar, Filter, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContentFilterProps {
  onFilterChange: (filters: ContentFilterOptions) => void
  initialFilters?: ContentFilterOptions
}

export function ContentFilter({ onFilterChange, initialFilters }: ContentFilterProps) {
  const { preferences } = useUserPreferences()

  const [activeContentTypes, setActiveContentTypes] = useState<string[]>(
    initialFilters?.contentTypes || preferences.contentTypes || ['news', 'matches']
  )

  const [activeFeedbackTypes, setActiveFeedbackTypes] = useState<FeedbackType[]>(initialFilters?.feedbackTypes || [])

  const [dateRange, setDateRange] = useState<{ start: string; end: string } | undefined>(initialFilters?.dateRange)

  const [minRating, setMinRating] = useState<number | undefined>(initialFilters?.minRating)

  const [filterMetrics, setFilterMetrics] = useState({
    filterChanges: 0,
    lastFilterTime: Date.now()
  })

  const contentTypeOptions = [
    { id: 'news', label: 'Haberler', icon: 'Newspaper' },
    { id: 'matches', label: 'Maçlar', icon: 'Trophy' },
    { id: 'highlights', label: 'Öne Çıkanlar', icon: 'Video' },
    { id: 'fanStories', label: 'Fan Hikayeleri', icon: 'Users' }
  ]

  const feedbackTypeOptions: { id: FeedbackType; label: string; icon: string }[] = [
    { id: 'like', label: 'Beğenilen', icon: 'ThumbsUp' },
    { id: 'dislike', label: 'Beğenilmeyen', icon: 'ThumbsDown' },
    { id: 'report', label: 'Raporlu', icon: 'Flag' }
  ]

  useEffect(() => {
    // Filtre değişikliklerini izle
    const interval = setInterval(() => {
      console.log('Content Filter Metrics:', filterMetrics)
      // Burada metrikleri bir analytics servisine gönderilebilir
    }, 30000) // Her 30 saniyede bir raporla

    return () => clearInterval(interval)
  }, [filterMetrics])

  const handleContentTypeToggle = (id: string) => {
    const newTypes = activeContentTypes.includes(id)
      ? activeContentTypes.filter(type => type !== id)
      : [...activeContentTypes, id]
    setActiveContentTypes(newTypes)
    onFilterChange({ contentTypes: newTypes, feedbackTypes: activeFeedbackTypes, dateRange, minRating })
    setFilterMetrics(prev => ({ ...prev, filterChanges: prev.filterChanges + 1, lastFilterTime: Date.now() }))
  }

  const handleFeedbackTypeToggle = (id: FeedbackType) => {
    const newTypes = activeFeedbackTypes.includes(id)
      ? activeFeedbackTypes.filter(type => type !== id)
      : [...activeFeedbackTypes, id]
    setActiveFeedbackTypes(newTypes)
    onFilterChange({ contentTypes: activeContentTypes, feedbackTypes: newTypes, dateRange, minRating })
    setFilterMetrics(prev => ({ ...prev, filterChanges: prev.filterChanges + 1, lastFilterTime: Date.now() }))
  }

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'start' | 'end') => {
    const newRange = {
      ...dateRange,
      [field]: e.target.value
    }
    setDateRange(newRange)
    onFilterChange({ contentTypes: activeContentTypes, feedbackTypes: activeFeedbackTypes, dateRange: newRange, minRating })
    setFilterMetrics(prev => ({ ...prev, filterChanges: prev.filterChanges + 1, lastFilterTime: Date.now() }))
  }

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined
    setMinRating(value)
    onFilterChange({ contentTypes: activeContentTypes, feedbackTypes: activeFeedbackTypes, dateRange, minRating: value })
    setFilterMetrics(prev => ({ ...prev, filterChanges: prev.filterChanges + 1, lastFilterTime: Date.now() }))
  }

  return (
    <GlassCard className="mb-6">
      <div className="flex flex-col gap-4">
        {/* İçerik Türleri */}
        <div>
          <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
            <Filter size={14} /> İçerik Türleri
          </h3>
          <div className="flex flex-wrap gap-2">
            {contentTypeOptions.map(option => (
              <Button
                key={option.id}
                variant={activeContentTypes.includes(option.id) ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleContentTypeToggle(option.id)}
                icon={option.icon}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Geri Bildirim Türleri */}
        <div>
          <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
            <Star size={14} /> Geri Bildirimler
          </h3>
          <div className="flex flex-wrap gap-2">
            {feedbackTypeOptions.map(option => (
              <Button
                key={option.id}
                variant={activeFeedbackTypes.includes(option.id) ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleFeedbackTypeToggle(option.id)}
                icon={option.icon}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tarih Aralığı */}
        <div>
          <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
            <Calendar size={14} /> Tarih Aralığı
          </h3>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange?.start || ''}
              onChange={(e) => handleDateRangeChange(e, 'start')}
              className="flex-1 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-sm"
            />
            <span className="text-[var(--text-muted)] self-center">-</span>
            <input
              type="date"
              value={dateRange?.end || ''}
              onChange={(e) => handleDateRangeChange(e, 'end')}
              className="flex-1 p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-sm"
            />
          </div>
        </div>

        {/* Minimum Puan */}
        <div>
          <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
            <Star size={14} /> Minimum Puan
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating || 0}
              onChange={handleRatingChange}
              className="flex-1"
            />
            <span className="text-sm text-[var(--text-muted)] w-8 text-right">
              {minRating || '0'}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}