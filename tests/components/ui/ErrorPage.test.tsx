import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorPage } from '../../../src/components/ui/ErrorPage'

// Mock the Button and GlassCard components
vi.mock('../../../src/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

vi.mock('../../../src/components/ui/GlassCard', () => ({
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

  it('displays custom error message when provided', () => {
    const customError = new Error('Custom error message')
    render(<ErrorPage error={customError} />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('calls window.location.reload when reload button is clicked', () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {})
    render(<ErrorPage />)
    fireEvent.click(screen.getByText('Sayfayı Yenile'))
    expect(reloadSpy).toHaveBeenCalled()
    reloadSpy.mockRestore()
  })

  it('renders the GlassCard component', () => {
    render(<ErrorPage />)
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })

  it('renders the error icon', () => {
    render(<ErrorPage />)
    const icon = screen.getByTestId('AlertTriangle')
    expect(icon).toBeInTheDocument()
  })
})
