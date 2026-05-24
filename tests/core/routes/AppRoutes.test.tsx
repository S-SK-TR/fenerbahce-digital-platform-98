import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppRoutes } from '@/core/routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'

// Mock route components
vi.mock('@/features/dashboard/DashboardPage', () => ({
  DashboardPage: () => <div>Dashboard Page</div>
}))

vi.mock('@/features/news/NewsPage', () => ({
  NewsPage: () => <div>News Page</div>
}))

vi.mock('@/features/fixtures/FixturesPage', () => ({
  FixturesPage: () => <div>Fixtures Page</div>
}))

vi.mock('@/features/analytics/AnalyticsPage', () => ({
  AnalyticsPage: () => <div>Analytics Page</div>
}))

vi.mock('@/features/membership/MembershipPage', () => ({
  MembershipPage: () => <div>Membership Page</div>
}))

vi.mock('@/features/store/StorePage', () => ({
  StorePage: () => <div>Store Page</div>
}))

vi.mock('@/features/fanzone/FanZonePage', () => ({
  FanZonePage: () => <div>Fan Zone Page</div>
}))

vi.mock('@/features/ai-content/AIContentPage', () => ({
  AIContentPage: () => <div>AI Content Page</div>
}))

vi.mock('@/features/settings/SettingsPage', () => ({
  SettingsPage: () => <div>Settings Page</div>
}))

vi.mock('@/features/not-found/NotFoundPage', () => ({
  NotFoundPage: () => <div>Not Found Page</div>
}))

const mockNavItems = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/news', label: 'Haberler' },
  { to: '/fixtures', label: 'Fikstür' },
  { to: '/analytics', label: 'Analiz' },
  { to: '/membership', label: 'Üyelik' },
  { to: '/store/fenerium', label: 'Fenerium' },
  { to: '/fanzone', label: 'Fan Zone' },
  { to: '/ai-content', label: 'AI Tercihler' },
  { to: '/settings', label: 'Ayarlar' }
]

describe('AppRoutes Component', () => {
  it('renders all routes correctly', () => {
    render(
      <BrowserRouter>
        <AppRoutes navItems={mockNavItems} />
      </BrowserRouter>
    )

    // Test each route
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument()
    expect(screen.getByText('News Page')).toBeInTheDocument()
    expect(screen.getByText('Fixtures Page')).toBeInTheDocument()
    expect(screen.getByText('Analytics Page')).toBeInTheDocument()
    expect(screen.getByText('Membership Page')).toBeInTheDocument()
    expect(screen.getByText('Store Page')).toBeInTheDocument()
    expect(screen.getByText('Fan Zone Page')).toBeInTheDocument()
    expect(screen.getByText('AI Content Page')).toBeInTheDocument()
    expect(screen.getByText('Settings Page')).toBeInTheDocument()
    expect(screen.getByText('Not Found Page')).toBeInTheDocument()
  })
})
