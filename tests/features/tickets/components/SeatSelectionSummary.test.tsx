import { render, screen } from '@testing-library/react'
import { SeatSelectionSummary } from '@/features/tickets/components/SeatSelectionSummary'
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
    selectedSeats: [
      { id: '1', section: 'VIP', row: 'A', number: '1', price: 100 },
      { id: '2', section: 'VIP', row: 'A', number: '2', price: 100 }
    ],
    removeFromCart: vi.fn()
  })
}))

describe('SeatSelectionSummary Component', () => {
  it('renders selected seats information', () => {
    render(<SeatSelectionSummary />)
    expect(screen.getByText('Seçili Koltuklar')).toBeInTheDocument()
    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.getByText('A2')).toBeInTheDocument()
    expect(screen.getByText('Toplam: 200 TL')).toBeInTheDocument()
  })

  it('renders GlassCard', () => {
    render(<SeatSelectionSummary />)
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })

  it('renders Button with correct text', () => {
    render(<SeatSelectionSummary />)
    expect(screen.getByText('Ödemeye Geç')).toBeInTheDocument()
  })

  it('calls removeFromCart when remove button is clicked', () => {
    const mockRemoveFromCart = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        selectedSeats: [
          { id: '1', section: 'VIP', row: 'A', number: '1', price: 100 }
        ],
        removeFromCart: mockRemoveFromCart
      })
    }))

    render(<SeatSelectionSummary />)
    const removeButton = screen.getByLabelText('Koltuğu kaldır')
    removeButton.click()
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1')
  })
})