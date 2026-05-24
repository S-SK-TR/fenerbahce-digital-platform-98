import { useState } from 'react'
import { aiContentService } from '@/services/aiContentService'
import { FeedbackType } from '../types'

interface FeedbackMetrics {
  submissionCount: number;
  successRate: number;
  errorCount: number;
  lastSubmissionTime: number | null;
}

export function useFeedback() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metrics, setMetrics] = useState<FeedbackMetrics>({
    submissionCount: 0,
    successRate: 100,
    errorCount: 0,
    lastSubmissionTime: null
  })

  const submitFeedback = async (
    contentId: string,
    contentType: 'news' | 'match' | 'highlight',
    feedbackType: FeedbackType
  ) => {
    setIsLoading(true)
    setError(null)
    const startTime = Date.now()

    try {
      await aiContentService.submitFeedback(contentId, contentType, feedbackType)
      // Başarılı gönderim metriklerini güncelle
      setMetrics(prev => ({
        submissionCount: prev.submissionCount + 1,
        successRate: ((prev.submissionCount - prev.errorCount + 1) / (prev.submissionCount + 1)) * 100,
        errorCount: prev.errorCount,
        lastSubmissionTime: startTime
      }))
    } catch (err) {
      setError('Geri bildirim gönderilemedi')
      // Hata metriklerini güncelle
      setMetrics(prev => ({
        submissionCount: prev.submissionCount + 1,
        successRate: ((prev.submissionCount - prev.errorCount) / (prev.submissionCount + 1)) * 100,
        errorCount: prev.errorCount + 1,
        lastSubmissionTime: startTime
      }))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { submitFeedback, isLoading, error, metrics }
}

export const __testExports = {
  submitFeedback,
  FeedbackMetrics
}