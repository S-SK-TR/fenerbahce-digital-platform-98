import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GlassCard } from '@/components/ui/GlassCard'
import { useTilt } from '@/hooks/useTilt'

// Mock dependencies
vi.mock('@/hooks/useTilt', () => ({
  useTilt: vi.fn()
}))

vi.mock('@/components/ui/SkeletonLoader', () => ({
  SkeletonLoader: () => <div data-testid="skeleton-loader">Loading...</div>
}))

describe('GlassCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useTilt.mockReturnValue({ ref: vi.fn(), style: {} })
  })

  it('renders children correctly', () => {
    render(<GlassCard>Test Content</GlassCard>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies glass card styles', () => {
    const { container } = render(<GlassCard>Test</GlassCard>)
    const card = container.firstChild
    expect(card).toHaveClass('glass-card')
    expect(card).toHaveClass('bg-[var(--bg-surface)]/50')
    expect(card).toHaveClass('backdrop-blur-xl')
  })

  it('applies tilt effect when tilt prop is true', () => {
    render(<GlassCard tilt={true}>Test</GlassCard>)
    expect(useTilt).toHaveBeenCalledWith({ maxTilt: 10, scale: 1.02 })
  })

  it('does not apply tilt effect when tilt prop is false', () => {
    render(<GlassCard tilt={false}>Test</GlassCard>)
    expect(useTilt).not.toHaveBeenCalled()
  })

  it('shows skeleton loader when isLoading is true', () => {
    render(<GlassCard isLoading={true}>Test</GlassCard>)
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    const { container } = render(<GlassCard className="custom-class">Test</GlassCard>)
    const card = container.firstChild
    expect(card).toHaveClass('custom-class')
  })
})
