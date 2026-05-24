import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '@/core/routes/AppRoutes'
import { describe, it, expect, vi } from 'vitest'

// Mock page components
vi.mock('@/features/dashboard/pages/DashboardPage', () => ({
  DashboardPage: () => <div data-testid="dashboard-page">Dashboard</div>
}))

vi.mock('@/features/news/pages/NewsFeedPage', () => ({
  NewsFeedPage: () => <div data-testid="news-page">News</div>
}))

vi.mock('@/features/fixtures/pages/FixturesPage', () => ({
  FixturesPage: () => <div data-testid="fixtures-page">Fixtures</div>
}))

vi.mock('@/features/tickets/pages/SeatSelectionPage', () => ({
  SeatSelectionPage: () => <div data-testid="tickets-page">Tickets</div>
}))

vi.mock('@/features/membership/pages/MembershipPortal', () => ({
  MembershipPortal: () => <div data-testid="membership-page">Membership</div>
}))

vi.mock('@/features/store/pages/FeneriumPage', () => ({
  FeneriumPage: () => <div data-testid="fenerium-page">Fenerium</div>
}))

vi.mock('@/features/fanzone/pages/FanZonePage', () => ({
  FanZonePage: () => <div data-testid="fanzone-page">Fan Zone</div>
}))

const mockNavItems = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/news', label: 'Haberler' },
  { to: '/fixtures', label: 'Fikstür' }
]

describe('AppRoutes Component', () => {
  it('renders dashboard page by default', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
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

  it('renders fixtures page when path is /fixtures', () => {
    render(
      <MemoryRouter initialEntries={[ '/fixtures' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('fixtures-page')).toBeInTheDocument()
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
