import { renderHook, act } from '@testing-library/react'
import { useAIContent } from '@/features/ai-content/hooks/useAIContent'
import { aiContentService } from '@/services/aiContentService'
import { useAppStore } from '@/store/useAppStore'
import { useNotification } from '@/hooks/useNotification'

// Mock dependencies
vi.mock('@/services/aiContentService')
vi.mock('@/store/useAppStore')
vi.mock('@/hooks/useNotification')

const mockGenerateContent = vi.fn()
const mockClearAIContent = vi.fn()
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
    clearAIContent: mockClearAIContent,
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

describe('useAIContent', () => {
  it('should fetch news content successfully', async () => {
    const mockNews = [
      { title: 'Haber 1' },
      { title: 'Haber 2' },
      { title: 'Haber 3' }
    ]
    vi.mocked(aiContentService.generateNews).mockResolvedValue({ data: mockNews })

    const { result } = renderHook(() => useAIContent())

    await act(async () => {
      await result.current.fetchContent('news')
    })

    expect(mockGenerateContent).toHaveBeenCalledWith('news', ['Haber 1', 'Haber 2', 'Haber 3'])
    expect(result.current.news).toEqual(['Haber 1', 'Haber 2', 'Haber 3'])
    expect(result.current.isLoading).toBe(false)
  })

  it('should handle fetch content error', async () => {
    const mockError = new Error('API error')
    vi.mocked(aiContentService.generateNews).mockRejectedValue(mockError)
    vi.mocked(aiContentService.getErrorMessage).mockReturnValue('İçerik yüklenemedi')

    const { result } = renderHook(() => useAIContent())

    await act(async () => {
      await result.current.fetchContent('news')
    })

    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'İçerik Yükleme Hatası',
      message: 'İçerik yüklenemedi',
      type: 'error'
    })
    expect(result.current.error).toBe('İçerik yüklenemedi')
  })

  it('should clear content', () => {
    const { result } = renderHook(() => useAIContent())

    act(() => {
      result.current.clearContent()
    })

    expect(mockClearAIContent).toHaveBeenCalled()
    expect(result.current.news).toEqual([])
    expect(result.current.matches).toEqual([])
    expect(result.current.highlights).toEqual([])
    expect(result.current.fanStories).toEqual([])
  })
})
