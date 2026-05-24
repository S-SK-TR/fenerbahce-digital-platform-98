import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorPage } from '@/components/ui/ErrorPage'

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

describe('ErrorPage Component', () => {
  it('renders with default error message', () => {
    render(<ErrorPage />)
    expect(screen.getByText(/beklenmedik bir hata meydana geldi/i)).toBeInTheDocument()
  })

  it('renders with custom error message', () => {
    const error = new Error('Custom error message')
    render(<ErrorPage error={error} />)
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('handles reload button click', async () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {})
    render(<ErrorPage />)
    const reloadButton = screen.getByTestId('reload-button')
    await fireEvent.click(reloadButton)
    expect(reloadSpy).toHaveBeenCalled()
    reloadSpy.mockRestore()
  })
})
