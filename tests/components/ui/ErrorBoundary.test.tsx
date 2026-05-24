import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { ErrorPage } from '@/components/ui/ErrorPage'

// Mock ErrorPage component
vi.mock('@/components/ui/ErrorPage', () => ({
  ErrorPage: ({ error }: { error?: Error }) => (
    <div data-testid="error-page">
      {error?.message || 'Default Error Message'}
    </div>
  )
}))

const ProblemChild = () => {
  throw new Error('Test error')
  return null
}

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Normal Content')).toBeInTheDocument()
  })

  it('catches errors and renders ErrorPage', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('error-page')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  it('logs errors to console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    try {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      )
    } catch (e) {
      // ErrorBoundary should catch the error
    }

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    )

    consoleErrorSpy.mockRestore()
  })
})
