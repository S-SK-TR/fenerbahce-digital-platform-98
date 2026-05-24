import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { describe, it, expect, vi } from 'vitest'

// Mock useAppStore
vi.mock('@/store/useAppStore', () => ({
  default: () => ({
    theme: 'light',
    setTheme: vi.fn()
  })
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />
}))

describe('ThemeToggle Component', () => {
  it('renders with light theme by default', () => {
    render(<ThemeToggle />)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  })

  it('renders with sun icon when theme is dark', () => {
    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: 'dark',
        setTheme: vi.fn()
      })
    }))

    render(<ThemeToggle />)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
  })

  it('calls setTheme when clicked', () => {
    const mockSetTheme = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: 'light',
        setTheme: mockSetTheme
      })
    }))

    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('toggles between light and dark themes', () => {
    const mockSetTheme = vi.fn()
    let currentTheme = 'light'

    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: currentTheme,
        setTheme: (theme: string) => { currentTheme = theme }
      })
    }))

    const { rerender } = render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(currentTheme).toBe('dark')

    rerender(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(currentTheme).toBe('light')
  })

  it('applies additional className', () => {
    const { container } = render(<ThemeToggle className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
