import { renderHook, act } from '@testing-library/react'
import { useFeedback } from '@/features/ai-content/hooks/useFeedback'
import { aiContentService } from '@/services/aiContentService'
import { useAppStore } from '@/store/useAppStore'
import { useNotification } from '@/hooks/useNotification'

// Mock dependencies
vi.mock('@/services/aiContentService')
vi.mock('@/store/useAppStore')
vi.mock('@/hooks/useNotification')

const mockSetUserPreferences = vi.fn()
const mockShowNotification = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()

  // Mock store
  vi.mocked(useAppStore).mockReturnValue({
    setUserPreferences: mockSetUserPreferences,
    userPreferences: {
      contentTypes: [],
      feedbackTypes: []
    }
  })

  // Mock notification
  vi.mocked(useNotification).mockReturnValue({
    showNotification: mockShowNotification
  })
})

describe('useFeedback', () => {
  it('should submit feedback successfully', async () => {
    vi.mocked(aiContentService.submitFeedback).mockResolvedValue({ data: { success: true } })

    const { result } = renderHook(() => useFeedback())

    await act(async () => {
      await result.current.submitFeedback('content1', 'news', 'like')
    })

    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'Geri Bildirim Gönderildi',
      message: 'Teşekkürler! Geri bildiriminiz kaydedildi.',
      type: 'success'
    })
    expect(mockSetUserPreferences).toHaveBeenCalledWith({
      contentTypes: ['news'],
      feedbackTypes: ['like']
    })
  })

  it('should handle feedback submission error', async () => {
    const mockError = new Error('API error')
    vi.mocked(aiContentService.submitFeedback).mockRejectedValue(mockError)
    vi.mocked(aiContentService.getErrorMessage).mockReturnValue('Geri bildirim gönderilemedi')

    const { result } = renderHook(() => useFeedback())

    await act(async () => {
      await result.current.submitFeedback('content1', 'news', 'like')
    })

    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'Geri Bildirim Hatası',
      message: 'Geri bildirim gönderilemedi',
      type: 'error'
    })
  })
})
