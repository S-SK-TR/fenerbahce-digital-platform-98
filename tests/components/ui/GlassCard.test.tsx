import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { GlassCard } from '@/components/ui/GlassCard'

// Mock dependencies
vi.mock('@/hooks/useTilt', () => ({
  useTilt: () => ({
    ref: { current: null },
    style: {}
  })
}))

vi.mock('@/components/ui/SkeletonLoader', () => ({
  SkeletonLoader: () => <div data-testid="skeleton-loader"></div>
}))

describe('GlassCard Component', () => {
  it('renders children correctly', () => {
    render(
      <GlassCard>
        <div>Test Content</div>
      </GlassCard>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    render(
      <GlassCard className="custom-class">
        <div>Test Content</div>
      </GlassCard>
    )
    expect(screen.getByTestId('glass-card')).toHaveClass('custom-class')
  })

  it('renders in loading state', () => {
    render(
      <GlassCard isLoading>
        <div>Test Content</div>
      </GlassCard>
    )
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('applies tilt effect when tilt prop is true', () => {
    const useTiltMock = vi.fn().mockReturnValue({
      ref: { current: null },
      style: { transform: 'rotateX(5deg) rotateY(5deg)' }
    })
    vi.mock('@/hooks/useTilt', () => ({ useTilt: useTiltMock }))

    render(
      <GlassCard tilt>
        <div>Test Content</div>
      </GlassCard>
    )
    expect(useTiltMock).toHaveBeenCalledWith({ maxTilt: 10, scale: 1.02 })
  })

  it('does not apply tilt effect when tilt prop is false', () => {
    const useTiltMock = vi.fn()
    vi.mock('@/hooks/useTilt', () => ({ useTilt: useTiltMock }))

    render(
      <GlassCard tilt={false}>
        <div>Test Content</div>
      </GlassCard>
    )
    expect(useTiltMock).not.toHaveBeenCalled()
  })
})
