import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '@/App'
import { describe, it, expect, vi } from 'vitest'

// Mock child components
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('@/core/routes/AppRoutes', () => ({
  AppRoutes: () => <div>Mocked AppRoutes</div>
}))

vi.mock('@/components/ui/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('@/hooks/useNotification', () => ({
  useNotification: () => ({})
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Mocked AppRoutes')).toBeInTheDocument()
  })

  it('renders ErrorBoundary and AppShell', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(container.querySelector('ErrorBoundary')).toBeInTheDocument()
    expect(container.querySelector('AppShell')).toBeInTheDocument()
  })
})
