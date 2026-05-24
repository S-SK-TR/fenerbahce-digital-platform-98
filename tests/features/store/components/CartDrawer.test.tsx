import { render, screen, fireEvent } from '@testing-library/react'
import { CartDrawer } from '@/features/store/components/CartDrawer'
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
    cartItems: [
      { id: '1', name: 'Ürün 1', price: 100, quantity: 2 },
      { id: '2', name: 'Ürün 2', price: 150, quantity: 1 }
    ],
    updateQuantity: vi.fn(),
    removeFromCart: vi.fn()
  })
}))

describe('CartDrawer Component', () => {
  it('renders cart items correctly', () => {
    render(<CartDrawer isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText('Ürün 1')).toBeInTheDocument()
    expect(screen.getByText('2 × 100 TL')).toBeInTheDocument()
    expect(screen.getByText('Ürün 2')).toBeInTheDocument()
    expect(screen.getByText('1 × 150 TL')).toBeInTheDocument()
  })

  it('calculates total price correctly', () => {
    render(<CartDrawer isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText('Toplam: 350 TL')).toBeInTheDocument()
  })

  it('calls updateQuantity when quantity is changed', () => {
    const mockUpdateQuantity = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        cartItems: [
          { id: '1', name: 'Ürün 1', price: 100, quantity: 2 }
        ],
        updateQuantity: mockUpdateQuantity,
        removeFromCart: vi.fn()
      })
    }))

    render(<CartDrawer isOpen={true} onClose={vi.fn()} />)
    const quantityInput = screen.getByDisplayValue('2')
    fireEvent.change(quantityInput, { target: { value: '3' } })
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3)
  })

  it('calls removeFromCart when remove button is clicked', () => {
    const mockRemoveFromCart = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        cartItems: [
          { id: '1', name: 'Ürün 1', price: 100, quantity: 2 }
        ],
        updateQuantity: vi.fn(),
        removeFromCart: mockRemoveFromCart
      })
    }))

    render(<CartDrawer isOpen={true} onClose={vi.fn()} />)
    const removeButton = screen.getByLabelText('Ürünü kaldır')
    removeButton.click()
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1')
  })

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn()
    render(<CartDrawer isOpen={true} onClose={mockOnClose} />)
    const closeButton = screen.getByLabelText('Sepeti kapat')
    closeButton.click()
    expect(mockOnClose).toHaveBeenCalled()
  })
})