import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorPage } from '@/components/ui/ErrorPage'
import { describe, it, expect, vi } from 'vitest'

// Mock child components
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} data-testid="reload-button">
      {children}
    </button>
  )
}))

vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-card">{children}</div>
  )
}))

vi.mock('lucide-react', () => ({
  AlertTriangle: () => <div data-testid="alert-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />
}))

describe('ErrorPage Component', () => {
  it('renders with default error message', () => {
    render(<ErrorPage />)
    expect(screen.getByText('Bir Hata Oluştu')).toBeInTheDocument()
    expect(screen.getByText(/Beklenmedik bir hata meydana geldi/i)).toBeInTheDocument()
  })

  it('displays custom error message', () => {
    const customError = new Error('Custom error message')
    render(<ErrorPage error={customError} />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('calls reload function when button is clicked', () => {
    const originalReload = window.location.reload
    const mockReload = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    })

    render(<ErrorPage />)
    fireEvent.click(screen.getByTestId('reload-button'))
    expect(mockReload).toHaveBeenCalled()

    // Restore original reload function
    Object.defineProperty(window, 'location', {
      value: { reload: originalReload },
      writable: true
    })
  })

  it('renders all visual elements', () => {
    render(<ErrorPage />)
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument()
  })
})
