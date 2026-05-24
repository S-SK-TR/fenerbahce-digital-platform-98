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
    const { container } = render(<GlassCard>Test</GlassCard>)
    const card = container.firstChild
    expect(card).toHaveClass('glass-card')
    expect(card).toHaveClass('bg-[var(--bg-surface)]/50')
    expect(card).toHaveClass('backdrop-blur-xl')
  })

  it('applies additional className', () => {
    const { container } = render(
      <GlassCard className="custom-class">Test</GlassCard>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies tilt effect when tilt prop is true', () => {
    const mockUseTilt = vi.fn().mockReturnValue({
      ref: { current: null },
      style: { transform: 'rotateX(5deg) rotateY(5deg)' }
    })
    vi.mock('@/hooks/useTilt', () => ({ useTilt: mockUseTilt }))

    render(<GlassCard tilt={true}>Test</GlassCard>)
    expect(mockUseTilt).toHaveBeenCalledWith({ maxTilt: 10, scale: 1.02 })
  })

  it('does not apply tilt effect when tilt prop is false', () => {
    const mockUseTilt = vi.fn()
    vi.mock('@/hooks/useTilt', () => ({ useTilt: mockUseTilt }))

    render(<GlassCard tilt={false}>Test</GlassCard>)
    expect(mockUseTilt).not.toHaveBeenCalled()
  })
})
