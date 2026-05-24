import { render, screen } from '@testing-library/react'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { MemoryRouter } from 'react-router-dom'

jest.mock('@/features/dashboard/components/HeroBanner', () => ({
  HeroBanner: () => <div data-testid="hero-banner">Hero Banner</div>
}))

jest.mock('@/features/dashboard/components/NextMatchWidget', () => ({
  NextMatchWidget: () => <div data-testid="next-match-widget">Next Match Widget</div>
}))

describe('DashboardPage Component', () => {
  it('renders HeroBanner component', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId('hero-banner')).toBeInTheDocument()
  })

  it('renders NextMatchWidget component', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId('next-match-widget')).toBeInTheDocument()
  })

  it('renders page title', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})