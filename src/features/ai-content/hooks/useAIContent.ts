import { useState, useCallback, useEffect } from 'react'
import { aiContentService } from '@/services/aiContentService'
import { FeedbackType, FeedbackData } from '../types'
import { useAppStore } from '@/store/useAppStore'
import { useNotification } from '@/hooks/useNotification'

interface AIContentState {
  news: string[]
  matches: string[]
  highlights: string[]
  fanStories: string[]
  isLoading: boolean
  error: string | null
  performanceMetrics: {
    loadTimes: Record<string, number>;
    errorRates: Record<string, number>;
    userEngagement: Record<string, number>;
  };
}

export function useAIContent() {
  const { aiContent, generateContent, clearAIContent, setUserPreferences } = useAppStore()
  const { showNotification } = useNotification()

  const [state, setState] = useState<AIContentState>({ ...aiContent, isLoading: false, error: null, performanceMetrics: {
    loadTimes: {},
    errorRates: {},
    userEngagement: {}
  } })

  // Performans metriklerini izlemek için zamanlayıcı ekle
  const trackPerformance = useCallback((type: string, startTime: number, success: boolean) => {
    const loadTime = Date.now() - startTime
    setState(prev => ({
      ...prev,
      performanceMetrics: {
        loadTimes: { ...prev.performanceMetrics.loadTimes, [type]: loadTime },
        errorRates: {
          ...prev.performanceMetrics.errorRates,
          [type]: success ? 0 : (prev.performanceMetrics.errorRates[type] || 0) + 1
        },
        userEngagement: {
          ...prev.performanceMetrics.userEngagement,
          [type]: (prev.performanceMetrics.userEngagement[type] || 0) + 1
        }
      }
    }))
  }, [])

  const fetchContent = useCallback(async (type: keyof typeof aiContent) => {
    const startTime = Date.now()
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      let content: string[] = []
      switch (type) {
        case 'news':
          const newsResponse = await aiContentService.generateNews(3)
          content = newsResponse.data.map(item => item.title)
          break
        case 'matches':
          const matchesResponse = await aiContentService.generateMatches(3)
          content = matchesResponse.data.map(item => `${item.homeTeam} vs ${item.awayTeam}`)
          break
        case 'highlights':
          const highlightsResponse = await aiContentService.generateHighlights(3)
          content = highlightsResponse.data.map(item => item.title)
          break
        case 'fanStories':
          // Fan hikayeleri için özel servis çağrısı
          content = ['Fan hikayesi 1', 'Fan hikayesi 2', 'Fan hikayesi 3']
          break
      }
      generateContent(type, content)
      setState(prev => ({ ...prev, [type]: content, isLoading: false }))
      trackPerformance(type, startTime, true)
    } catch (error) {
      const errorType = aiContentService.getErrorType(error)
      const errorMessage = aiContentService.getErrorMessage(error)
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }))
      showNotification({
        title: 'İçerik Yükleme Hatası',
        message: errorMessage,
        type: 'error'
      })
      trackPerformance(type, startTime, false)
    }
  }, [generateContent, showNotification, trackPerformance])

  const submitFeedback = useCallback(async (feedbackData: FeedbackData) => {
    try {
      const response = await aiContentService.submitFeedback(
        feedbackData.contentId,
        feedbackData.contentType,
        feedbackData.feedbackType
      )
      if (response.data.success) {
        showNotification({
          title: 'Geri Bildirim Gönderildi',
          message: 'Teşekkürler! Geri bildiriminiz kaydedildi.',
          type: 'success'
        })
        // Kullanıcı tercihlerini güncelle
        setUserPreferences({
          contentTypes: [...new Set([
            ...useAppStore.getState().userPreferences.contentTypes,
            feedbackData.contentType
          ])],
          feedbackTypes: [...new Set([
            ...useAppStore.getState().userPreferences.feedbackTypes,
            feedbackData.feedbackType
          ])]
        })
      }
    } catch (error) {
      const errorMessage = aiContentService.getErrorMessage(error)
      showNotification({
        title: 'Geri Bildirim Hatası',
        message: errorMessage,
        type: 'error'
      })
    }
  }, [showNotification, setUserPreferences])

  const clearContent = useCallback(() => {
    clearAIContent()
    setState(prev => ({ ...prev, news: [], matches: [], highlights: [], fanStories: [] }))
  }, [clearAIContent])

  // Sistem performansını izlemek için periyodik raporlama
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('AI Content Performance Metrics:', state.performanceMetrics)
      // Burada metrikleri bir analytics servisine gönderilebilir
    }, 60000) // Her dakika bir raporla

    return () => clearInterval(interval)
  }, [state.performanceMetrics])

  return {
    ...state,
    fetchContent,
    submitFeedback,
    clearContent,
    performanceMetrics: state.performanceMetrics
  }
}

export const __testExports = {
  AIContentState,
  fetchContent,
  submitFeedback,
  clearContent,
  trackPerformance
}