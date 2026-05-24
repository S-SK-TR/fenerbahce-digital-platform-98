import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { describe, it, expect, vi } from 'vitest'
import { Loader2 } from 'lucide-react'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByRole('button', { name: 'Click Me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-[#D4AF37]') // Default gold variant
    expect(button).toHaveClass('h-10') // Default medium size
  })

  it('renders with navy variant', () => {
    render(<Button variant="navy">Navy Button</Button>)
    const button = screen.getByRole('button', { name: 'Navy Button' })
    expect(button).toHaveClass('bg-[#002F6C]')
  })

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>)
    const button = screen.getByRole('button', { name: 'Ghost Button' })
    expect(button).toHaveClass('hover:bg-gray-100')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-12')
  })

  it('shows loading state', () => {
    render(<Button loading>Loading...</Button>)
    expect(screen.getByRole('button')).toHaveClass('opacity-50')
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with icon', () => {
    render(<Button icon={Loader2}>With Icon</Button>)
    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
  })
})
