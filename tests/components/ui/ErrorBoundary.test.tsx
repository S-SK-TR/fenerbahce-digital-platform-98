import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { describe, it, expect, vi } from 'vitest'

// Mock ErrorPage component
vi.mock('@/components/ui/ErrorPage', () => ({
  ErrorPage: ({ error }: { error?: Error }) => (
    <div data-testid="error-page">
      {error?.message || 'An error occurred'}
    </div>
  )
}))

const ProblemChild = () => {
  throw new Error('Test error')
  return null
}

describe('ErrorBoundary Component', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe content')).toBeInTheDocument()
  })

  it('catches errors and displays fallback UI', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      )
    }).not.toThrow()

    expect(screen.getByTestId('error-page')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()

    spy.mockRestore()
  })
})
