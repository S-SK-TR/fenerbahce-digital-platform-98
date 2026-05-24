import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { NewsFeedPage } from '@/features/news/pages/NewsFeedPage'
import { NewsGrid } from '@/features/news/components/NewsGrid'
import { NewsCard } from '@/features/news/components/NewsCard'

vi.mock('@/features/news/components/NewsGrid', () => ({
  NewsGrid: vi.fn(() => <div data-testid="news-grid">Mock News Grid</div>)
}))

vi.mock('@/features/news/components/NewsCard', () => ({
  NewsCard: vi.fn(() => <div data-testid="news-card">Mock News Card</div>)
}))

describe('NewsFeedPage', () => {
  it('renders without crashing', () => {
    render(<NewsFeedPage />)
    expect(screen.getByText('Fenerbahçe TV')).toBeInTheDocument()
  })

  it('renders NewsGrid component', () => {
    render(<NewsFeedPage />)
    expect(screen.getByTestId('news-grid')).toBeInTheDocument()
  })

  it('has working TV controls', () => {
    render(<NewsFeedPage />)
    expect(screen.getByLabelText('Duraklat')).toBeInTheDocument()
    expect(screen.getByLabelText('Sesi Kapat')).toBeInTheDocument()
  })

  it('displays news items through NewsGrid', () => {
    render(<NewsFeedPage />)
    expect(NewsGrid).toHaveBeenCalled()
  })
})
