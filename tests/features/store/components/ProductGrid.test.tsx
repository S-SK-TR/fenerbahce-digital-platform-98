import { render, screen } from '@testing-library/react'
import { ProductGrid } from '@/features/store/components/ProductGrid'
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
    addToCart: vi.fn()
  })
}))

describe('ProductGrid Component', () => {
  const mockProducts = [
    { id: '1', name: 'Ürün 1', price: 100, image: 'image1.jpg' },
    { id: '2', name: 'Ürün 2', price: 150, image: 'image2.jpg' }
  ]

  it('renders all products correctly', () => {
    render(<ProductGrid products={mockProducts} />)
    expect(screen.getByText('Ürün 1')).toBeInTheDocument()
    expect(screen.getByText('100 TL')).toBeInTheDocument()
    expect(screen.getByText('Ürün 2')).toBeInTheDocument()
    expect(screen.getByText('150 TL')).toBeInTheDocument()
  })

  it('renders GlassCard for each product', () => {
    render(<ProductGrid products={mockProducts} />)
    const cards = screen.getAllByTestId('glass-card')
    expect(cards).toHaveLength(2)
  })

  it('calls addToCart when add to cart button is clicked', () => {
    const mockAddToCart = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        addToCart: mockAddToCart
      })
    }))

    render(<ProductGrid products={mockProducts} />)
    const addButtons = screen.getAllByText('Sepete Ekle')
    addButtons[0].click()
    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0])
  })
})