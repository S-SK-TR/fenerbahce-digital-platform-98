import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { AppRoutes } from '@/core/routes/AppRoutes'
import { navItems } from '@/components/layout/AppShell'

// Mobil cihazlarda kullanıcı deneyimi testleri

test('Mobil navigasyon düğmeleri doğru şekilde görünür', async () => {
  render(
    <MemoryRouter>
      <AppShell>
        <AppRoutes navItems={navItems} />
      </AppShell>
    </MemoryRouter>
  )

  // Mobil alt navigasyon çubuğunu kontrol et
  const mobileNav = screen.getByRole('navigation', { name: /mobile/i })
  expect(mobileNav).toBeInTheDocument()

  // Tüm mobil navigasyon öğelerini kontrol et
  navItems.forEach(item => {
    const navItem = screen.getByRole('link', { name: item.label })
    expect(navItem).toBeInTheDocument()
  })
})

test('Mobil cihazlarda butonlar dokunma uyumlu boyutlara sahip', async () => {
  render(
    <MemoryRouter>
      <AppShell>
        <AppRoutes navItems={navItems} />
      </AppShell>
    </MemoryRouter>
  )

  // Tüm butonları kontrol et
  const buttons = screen.getAllByRole('button')
  buttons.forEach(button => {
    const { width, height } = button.getBoundingClientRect()
    expect(width).toBeGreaterThanOrEqual(44) // Minimum dokunma alanı
    expect(height).toBeGreaterThanOrEqual(44)
  })
})

test('Mobil cihazlarda kart bileşenleri doğru şekilde görünür', async () => {
  render(
    <MemoryRouter>
      <AppShell>
        <AppRoutes navItems={navItems} />
      </AppShell>
    </MemoryRouter>
  )

  // Kart bileşenlerini kontrol et
  const cards = screen.getAllByRole('article')
  cards.forEach(card => {
    expect(card).toHaveClass('glass-card') // Glassmorphism stili kontrolü
    expect(card).toHaveStyle('backdrop-filter: blur(12px)')
  })
})