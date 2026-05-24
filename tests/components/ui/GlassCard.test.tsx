import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GlassCard } from '@/components/ui/GlassCard'

// Mock useTilt hook
vi.mock('@/hooks/useTilt', () => ({
  useTilt: () => ({
    ref: { current: null },
    style: {}
  })
}))

describe('GlassCard Component', () => {
  it('renders children', () => {
    render(
      <GlassCard>
        <div>Test content</div>
      </GlassCard>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies glass card classes', () => {
    const { container } = render(
      <GlassCard>
        <div>Test content</div>
      </GlassCard>
    )
    const card = container.firstChild
    expect(card).toHaveClass('glass-card')
    expect(card).toHaveClass('backdrop-blur-xl')
  })

  it('applies additional className', () => {
    const { container } = render(
      <GlassCard className="custom-class">
        <div>Test content</div>
      </GlassCard>
    )
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
