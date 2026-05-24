import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'

// Mock child components
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div data-testid="app-shell">{children}</div>
}))

vi.mock('@/core/routes/AppRoutes', () => ({
  AppRoutes: () => <div data-testid="app-routes" />
}))

vi.mock('@/components/ui/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>
}))

vi.mock('@/hooks/useNotification', () => ({
  useNotification: () => ({})
}))

describe('App Component', () => {
  it('renders all main components', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
    expect(screen.getByTestId('app-routes')).toBeInTheDocument()
  })
})
