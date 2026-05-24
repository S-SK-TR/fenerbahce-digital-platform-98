import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GlassCard } from '@/components/ui/GlassCard'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    )
  }
}))

// Mock useTilt hook
vi.mock('@/hooks/useTilt', () => ({
  useTilt: () => ({
    ref: { current: null },
    style: {}
  })
}))

describe('GlassCard Component', () => {
  it('renders children correctly', () => {
    render(
      <GlassCard>
        <div data-testid="test-child">Test Content</div>
      </GlassCard>
    )
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })

  it('applies glass card classes', () => {
    const { container } = render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>
    )
    const card = container.firstChild
    expect(card).toHaveClass('glass-card')
    expect(card).toHaveClass('bg-[var(--bg-surface)]/50')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-[var(--border)]/30')
    expect(card).toHaveClass('rounded-2xl')
    expect(card).toHaveClass('backdrop-blur-xl')
    expect(card).toHaveClass('shadow-lg')
    expect(card).toHaveClass('shadow-[var(--border)]/10')
  })

  it('applies additional className', () => {
    const { container } = render(
      <GlassCard className="custom-class">
        <div>Test Content</div>
      </GlassCard>
    )
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    const { container } = render(
      <GlassCard data-testid="custom-prop">
        <div>Test Content</div>
      </GlassCard>
    )
    expect(container.firstChild).toHaveAttribute('data-testid', 'custom-prop')
  })
})
