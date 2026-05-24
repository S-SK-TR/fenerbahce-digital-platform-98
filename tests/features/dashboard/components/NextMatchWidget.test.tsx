import { render, screen } from '@testing-library/react'
import { NextMatchWidget } from '@/features/dashboard/components/NextMatchWidget'
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

describe('NextMatchWidget Component', () => {
  const props = {
    team1: 'Fenerbahçe',
    team2: 'Galatasaray',
    date: '2023-12-25',
    time: '20:00',
    location: 'Şükrü Saracoğlu Stadyumu',
    onViewDetails: vi.fn()
  }

  it('renders match information correctly', () => {
    render(<NextMatchWidget {...props} />)

    expect(screen.getByText(props.team1)).toBeInTheDocument()
    expect(screen.getByText(props.team2)).toBeInTheDocument()
    expect(screen.getByText(props.date)).toBeInTheDocument()
    expect(screen.getByText(props.time)).toBeInTheDocument()
    expect(screen.getByText(props.location)).toBeInTheDocument()
  })

  it('renders GlassCard', () => {
    render(<NextMatchWidget {...props} />)
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })

  it('renders Button with correct text', () => {
    render(<NextMatchWidget {...props} />)
    expect(screen.getByText('Detayları Gör')).toBeInTheDocument()
  })

  it('calls onViewDetails when button is clicked', () => {
    render(<NextMatchWidget {...props} />)
    const button = screen.getByText('Detayları Gör')
    button.click()
    expect(props.onViewDetails).toHaveBeenCalled()
  })
})
