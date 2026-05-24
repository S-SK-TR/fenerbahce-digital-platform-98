import { render, screen } from '@testing-library/react'
import { GlassCard } from '@/components/ui/GlassCard'
import { describe, it, expect, vi } from 'vitest'

// Mock useTilt hook
vi.mock('@/hooks/useTilt', () => ({
  useTilt: () => ({
    ref: { current: null },
    style: { transform: 'none' }
  })
}))

describe('GlassCard Component', () => {
  it('renders children', () => {
    render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies glass card classes', () => {
    const { container } = render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>
    )
    const card = container.firstChild
    expect(card).toHaveClass('glass-card')
    expect(card).toHaveClass('backdrop-blur-xl')
    expect(card).toHaveClass('rounded-2xl')
  })

  it('applies custom className', () => {
    const { container } = render(
      <GlassCard className="custom-class">
        <div>Test Content</div>
      </GlassCard>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
