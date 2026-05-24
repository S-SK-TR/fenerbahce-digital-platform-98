import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell, navItems } from '@/components/layout/AppShell'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useAppStore from '@/store/useAppStore'

// Mock child components
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <div>ThemeToggle</div>
}))

// Mock hooks
vi.mock('@/hooks/useNotification', () => ({
  useNotification: () => ({
    requestPermission: vi.fn().mockResolvedValue(true),
    showNotification: vi.fn().mockResolvedValue(undefined)
  })
}))

// Mock Zustand store
vi.mock('@/store/useAppStore', () => ({
  default: vi.fn()
}))

describe('AppShell Component', () => {
  beforeEach(() => {
    useAppStore.mockReturnValue({
      notificationPermission: 'default',
      setNotificationPermission: vi.fn(),
      theme: 'light'
    })
  })

  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )

    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('handles notification button click', async () => {
    const { requestPermission, showNotification } = require('@/hooks/useNotification').useNotification()
    const { setNotificationPermission } = useAppStore()

    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )

    const notificationButton = screen.getByRole('button', { name: /Bildirim izni iste/i })
    fireEvent.click(notificationButton)

    expect(requestPermission).toHaveBeenCalled()
    expect(setNotificationPermission).toHaveBeenCalledWith('granted')
    expect(showNotification).toHaveBeenCalled()
  })

  it('toggles theme when ThemeToggle is clicked', () => {
    const setTheme = vi.fn()
    useAppStore.mockReturnValueOnce({
      theme: 'light',
      setTheme
    })

    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )

    const themeToggle = screen.getByText('ThemeToggle')
    fireEvent.click(themeToggle)
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
