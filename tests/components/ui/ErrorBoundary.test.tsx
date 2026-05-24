import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { describe, it, expect, vi } from 'vitest'

// Mock ErrorPage component
vi.mock('@/components/ui/ErrorPage', () => ({
  ErrorPage: ({ error }: { error?: Error }) => (
    <div>Error Page: {error?.message}</div>
  )
}))

const ProblemChild = () => {
  throw new Error('Test error')
  return <div>Child</div>
}

describe('ErrorBoundary Component', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal Child</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Normal Child')).toBeInTheDocument()
  })

  it('catches errors and displays ErrorPage', () => {
    const spy = vi.spyOn(console, 'error')
    spy.mockImplementation(() => {})

    expect(() => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      )
    }).not.toThrow()

    expect(screen.getByText(/Error Page: Test error/i)).toBeInTheDocument()
    spy.mockRestore()
  })
})
