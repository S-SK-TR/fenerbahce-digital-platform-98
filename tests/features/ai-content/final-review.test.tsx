import { renderHook, act } from '@testing-library/react'
import { useAIContent } from '@/features/ai-content/hooks/useAIContent'
import { useFeedback } from '@/features/ai-content/hooks/useFeedback'
import { aiContentService } from '@/services/aiContentService'
import { useAppStore } from '@/store/useAppStore'
import { useNotification } from '@/hooks/useNotification'

// Mock dependencies
vi.mock('@/services/aiContentService')
vi.mock('@/store/useAppStore')
vi.mock('@/hooks/useNotification')

const mockGenerateContent = vi.fn()
const mockSetUserPreferences = vi.fn()
const mockShowNotification = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()

  // Mock store
  vi.mocked(useAppStore).mockReturnValue({
    aiContent: {
      news: [],
      matches: [],
      highlights: [],
      fanStories: []
    },
    generateContent: mockGenerateContent,
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

describe('AI Content Final Review', () => {
  it('should fetch and display AI-generated content', async () => {
    const mockContent = {
      news: [{ id: '1', title: 'Test News' }],
      matches: [{ id: '1', title: 'Test Match' }],
      highlights: [{ id: '1', title: 'Test Highlight' }],
      fanStories: [{ id: '1', title: 'Test Fan Story' }]
    }

    vi.mocked(aiContentService.generateNews).mockResolvedValue({ data: mockContent.news })
    vi.mocked(aiContentService.generateMatches).mockResolvedValue({ data: mockContent.matches })
    vi.mocked(aiContentService.generateHighlights).mockResolvedValue({ data: mockContent.highlights })
    vi.mocked(aiContentService.generateFanStories).mockResolvedValue({ data: mockContent.fanStories })

    const { result } = renderHook(() => useAIContent())

    // Fetch all content types
    await act(async () => {
      await result.current.fetchContent('news')
      await result.current.fetchContent('matches')
      await result.current.fetchContent('highlights')
      await result.current.fetchContent('fanStories')
    })

    // Verify content is stored in Zustand store
    expect(mockGenerateContent).toHaveBeenCalledWith('news', mockContent.news)
    expect(mockGenerateContent).toHaveBeenCalledWith('matches', mockContent.matches)
    expect(mockGenerateContent).toHaveBeenCalledWith('highlights', mockContent.highlights)
    expect(mockGenerateContent).toHaveBeenCalledWith('fanStories', mockContent.fanStories)

    // Verify content is available in hook
    expect(result.current.news).toEqual(mockContent.news)
    expect(result.current.matches).toEqual(mockContent.matches)
    expect(result.current.highlights).toEqual(mockContent.highlights)
    expect(result.current.fanStories).toEqual(mockContent.fanStories)
  })

  it('should handle feedback submission and update preferences', async () => {
    const mockFeedback = {
      contentId: '1',
      contentType: 'news',
      feedbackType: 'like'
    }

    vi.mocked(aiContentService.submitFeedback).mockResolvedValue({ data: { success: true } })

    const { result } = renderHook(() => useFeedback())

    await act(async () => {
      await result.current.submitFeedback(mockFeedback.contentId, mockFeedback.contentType, mockFeedback.feedbackType)
    })

    // Verify notification was shown
    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'Geri Bildirim Gönderildi',
      message: 'Teşekkürler! Geri bildiriminiz kaydedildi.',
      type: 'success'
    })

    // Verify preferences were updated
    expect(mockSetUserPreferences).toHaveBeenCalledWith({
      contentTypes: [mockFeedback.contentType],
      feedbackTypes: [mockFeedback.feedbackType]
    })
  })

  it('should handle errors during content fetching', async () => {
    const mockError = new Error('API error')
    vi.mocked(aiContentService.generateNews).mockRejectedValue(mockError)
    vi.mocked(aiContentService.getErrorMessage).mockReturnValue('İçerik yüklenemedi')

    const { result } = renderHook(() => useAIContent())

    await act(async () => {
      await result.current.fetchContent('news')
    })

    // Verify error notification was shown
    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'İçerik Yükleme Hatası',
      message: 'İçerik yüklenemedi',
      type: 'error'
    })

    // Verify error state is set
    expect(result.current.error).toBe('İçerik yüklenemedi')
  })

  it('should handle errors during feedback submission', async () => {
    const mockError = new Error('API error')
    vi.mocked(aiContentService.submitFeedback).mockRejectedValue(mockError)
    vi.mocked(aiContentService.getErrorMessage).mockReturnValue('Geri bildirim gönderilemedi')

    const { result } = renderHook(() => useFeedback())

    await act(async () => {
      await result.current.submitFeedback('1', 'news', 'like')
    })

    // Verify error notification was shown
    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'Geri Bildirim Hatası',
      message: 'Geri bildirim gönderilemedi',
      type: 'error'
    })
  })

  it('should clear all AI content', () => {
    const mockClearAIContent = vi.fn()
    vi.mocked(useAppStore).mockReturnValue({
      ...vi.mocked(useAppStore).mock.results[0].value,
      clearAIContent: mockClearAIContent
    })

    const { result } = renderHook(() => useAIContent())

    act(() => {
      result.current.clearContent()
    })

    // Verify Zustand store was cleared
    expect(mockClearAIContent).toHaveBeenCalled()

    // Verify hook state was reset
    expect(result.current.news).toEqual([])
    expect(result.current.matches).toEqual([])
    expect(result.current.highlights).toEqual([])
    expect(result.current.fanStories).toEqual([])
  })
})
