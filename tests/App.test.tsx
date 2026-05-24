import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'
import { useNotification } from '@/hooks/useNotification'
import { aiContentService } from '@/services/aiContentService'

// Mock dependencies
vi.mock('@/hooks/useNotification')
vi.mock('@/services/aiContentService')

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  }
})

describe('App Component', () => {
  const mockShowNotification = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useNotification.mockReturnValue({ showNotification: mockShowNotification })
    aiContentService.checkForNewContent.mockResolvedValue(null)
  })

  it('renders AppShell and AppRoutes', () => {
    render(<App />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('checks for new AI content on mount', () => {
    render(<App />)
    expect(aiContentService.checkForNewContent).toHaveBeenCalled()
  })

  it('shows notifications when new AI content is available', async () => {
    const mockContent = [
      {
        id: '1',
        title: 'Test Content',
        description: 'Test Description',
        type: 'news',
        link: '/news'
      }
    ]
    aiContentService.checkForNewContent.mockResolvedValue(mockContent)

    render(<App />)
    await vi.waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'Test Content',
        body: 'Test Description',
        contentType: 'news',
        link: '/news',
        tag: 'ai-content-1'
      })
    })
  })

  it('handles AI content check errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    aiContentService.checkForNewContent.mockRejectedValue(new Error('Test error'))

    render(<App />)
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('AI içerik kontrol hatası:', expect.any(Error))
    })

    consoleErrorSpy.mockRestore()
  })
})
