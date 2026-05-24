import { render, screen, fireEvent } from '@testing-library/react'
import { WallpaperGallery } from '@/features/fanzone/components/WallpaperGallery'
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

vi.mock('@/store/useAppStore', () => ({
  useAppStore: () => ({
    wallpapers: [],
    setWallpaper: vi.fn()
  })
}))

describe('WallpaperGallery Component', () => {
  const mockWallpapers = [
    { id: '1', name: 'Wallpaper 1', url: 'wallpaper1.jpg' },
    { id: '2', name: 'Wallpaper 2', url: 'wallpaper2.jpg' }
  ]

  it('renders all wallpapers', () => {
    render(<WallpaperGallery wallpapers={mockWallpapers} />)
    expect(screen.getByText('Wallpaper 1')).toBeInTheDocument()
    expect(screen.getByText('Wallpaper 2')).toBeInTheDocument()
  })

  it('calls setWallpaper when a wallpaper is selected', () => {
    const mockSetWallpaper = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        wallpapers: [],
        setWallpaper: mockSetWallpaper
      })
    }))

    render(<WallpaperGallery wallpapers={mockWallpapers} />)
    const wallpaperButton = screen.getByText('Wallpaper 1')
    fireEvent.click(wallpaperButton)
    expect(mockSetWallpaper).toHaveBeenCalledWith('wallpaper1.jpg')
  })

  it('shows success message after wallpaper selection', () => {
    vi.mock('@/store/useAppStore', () => ({
      useAppStore: () => ({
        wallpapers: [{
          id: '1',
          name: 'Wallpaper 1',
          url: 'wallpaper1.jpg',
          isActive: true
        }],
        setWallpaper: vi.fn()
      })
    }))

    render(<WallpaperGallery wallpapers={mockWallpapers} />)
    expect(screen.getByText('Arka plan olarak ayarlandı!')).toBeInTheDocument()
  })
})