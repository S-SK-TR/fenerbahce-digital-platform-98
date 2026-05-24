import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SeatSelectionPage } from '@/features/tickets/pages/SeatSelectionPage'
import { MemoryRouter } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

// Mock useAppStore
vi.mock('@/store/useAppStore', () => ({
  useAppStore: vi.fn()
}))

const mockOfflineSeats = [
  { id: '1', section: 'VIP', row: 'A', number: '1', status: 'available' },
  { id: '2', section: 'VIP', row: 'A', number: '2', status: 'available' }
]

describe('SeatSelectionPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks()
  })

  it('renders without crashing', () => {
    useAppStore.mockReturnValue({
      offlineData: { seats: [] },
      loadOfflineData: vi.fn()
    })

    render(
      <MemoryRouter>
        <SeatSelectionPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Koltuk Seçimi')).toBeInTheDocument()
  })

  it('displays offline seats when available', async () => {
    useAppStore.mockReturnValue({
      offlineData: { seats: mockOfflineSeats },
      loadOfflineData: vi.fn()
    })

    render(
      <MemoryRouter>
        <SeatSelectionPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('VIP Bölgesi')).toBeInTheDocument()
      expect(screen.getByText('A1')).toBeInTheDocument()
      expect(screen.getByText('A2')).toBeInTheDocument()
    })
  })

  it('displays loading state when fetching offline data', async () => {
    const mockLoadOfflineData = vi.fn()
    useAppStore.mockReturnValue({
      offlineData: { seats: [] },
      loadOfflineData: mockLoadOfflineData
    })

    render(
      <MemoryRouter>
        <SeatSelectionPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Yükleniyor...')).toBeInTheDocument()
    expect(mockLoadOfflineData).toHaveBeenCalledWith('seats')
  })

  it('shows error message when offline data fails to load', async () => {
    const mockLoadOfflineData = vi.fn().mockRejectedValue(new Error('Failed to load'))
    useAppStore.mockReturnValue({
      offlineData: { seats: [] },
      loadOfflineData: mockLoadOfflineData
    })

    render(
      <MemoryRouter>
        <SeatSelectionPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Koltuk bilgileri yüklenemedi')).toBeInTheDocument()
    })
  })

  it('allows seat selection', async () => {
    const mockSetSelectedSeats = vi.fn()
    useAppStore.mockReturnValue({
      offlineData: { seats: mockOfflineSeats },
      loadOfflineData: vi.fn(),
      setSelectedSeats: mockSetSelectedSeats
    })

    render(
      <MemoryRouter>
        <SeatSelectionPage />
      </MemoryRouter>
    )

    const seatButton = await screen.findByText('A1')
    await userEvent.click(seatButton)

    expect(mockSetSelectedSeats).toHaveBeenCalledWith(['1'])
  })
})
