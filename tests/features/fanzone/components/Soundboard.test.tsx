import { render, screen, fireEvent } from '@testing-library/react'
import { Soundboard } from '@/features/fanzone/components/Soundboard'
import { describe, it, expect, vi } from 'vitest'

// Mock components
vi.mock('@/components/ui/GlassCard', () => ({
  GlassCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="glass-card">{children}</div>
  )
}))

vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

vi.mock('@/hooks/useAudio', () => ({
  useAudio: () => ({
    playSound: vi.fn()
  })
}))

describe('Soundboard Component', () => {
  const mockSounds = [
    { id: '1', name: 'Hala', file: 'hala.mp3' },
    { id: '2', name: 'Fenerbahçe', file: 'fenerbahce.mp3' }
  ]

  it('renders all sound buttons', () => {
    render(<Soundboard sounds={mockSounds} />)
    expect(screen.getByText('Hala')).toBeInTheDocument()
    expect(screen.getByText('Fenerbahçe')).toBeInTheDocument()
  })

  it('calls playSound when a sound button is clicked', () => {
    const mockPlaySound = vi.fn()
    vi.mock('@/hooks/useAudio', () => ({
      useAudio: () => ({
        playSound: mockPlaySound
      })
    }))

    render(<Soundboard sounds={mockSounds} />)
    const halaButton = screen.getByText('Hala')
    fireEvent.click(halaButton)
    expect(mockPlaySound).toHaveBeenCalledWith('hala.mp3')
  })

  it('renders GlassCard', () => {
    render(<Soundboard sounds={mockSounds} />)
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })
})