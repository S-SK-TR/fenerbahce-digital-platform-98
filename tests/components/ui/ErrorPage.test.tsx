import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorPage } from '@/components/ui/ErrorPage'
import { describe, it, expect, vi } from 'vitest'

// Mock child components
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))

describe('ErrorPage Component', () => {
  it('renders with default error message', () => {
    render(<ErrorPage />)
    expect(screen.getByText(/Bir Hata Oluştu/i)).toBeInTheDocument()
    expect(screen.getByText(/Beklenmedik bir hata meydana geldi/i)).toBeInTheDocument()
  })

  it('renders with custom error message', () => {
    const error = new Error('Custom error message')
    render(<ErrorPage error={error} />)
    expect(screen.getByText(/Custom error message/i)).toBeInTheDocument()
  })

  it('reloads page when button is clicked', () => {
    const reloadMock = vi.fn()
    delete window.location
    window.location = { reload: reloadMock } as any

    render(<ErrorPage />)
    fireEvent.click(screen.getByRole('button', { name: /Sayfayı Yenile/i }))
    expect(reloadMock).toHaveBeenCalled()
  })
})
