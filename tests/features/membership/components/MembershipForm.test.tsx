import { render, screen, fireEvent } from '@testing-library/react'
import { MembershipForm } from '@/features/membership/components/MembershipForm'
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
    membershipData: {
      name: '',
      email: '',
      phone: '',
      address: '',
      cardType: 'standard'
    },
    setMembershipData: vi.fn()
  })
}))

describe('MembershipForm Component', () => {
  it('renders form fields correctly', () => {
    render(<MembershipForm />)
    expect(screen.getByLabelText('Ad Soyad')).toBeInTheDocument()
    expect(screen.getByLabelText('E-posta')).toBeInTheDocument()
    expect(screen.getByLabelText('Telefon')).toBeInTheDocument()
    expect(screen.getByLabelText('Adres')).toBeInTheDocument()
    expect(screen.getByLabelText('Üyelik Tipi')).toBeInTheDocument()
  })

  it('updates form data on input change', () => {
    const mockSetMembershipData = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        membershipData: {
          name: '',
          email: '',
          phone: '',
          address: '',
          cardType: 'standard'
        },
        setMembershipData: mockSetMembershipData
      })
    }))

    render(<MembershipForm />)
    const nameInput = screen.getByLabelText('Ad Soyad')
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    expect(mockSetMembershipData).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test User'
    }))
  })

  it('submits form with correct data', () => {
    const mockSubmit = vi.fn()
    render(<MembershipForm onSubmit={mockSubmit} />)
    const nameInput = screen.getByLabelText('Ad Soyad')
    const emailInput = screen.getByLabelText('E-posta')
    const submitButton = screen.getByText('Üyeliği Tamamla')

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      phone: '',
      address: '',
      cardType: 'standard'
    })
  })

  it('shows validation errors for required fields', () => {
    render(<MembershipForm />)
    const submitButton = screen.getByText('Üyeliği Tamamla')
    fireEvent.click(submitButton)

    expect(screen.getByText('Ad Soyad zorunludur')).toBeInTheDocument()
    expect(screen.getByText('E-posta zorunludur')).toBeInTheDocument()
  })
})