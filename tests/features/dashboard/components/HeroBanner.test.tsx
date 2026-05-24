import { render, screen } from '@testing-library/react'
import { HeroBanner } from '@/features/dashboard/components/HeroBanner'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

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
  useStore: () => ({ theme: 'dark' })
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

describe('HeroBanner Component', () => {
  const props = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    ctaText: 'Test CTA',
    ctaLink: '/test'
  }

  it('renders all content correctly', () => {
    render(
      <MemoryRouter>
        <HeroBanner {...props} />
      </MemoryRouter>
    )

    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.subtitle)).toBeInTheDocument()
    expect(screen.getByText(props.ctaText)).toBeInTheDocument()
  })

  it('renders GlassCard', () => {
    render(
      <MemoryRouter>
        <HeroBanner {...props} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })

  it('renders Button with correct text', () => {
    render(
      <MemoryRouter>
        <HeroBanner {...props} />
      </MemoryRouter>
    )
    expect(screen.getByText(props.ctaText)).toBeInTheDocument()
  })
})
