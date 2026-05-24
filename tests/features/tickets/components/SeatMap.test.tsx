import { render, screen } from '@testing-library/react'
import { SeatMap } from '@/features/tickets/components/SeatMap'
import { describe, it, expect, vi } from 'vitest'

// Mock components
vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-card">{children}</div>
  )
}))

vi.mock('@/store/useAppStore', () => ({
  useAppStore: () => ({
    selectedSeats: [],
    setSelectedSeats: vi.fn()
  })
}))

describe('SeatMap Component', () => {
  const mockSeats = [
    { id: '1', section: 'VIP', row: 'A', number: '1', status: 'available' },
    { id: '2', section: 'VIP', row: 'A', number: '2', status: 'available' },
    { id: '3', section: 'VIP', row: 'A', number: '3', status: 'unavailable' }
  ]

  it('renders all seats correctly', () => {
    render(<SeatMap seats={mockSeats} />)
    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.getByText('A2')).toBeInTheDocument()
    expect(screen.getByText('A3')).toBeInTheDocument()
  })

  it('disables unavailable seats', () => {
    render(<SeatMap seats={mockSeats} />)
    const unavailableSeat = screen.getByText('A3')
    expect(unavailableSeat).toBeDisabled()
  })

  it('calls setSelectedSeats when a seat is clicked', () => {
    const mockSetSelectedSeats = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        selectedSeats: [],
        setSelectedSeats: mockSetSelectedSeats
      })
    }))

    render(<SeatMap seats={mockSeats} />)
    const seatButton = screen.getByText('A1')
    seatButton.click()
    expect(mockSetSelectedSeats).toHaveBeenCalledWith(['1'])
  })

  it('shows selected seats with different style', () => {
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        selectedSeats: ['1'],
        setSelectedSeats: vi.fn()
      })
    }))

    render(<SeatMap seats={mockSeats} />)
    const selectedSeat = screen.getByText('A1')
    expect(selectedSeat).toHaveClass('bg-blue-500')
  })
})