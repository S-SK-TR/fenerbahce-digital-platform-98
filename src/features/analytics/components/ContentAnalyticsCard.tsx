import { GlassCard } from '@/components/ui/GlassCard'
import { ContentTypeAnalytics } from '../types'
import { Eye, ThumbsUp, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ContentAnalyticsCardProps {
  analytics: ContentTypeAnalytics
}

export function ContentAnalyticsCard({ analytics }: ContentAnalyticsCardProps) {
  const { type, data } = analytics
  const [cardMetrics, setCardMetrics] = useState({
    viewCount: 0,
    lastViewTime: Date.now()
  })

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return 'Haberler'
      case 'matches': return 'Maçlar'
      case 'highlights': return 'Öne Çıkanlar'
      case 'fanStories': return 'Fan Hikayeleri'
      default: return type
    }
  }

  useEffect(() => {
    setCardMetrics(prev => ({
      viewCount: prev.viewCount + 1,
      lastViewTime: Date.now()
    }))
  }, [analytics])

  return (
    <GlassCard className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{getTypeLabel(type)}</h3>
        <span className="text-sm text-fb-gold-500 bg-fb-gold-500/10 px-2 py-1 rounded-full">
          {type}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <Eye className="text-blue-500 mb-1" size={20} />
          <span className="text-2xl font-bold">{data.views}</span>
          <span className="text-xs text-gray-400">Görüntülenme</span>
        </div>
        <div className="flex flex-col items-center">
          <ThumbsUp className="text-green-500 mb-1" size={20} />
          <span className="text-2xl font-bold">{data.likes}</span>
          <span className="text-xs text-gray-400">Beğeni</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="text-yellow-500 mb-1" size={20} />
          <span className="text-2xl font-bold">{data.shares}</span>
          <span className="text-xs text-gray-400">Paylaşım</span>
        </div>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 text-xs text-gray-500">
          <p>Görüntüleme Sayısı: {cardMetrics.viewCount}</p>
          <p>Son Görüntüleme: {new Date(cardMetrics.lastViewTime).toLocaleTimeString()}</p>
        </div>
      )}
    </GlassCard>
  )
}