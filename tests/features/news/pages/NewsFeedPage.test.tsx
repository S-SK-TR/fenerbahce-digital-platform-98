import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewsFeedPage from '@/features/news/pages/NewsFeedPage'

describe('NewsFeedPage', () => {
  it('renders without crashing', () => {
    render(<NewsFeedPage />)
    expect(screen.getByText('Fenerbahçe TV')).toBeInTheDocument()
  })

  it('displays news items', () => {
    render(<NewsFeedPage />)
    expect(screen.getByText('Fenerbahçe, Şampiyonlar Ligi gruplarını açtı')).toBeInTheDocument()
    expect(screen.getByText('Yeni transfer haberleri')).toBeInTheDocument()
  })

  it('has working TV controls', () => {
    render(<NewsFeedPage />)
    expect(screen.getByLabelText('Duraklat')).toBeInTheDocument()
    expect(screen.getByLabelText('Sesi Kapat')).toBeInTheDocument()
  })
})