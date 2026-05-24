import { render, screen } from '@testing-library/react'
import { MembershipCard3D } from '@/features/membership/components/MembershipCard3D'
import { describe, it, expect, vi } from 'vitest'

// Mock useTilt hook
vi.mock('@/hooks/useTilt', () => ({
  useTilt: () => ({
    ref: { current: null },
    style: {}
  })
}))

describe('MembershipCard3D Component', () => {
  const props = {
    name: 'Test User',
    cardType: 'gold',
    membershipNumber: '123456',
    expiryDate: '12/25'
  }

  it('renders card information correctly', () => {
    render(<MembershipCard3D {...props} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Gold Üye')).toBeInTheDocument()
    expect(screen.getByText('123456')).toBeInTheDocument()
    expect(screen.getByText('12/25')).toBeInTheDocument()
  })

  it('applies correct card styling based on type', () => {
    const { container } = render(<MembershipCard3D {...props} />)
    const card = container.firstChild
    expect(card).toHaveClass('bg-gradient-to-br')
    expect(card).toHaveClass('from-yellow-500')
    expect(card).toHaveClass('to-yellow-700')
  })

  it('shows different styling for different card types', () => {
    const { container } = render(<MembershipCard3D {...props} cardType="platinum" />)
    const card = container.firstChild
    expect(card).toHaveClass('from-gray-500')
    expect(card).toHaveClass('to-gray-700')
  })
})