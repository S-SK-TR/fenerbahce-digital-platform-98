import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-[#D4AF37]') // Gold variant default
  })

  it('renders with navy variant', () => {
    render(<Button variant="navy">Navy Button</Button>)
    const button = screen.getByRole('button', { name: /navy button/i })
    expect(button).toHaveClass('bg-[#002F6C]')
  })

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>)
    const button = screen.getByRole('button', { name: /ghost button/i })
    expect(button).toHaveClass('hover:bg-gray-100')
  })

  it('shows loading state', () => {
    render(<Button loading>Loading...</Button>)
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    await fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
