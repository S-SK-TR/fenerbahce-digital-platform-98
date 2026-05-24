import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppRoutes } from '@/core/routes/AppRoutes'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

// Mock all page components
vi.mock('@/features/dashboard/pages/DashboardPage', () => ({
  DashboardPage: () => <div data-testid="dashboard-page" />
}))

vi.mock('@/features/news/pages/NewsFeedPage', () => ({
  NewsFeedPage: () => <div data-testid="news-page" />
}))

vi.mock('@/features/fixtures/pages/FixturesPage', () => ({
  FixturesPage: () => <div data-testid="fixtures-page" />
}))

vi.mock('@/features/tickets/pages/SeatSelectionPage', () => ({
  SeatSelectionPage: () => <div data-testid="tickets-page" />
}))

vi.mock('@/features/membership/pages/MembershipPortal', () => ({
  MembershipPortal: () => <div data-testid="membership-page" />
}))

vi.mock('@/features/store/pages/FeneriumPage', () => ({
  FeneriumPage: () => <div data-testid="store-page" />
}))

vi.mock('@/features/fanzone/pages/FanZonePage', () => ({
  FanZonePage: () => <div data-testid="fanzone-page" />
}))

const mockNavItems = [
  { to: '/', icon: vi.fn(), label: 'Ana Sayfa', ariaLabel: 'Ana sayfa' },
  { to: '/news', icon: vi.fn(), label: 'Haberler', ariaLabel: 'Fenerbahçe haberleri' }
]

describe('AppRoutes Component', () => {
  it('renders dashboard page by default', () => {
    render(
      <BrowserRouter>
        <AppRoutes navItems={mockNavItems} />
      </BrowserRouter>
    )
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('renders news page when path is /news', () => {
    render(
      <MemoryRouter initialEntries={[ '/news' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('news-page')).toBeInTheDocument()
  })

  it('redirects /dashboard to /', () => {
    render(
      <MemoryRouter initialEntries={[ '/dashboard' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })
})
