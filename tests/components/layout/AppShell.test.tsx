import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AppShell, navItems } from '@/components/layout/AppShell'
import { BrowserRouter } from 'react-router-dom'

// Mock child components
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />
}))

// Mock Zustand store
vi.mock('@/store/useAppStore', () => ({
  default: () => ({
    notificationPermission: 'default',
    setNotificationPermission: vi.fn(),
    theme: 'light'
  })
}))

// Mock notification hook
vi.mock('@/hooks/useNotification', () => ({
  useNotification: () => ({
    requestPermission: vi.fn().mockResolvedValue(true),
    showNotification: vi.fn().mockResolvedValue(undefined)
  })
}))

describe('AppShell Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )
  })

  it('renders all navigation items', () => {
    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders theme toggle buttons', () => {
    const themeToggles = screen.getAllByTestId('theme-toggle')
    expect(themeToggles.length).toBe(2) // One in header, one in sidebar
  })

  it('handles notification button click', async () => {
    const notificationButtons = screen.getAllByLabelText(/bildirim/i)
    expect(notificationButtons.length).toBe(2) // One in header, one in sidebar

    await fireEvent.click(notificationButtons[0])
    // Add assertions for notification behavior
  })
})
