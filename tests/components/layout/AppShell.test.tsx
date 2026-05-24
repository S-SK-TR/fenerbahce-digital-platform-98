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
    NavLink: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>{children}</a>
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
      theme: 'light'
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

  it('handles notification button click when permission is granted', async () => {
    useAppStore.mockReturnValueOnce({
      notificationPermission: 'granted',
      setNotificationPermission: mockSetNotificationPermission,
      theme: 'light'
    })

    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    const notificationButton = screen.getByLabelText('Bildirimleri test et')
    fireEvent.click(notificationButton)

    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'Test Bildirimi',
      body: 'Bildirim sistemi çalışıyor',
      tag: 'test-notification',
      contentType: 'news',
      link: '/news'
    })
  })

  it('requests notification permission when not granted', async () => {
    mockRequestPermission.mockResolvedValue(true)

    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    const notificationButton = screen.getByLabelText('Bildirim izni iste')
    fireEvent.click(notificationButton)

    expect(mockRequestPermission).toHaveBeenCalled()
    expect(mockSetNotificationPermission).toHaveBeenCalledWith('granted')
    expect(mockShowNotification).toHaveBeenCalledWith({
      title: 'Bildirimler Etkin',
      body: 'Artık maç haberlerini alacaksınız',
      tag: 'permission-granted',
      contentType: 'news',
      link: '/news'
    })
  })

  it('handles notification permission denial', async () => {
    mockRequestPermission.mockResolvedValue(false)

    render(
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    )

    const notificationButton = screen.getByLabelText('Bildirim izni iste')
    fireEvent.click(notificationButton)

    expect(mockRequestPermission).toHaveBeenCalled()
    expect(mockSetNotificationPermission).toHaveBeenCalledWith('denied')
  })
})
