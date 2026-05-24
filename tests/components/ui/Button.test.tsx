import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: { children: React.ReactNode }) => (
      <button {...props}>{children}</button>
    )
  }
}))

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('renders with gold variant by default', () => {
    const { container } = render(<Button>Click Me</Button>)
    const button = container.firstChild
    expect(button).toHaveClass('bg-[#D4AF37]')
    expect(button).toHaveClass('hover:bg-[#B8860B]')
    expect(button).toHaveClass('text-[#002F6C]')
  })

  it('renders with navy variant', () => {
    const { container } = render(<Button variant="navy">Click Me</Button>)
    const button = container.firstChild
    expect(button).toHaveClass('bg-[#002F6C]')
    expect(button).toHaveClass('hover:bg-[#00234B]')
    expect(button).toHaveClass('text-white')
  })

  it('renders with ghost variant', () => {
    const { container } = render(<Button variant="ghost">Click Me</Button>)
    const button = container.firstChild
    expect(button).toHaveClass('hover:bg-gray-100')
    expect(button).toHaveClass('dark:hover:bg-gray-800')
    expect(button).toHaveClass('text-gray-700')
    expect(button).toHaveClass('dark:text-gray-200')
  })

  it('renders with different sizes', () => {
    const { rerender, container } = render(<Button size="sm">Small</Button>)
    expect(container.firstChild).toHaveClass('h-8')
    expect(container.firstChild).toHaveClass('px-3')
    expect(container.firstChild).toHaveClass('text-xs')

    rerender(<Button size="md">Medium</Button>)
    expect(container.firstChild).toHaveClass('h-10')
    expect(container.firstChild).toHaveClass('px-4')
    expect(container.firstChild).toHaveClass('text-sm')

    rerender(<Button size="lg">Large</Button>)
    expect(container.firstChild).toHaveClass('h-12')
    expect(container.firstChild).toHaveClass('px-6')
    expect(container.firstChild).toHaveClass('text-base')
  })

  it('renders with icon', () => {
    const TestIcon = vi.fn(() => <span data-testid="test-icon" />)
    render(<Button icon={TestIcon}>Click Me</Button>)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<Button loading>Click Me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    await fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies additional className', () => {
    const { container } = render(<Button className="custom-class">Click Me</Button>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    const { container } = render(<Button data-testid="custom-prop">Click Me</Button>)
    expect(container.firstChild).toHaveAttribute('data-testid', 'custom-prop')
  })
})
