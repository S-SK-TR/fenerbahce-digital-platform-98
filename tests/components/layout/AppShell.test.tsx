import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AppShell, navItems } from '@/components/layout/AppShell'
import { BrowserRouter } from 'react-router-dom'
import { useNotification } from '@/hooks/useNotification'
import useAppStore from '@/store/useAppStore'

// Mock dependencies
vi.mock('@/hooks/useNotification')
vi.mock('@/store/useAppStore')

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    )
  }
})

describe('AppShell Component', () => {
  const mockShowNotification = vi.fn()
  const mockRequestPermission = vi.fn()
  const mockSetNotificationPermission = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useNotification.mockReturnValue({
      showNotification: mockShowNotification,
      requestPermission: mockRequestPermission,
      notifications: [],
      closeNotification: vi.fn()
    })
    useAppStore.mockReturnValue({
      notificationPermission: 'default',
      setNotificationPermission: mockSetNotificationPermission,
      theme: 'dark'
    })
  })

  it('renders all navigation items', () => {
    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    navItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('handles notification click when permission is granted', async () => {
    useAppStore.mockReturnValueOnce({
      notificationPermission: 'granted',
      setNotificationPermission: mockSetNotificationPermission,
      theme: 'dark'
    })

    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    const notificationButton = screen.getAllByLabelText('Bildirimleri test et')[0]
    fireEvent.click(notificationButton)

    await vi.waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith({
        title: 'Test Bildirimi',
        body: 'Bildirim sistemi çalışıyor',
        tag: 'test-notification',
        contentType: 'news',
        link: '/news'
      })
    })
  })

  it('requests notification permission when not granted', async () => {
    mockRequestPermission.mockResolvedValue(true)

    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    const notificationButton = screen.getAllByLabelText('Bildirim izni iste')[0]
    fireEvent.click(notificationButton)

    await vi.waitFor(() => {
      expect(mockRequestPermission).toHaveBeenCalled()
      expect(mockSetNotificationPermission).toHaveBeenCalledWith('granted')
    })
  })

  it('shows mobile bottom navigation on small screens', () => {
    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    const mobileNav = screen.getByLabelText('Mobile navigasyon')
    expect(mobileNav).toBeInTheDocument()
  })
})
