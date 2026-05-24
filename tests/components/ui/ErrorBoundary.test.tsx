import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ErrorBoundary } from '../../../src/components/ui/ErrorBoundary'

// Mock the ErrorPage component
vi.mock('../../../src/components/ui/ErrorPage', () => ({
  ErrorPage: ({ error }: { error?: Error }) => (
    <div data-testid="error-page">
      <h1>Error Page</h1>
      <p>{error?.message}</p>
    </div>
  )
}))

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Normal Content')).toBeInTheDocument()
  })

  it('renders ErrorPage when an error occurs', () => {
    const ErrorComponent = () => {
      throw new Error('Test error')
    }

    expect(() => {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      )
    }).toThrow('Test error')

    // After error, ErrorPage should be rendered
    expect(screen.getByTestId('error-page')).toBeInTheDocument()
    expect(screen.getByText('Error Page')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
  })

  it('logs errors to console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const ErrorComponent = () => {
      throw new Error('Test error')
    }

    expect(() => {
      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      )
    }).toThrow('Test error')

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    )

    consoleErrorSpy.mockRestore()
  })
})
