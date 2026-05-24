import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

// Mock Zustand store
vi.mock('@/store/useAppStore', () => ({
  default: () => ({
    theme: 'light',
    setTheme: vi.fn()
  })
}))

describe('ThemeToggle Component', () => {
  it('renders with light theme icon', () => {
    render(<ThemeToggle />)
    const moonIcon = screen.getByTestId('moon-icon')
    expect(moonIcon).toBeInTheDocument()
  })

  it('renders with dark theme icon when theme is dark', () => {
    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: 'dark',
        setTheme: vi.fn()
      })
    }))

    render(<ThemeToggle />)
    const sunIcon = screen.getByTestId('sun-icon')
    expect(sunIcon).toBeInTheDocument()
  })

  it('toggles theme on click', async () => {
    const setTheme = vi.fn()
    vi.mock('@/store/useAppStore', () => ({
      default: () => ({
        theme: 'light',
        setTheme
      })
    }))

    render(<ThemeToggle />)
    const toggleButton = screen.getByRole('button')
    await fireEvent.click(toggleButton)
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
