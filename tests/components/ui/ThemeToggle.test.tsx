import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Zustand store
vi.mock('@/store/useAppStore', () => ({
  default: () => ({
    theme: 'light',
    setTheme: vi.fn()
  })
}))

// Mock document.documentElement.classList
const mockClassList = {
  toggle: vi.fn(),
  add: vi.fn(),
  remove: vi.fn()
}

Object.defineProperty(document, 'documentElement', {
  value: {
    classList: mockClassList
  },
  writable: true
})

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with sun icon in light mode', () => {
    render(<ThemeToggle />)
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
  })

  it('renders with moon icon in dark mode', () => {
    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: 'dark',
        setTheme: vi.fn()
      })
    }))

    render(<ThemeToggle />)
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
  })

  it('toggles theme when clicked', async () => {
    const setTheme = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: 'light',
        setTheme
      })
    }))

    render(<ThemeToggle />)
    const button = screen.getByLabelText('Switch to dark mode')
    await fireEvent.click(button)

    expect(setTheme).toHaveBeenCalledWith('dark')
    expect(mockClassList.toggle).toHaveBeenCalledWith('dark', true)
  })

  it('applies additional className when provided', () => {
    render(<ThemeToggle className="custom-class" />)
    const button = screen.getByLabelText('Switch to dark mode')
    expect(button).toHaveClass('custom-class')
  })
})
