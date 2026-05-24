import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorPage } from '@/components/ui/ErrorPage'

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

// Mock the GlassCard component
vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-card">{children}</div>
  )
}))

describe('ErrorPage Component', () => {
  it('renders with default error message', () => {
    render(<ErrorPage />)
    expect(screen.getByText('Bir Hata Oluştu')).toBeInTheDocument()
    expect(screen.getByText('Beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenileyin.')).toBeInTheDocument()
  })

  it('renders with custom error message', () => {
    const customError = new Error('Custom error message')
    render(<ErrorPage error={customError} />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('calls window.location.reload when button is clicked', () => {
    // Mock window.location.reload
    const originalReload = window.location.reload
    const mockReload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    })

    render(<ErrorPage />)
    fireEvent.click(screen.getByText('Sayfayı Yenile'))

    expect(mockReload).toHaveBeenCalled()

    // Restore original window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: originalReload },
      writable: true
    })
  })
})
