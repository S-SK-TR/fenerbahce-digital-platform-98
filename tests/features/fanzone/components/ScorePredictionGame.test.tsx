import { render, screen, fireEvent } from '@testing-library/react'
import { ScorePredictionGame } from '@/features/fanzone/components/ScorePredictionGame'
import { describe, it, expect, vi } from 'vitest'

// Mock components
vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-card">{children}</div>
  )
}))

vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

vi.mock('@/store/useAppStore', () => ({
  useAppStore: () => ({
    predictions: [],
    addPrediction: vi.fn()
  })
}))

describe('ScorePredictionGame Component', () => {
  const props = {
    match: {
      id: '1',
      homeTeam: 'Fenerbahçe',
      awayTeam: 'Galatasaray',
      date: '2023-12-25'
    }
  }

  it('renders match information correctly', () => {
    render(<ScorePredictionGame {...props} />)
    expect(screen.getByText('Fenerbahçe')).toBeInTheDocument()
    expect(screen.getByText('Galatasaray')).toBeInTheDocument()
    expect(screen.getByText('2023-12-25')).toBeInTheDocument()
  })

  it('allows score prediction input', () => {
    render(<ScorePredictionGame {...props} />)
    const homeScoreInput = screen.getByLabelText('Fenerbahçe Skor')
    const awayScoreInput = screen.getByLabelText('Galatasaray Skor')

    fireEvent.change(homeScoreInput, { target: { value: '2' } })
    fireEvent.change(awayScoreInput, { target: { value: '1' } })

    expect(homeScoreInput).toHaveValue(2)
    expect(awayScoreInput).toHaveValue(1)
  })

  it('calls addPrediction when submit button is clicked', () => {
    const mockAddPrediction = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        predictions: [],
        addPrediction: mockAddPrediction
      })
    }))

    render(<ScorePredictionGame {...props} />)
    const homeScoreInput = screen.getByLabelText('Fenerbahçe Skor')
    const awayScoreInput = screen.getByLabelText('Galatasaray Skor')
    const submitButton = screen.getByText('Tahmini Gönder')

    fireEvent.change(homeScoreInput, { target: { value: '2' } })
    fireEvent.change(awayScoreInput, { target: { value: '1' } })
    fireEvent.click(submitButton)

    expect(mockAddPrediction).toHaveBeenCalledWith({
      matchId: '1',
      homeScore: 2,
      awayScore: 1
    })
  })

  it('shows success message after prediction', () => {
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        predictions: [{
          matchId: '1',
          homeScore: 2,
          awayScore: 1
        }],
        addPrediction: vi.fn()
      })
    }))

    render(<ScorePredictionGame {...props} />)
    expect(screen.getByText('Tahmininiz kaydedildi!')).toBeInTheDocument()
  })
})