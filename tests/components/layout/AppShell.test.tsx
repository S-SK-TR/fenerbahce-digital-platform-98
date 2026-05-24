import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

describe('AppShell Component', () => {
  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('Ana panel')).toBeInTheDocument()
    expect(screen.getByLabelText('Analitik veriler')).toBeInTheDocument()
    expect(screen.getByLabelText('Üye yönetimi')).toBeInTheDocument()
    expect(screen.getByLabelText('Etkinlik takvimi')).toBeInTheDocument()
    expect(screen.getByLabelText('Uygulama ayarları')).toBeInTheDocument()
  })

  it('highlights active navigation item', () => {
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <AppShell />
      </MemoryRouter>
    )
    const activeItem = screen.getByLabelText('Analitik veriler').closest('a')
    expect(activeItem).toHaveClass('bg-fb-gold-500/10')
  })

  it('renders user profile section', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    expect(screen.getByText('Fenerbahçe Fan')).toBeInTheDocument()
    expect(screen.getByText('fan@fenerbahce.com')).toBeInTheDocument()
  })

  it('shows notification badge', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    const notificationButton = screen.getByLabelText('Bildirimler')
    expect(notificationButton.querySelector('span')).toBeInTheDocument()
  })

  it('renders mobile bottom navigation', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    )
    const mobileNav = screen.getByLabelText('Mobile navigasyon')
    expect(mobileNav).toBeInTheDocument()
  })
})
