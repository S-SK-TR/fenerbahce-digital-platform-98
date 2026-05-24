import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FixturesPage } from '@/features/fixtures/pages/FixturesPage'
import { MemoryRouter } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

// Mock useAppStore
vi.mock('@/store/useAppStore', () => ({
  useAppStore: vi.fn()
}))

const mockOfflineFixtures = [
  {
    id: '1',
    homeTeam: 'Fenerbahçe',
    awayTeam: 'Galatasaray',
    date: '2023-12-25',
    time: '20:00',
    stadium: 'Şükrü Saracoğlu'
  }
]

const mockOnlineFixtures = [
  {
    id: '2',
    homeTeam: 'Beşiktaş',
    awayTeam: 'Trabzonspor',
    date: '2023-12-30',
    time: '19:00',
    stadium: 'Vodafone Park'
  }
]

describe('FixturesPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  it('renders without crashing', () => {
    useAppStore.mockReturnValue({
      offlineData: { fixtures: [] },
      loadOfflineData: vi.fn()
    })

    render(
      <MemoryRouter>
        <FixturesPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Maçlar')).toBeInTheDocument()
    expect(screen.getByText('Puan Durumu')).toBeInTheDocument()
  })

  it('displays offline fixtures when available', async () => {
    useAppStore.mockReturnValue({
      offlineData: { fixtures: mockOfflineFixtures },
      loadOfflineData: vi.fn()
    })

    render(
      <MemoryRouter>
        <FixturesPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Fenerbahçe')).toBeInTheDocument()
      expect(screen.getByText('Galatasaray')).toBeInTheDocument()
      expect(screen.getByText('Şükrü Saracoğlu')).toBeInTheDocument()
    })
  })

  it('displays loading state when fetching online data', async () => {
    const mockLoadOfflineData = vi.fn()
    useAppStore.mockReturnValue({
      offlineData: { fixtures: [] },
      loadOfflineData: mockLoadOfflineData
    })

    render(
      <MemoryRouter>
        <FixturesPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Yükleniyor...')).toBeInTheDocument()
    expect(mockLoadOfflineData).toHaveBeenCalledWith('fixtures')
  })

  it('shows error message when offline data fails to load', async () => {
    const mockLoadOfflineData = vi.fn().mockRejectedValue(new Error('Failed to load'))
    useAppStore.mockReturnValue({
      offlineData: { fixtures: [] },
      loadOfflineData: mockLoadOfflineData
    })

    render(
      <MemoryRouter>
        <FixturesPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Çevrimdışı veri yüklenemedi')).toBeInTheDocument()
    })
  })

  it('displays team standings', async () => {
    useAppStore.mockReturnValue({
      offlineData: { fixtures: [] },
      loadOfflineData: vi.fn()
    })

    render(
      <MemoryRouter>
        <FixturesPage />
      </MemoryRouter>
    )
    const standingsTab = screen.getByText('Puan Durumu')
    await userEvent.click(standingsTab)
    expect(screen.getByText('Süper Lig Puan Durumu')).toBeInTheDocument()
    expect(screen.getByText('Fenerbahçe')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
  })
})
