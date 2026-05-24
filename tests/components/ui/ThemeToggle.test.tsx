import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { describe, it, expect, vi } from 'vitest'
import useAppStore from '@/store/useAppStore'

// Mock Zustand store
vi.mock('@/store/useAppStore', () => ({
  default: vi.fn()
}))

describe('ThemeToggle Component', () => {
  it('renders with light theme', () => {
    useAppStore.mockReturnValue({
      theme: 'light',
      setTheme: vi.fn()
    })

    render(<ThemeToggle />)
    expect(screen.getByLabelText(/Switch to dark mode/i)).toBeInTheDocument()
  })

  it('renders with dark theme', () => {
    useAppStore.mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn()
    })

    render(<ThemeToggle />)
    expect(screen.getByLabelText(/Switch to light mode/i)).toBeInTheDocument()
  })

  it('toggles theme when clicked', () => {
    const setTheme = vi.fn()
    useAppStore.mockReturnValue({
      theme: 'light',
      setTheme
    })

    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('applies custom className', () => {
    render(<ThemeToggle className="custom-class" />)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
