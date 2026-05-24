import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useFeedback } from '../hooks/useFeedback'
import { FeedbackType } from '../types'

interface FeedbackButtonsProps {
  contentId: string
  contentType: 'news' | 'match' | 'highlight'
  className?: string
}

export function FeedbackButtons({ contentId, contentType, className }: FeedbackButtonsProps) {
  const { submitFeedback, isLoading, error, metrics } = useFeedback()

  const handleFeedback = async (type: FeedbackType) => {
    try {
      await submitFeedback(contentId, contentType, type)
    } catch (err) {
      console.error('Feedback gönderme hatası:', err)
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback('like')}
        disabled={isLoading}
        className="p-1.5"
      >
        <ThumbsUp size={16} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback('dislike')}
        disabled={isLoading}
        className="p-1.5"
      >
        <ThumbsDown size={16} />
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
      {/* Metrikleri görüntüleme seçeneği */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500">
          <p>Gönderimler: {metrics.submissionCount}</p>
          <p>Başarı Oranı: {metrics.successRate.toFixed(1)}%</p>
        </div>
      )}
    </div>
  )
}