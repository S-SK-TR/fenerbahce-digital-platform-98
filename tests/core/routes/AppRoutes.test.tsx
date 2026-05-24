import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '@/core/routes/AppRoutes'
import { describe, it, expect, vi } from 'vitest'

// Mock page components
vi.mock('@/features/dashboard/pages/DashboardPage', () => ({
  DashboardPage: () => <div>Dashboard Page</div>
}))

vi.mock('@/features/news/pages/NewsFeedPage', () => ({
  NewsFeedPage: () => <div>News Feed Page</div>
}))

vi.mock('@/features/fixtures/pages/FixturesPage', () => ({
  FixturesPage: () => <div>Fixtures Page</div>
}))

vi.mock('@/features/membership/pages/MembershipPortal', () => ({
  MembershipPortal: () => <div>Membership Portal</div>
}))

vi.mock('@/features/store/pages/FeneriumPage', () => ({
  FeneriumPage: () => <div>Fenerium Page</div>
}))

vi.mock('@/features/fanzone/pages/FanZonePage', () => ({
  FanZonePage: () => <div>Fan Zone Page</div>
}))

const mockNavItems = [
  { to: '/', icon: vi.fn(), label: 'Ana Sayfa', ariaLabel: 'Ana sayfa' },
  { to: '/news', icon: vi.fn(), label: 'Haberler', ariaLabel: 'Fenerbahçe haberleri' }
]

describe('AppRoutes Component', () => {
  it('renders dashboard route', () => {
    render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
  })

  it('renders news route', () => {
    render(
      <MemoryRouter initialEntries={[ '/news' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
    )
    expect(screen.getByText('News Feed Page')).toBeInTheDocument()
  })

  it('redirects /dashboard to /', () => {
    render(
      <MemoryRouter initialEntries={[ '/dashboard' ]}>
        <AppRoutes navItems={mockNavItems} />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
  })
})
