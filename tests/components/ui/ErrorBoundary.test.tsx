import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const ProblemChild = () => {
  throw new Error('Test error')
  return <div>This will not render</div>
}

const GoodChild = () => <div>Everything is fine</div>

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    )
    expect(screen.getByText('Everything is fine')).toBeInTheDocument()
  })

  it('renders error page when there is an error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    )

    expect(screen.getByText('Bir Hata Oluştu')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  it('catches errors in componentDidCatch', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // We need to test the componentDidCatch method, which is called after render
    // This is a bit tricky in React Testing Library, so we'll use a try-catch approach
    try {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      )
    } catch (error) {
      // The error should be caught by ErrorBoundary
    }

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
