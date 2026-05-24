import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell, navItems } from '@/components/layout/AppShell'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock child components
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: ({ className }: { className?: string }) => (
    <button data-testid="theme-toggle" className={className}>Toggle Theme</button>
  )
}))

// Mock hooks
vi.mock('@/hooks/useNotification', () => ({
  useNotification: () => ({
    requestPermission: vi.fn().mockResolvedValue(true),
    showNotification: vi.fn().mockResolvedValue(undefined)
  })
}))

vi.mock('@/store/useAppStore', () => ({
  default: () => ({
    notificationPermission: 'default',
    setNotificationPermission: vi.fn(),
    theme: 'light'
  })
}))

describe('AppShell Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
  })

  it('renders sidebar with all navigation items', () => {
    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders mobile bottom navigation', () => {
    const mobileNav = screen.getByLabelText('Mobile navigasyon')
    expect(mobileNav).toBeInTheDocument()

    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('handles notification button click', async () => {
    const notificationButton = screen.getAllByLabelText('Bildirim izni iste')[0]
    fireEvent.click(notificationButton)

    // Should call requestPermission
    expect(useNotification().requestPermission).toHaveBeenCalled()
  })

  it('renders theme toggle buttons', () => {
    const themeToggles = screen.getAllByTestId('theme-toggle')
    expect(themeToggles.length).toBe(2) // One in header, one in sidebar
  })
})
