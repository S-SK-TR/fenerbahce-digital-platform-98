import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'
import { useNotification } from '../src/hooks/useNotification'
import { aiContentService } from '../src/services/aiContentService'

// Mock dependencies
vi.mock('../src/hooks/useNotification')
vi.mock('../src/services/aiContentService')

describe('App Component', () => {
  const mockShowNotification = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useNotification.mockReturnValue({
      showNotification: mockShowNotification
    })
    aiContentService.checkForNewContent.mockResolvedValue(null)
  })

  it('renders AppShell and AppRoutes components', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    // Check if AppShell is rendered
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument()
    expect(screen.getByText('Haberler')).toBeInTheDocument()
    expect(screen.getByText('Fikstür')).toBeInTheDocument()
  })

  it('sets up AI content notification listener', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    // Check if the effect is set up
    expect(aiContentService.checkForNewContent).toHaveBeenCalled()
  })

  it('shows notifications when new AI content is available', async () => {
    const mockContent = [
      {
        id: '1',
        title: 'Yeni Haber',
        description: 'Fenerbahçe yeni haber yayınladı',
        type: 'news',
        link: '/news/1'
      }
    ]

    aiContentService.checkForNewContent.mockResolvedValue(mockContent)

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    // Wait for the effect to complete
    await vi.waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'Yeni Haber',
        body: 'Fenerbahçe yeni haber yayınladı',
        contentType: 'news',
        link: '/news/1',
        tag: 'ai-content-1'
      })
    })
  })

  it('handles AI content check errors gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    aiContentService.checkForNewContent.mockRejectedValue(new Error('Network error'))

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    // Wait for the effect to complete
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('AI içerik kontrol hatası:', expect.any(Error))
    })

    consoleErrorSpy.mockRestore()
  })
})
