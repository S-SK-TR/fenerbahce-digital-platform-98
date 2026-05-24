import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorPage } from '@/components/ui/ErrorPage'

// Mock dependencies
vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-card">{children}</div>
  )
}))

vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
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

  it('reloads the page when button is clicked', () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {})

    render(<ErrorPage />)
    fireEvent.click(screen.getByText('Sayfayı Yenile'))

    expect(reloadSpy).toHaveBeenCalled()
    reloadSpy.mockRestore()
  })

  it('renders within a GlassCard', () => {
    render(<ErrorPage />)
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })
})
