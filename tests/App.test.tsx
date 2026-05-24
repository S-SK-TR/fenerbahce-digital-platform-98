import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '@/App'
import { describe, it, expect, vi } from 'vitest'

// Mock child components
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div data-testid="app-shell">{children}</div>
}))

vi.mock('@/core/routes/AppRoutes', () => ({
  AppRoutes: ({ navItems }: { navItems: any[] }) => (
    <div data-testid="app-routes">
      {navItems.map(item => (
        <div key={item.to} data-testid={`route-${item.to}`}>{item.label}</div>
      ))}
    </div>
  )
}))

vi.mock('@/components/ui/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>
}))

vi.mock('@/hooks/useNotification', () => ({
  useNotification: () => ({})
}))

vi.mock('@/components/layout/AppShell', () => ({
  navItems: [
    { to: '/', label: 'Ana Sayfa' },
    { to: '/news', label: 'Haberler' }
  ]
}))

describe('App Component', () => {
  it('renders AppShell with AppRoutes inside ErrorBoundary', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByTestId('route-/')).toBeInTheDocument()
    expect(screen.getByTestId('route-/news')).toBeInTheDocument()
  })
})
