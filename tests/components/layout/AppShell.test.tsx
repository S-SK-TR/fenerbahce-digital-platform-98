import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell, navItems } from '@/components/layout/AppShell'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock hooks and components
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
    theme: 'dark'
  })
}))

vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('AppShell Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
  })

  it('renders all navigation items', () => {
    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders theme toggle in header and sidebar', () => {
    const toggles = screen.getAllByTestId('theme-toggle')
    expect(toggles).toHaveLength(2)
  })

  it('handles notification button click when permission is not granted', async () => {
    const notificationButton = screen.getByRole('button', { name: /Bildirim izni iste/i })
    await fireEvent.click(notificationButton)

    // Verify the mock was called
    const { requestPermission } = require('@/hooks/useNotification').useNotification()
    expect(requestPermission).toHaveBeenCalled()
  })

  it('renders mobile bottom navigation', () => {
    const mobileNav = screen.getByRole('navigation', { name: /Mobile navigasyon/i })
    expect(mobileNav).toBeInTheDocument()

    navItems.forEach(item => {
      expect(screen.getByRole('link', { name: item.ariaLabel })).toBeInTheDocument()
    })
  })
})
