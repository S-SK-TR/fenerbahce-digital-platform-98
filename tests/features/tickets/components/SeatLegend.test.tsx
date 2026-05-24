import { render, screen } from '@testing-library/react'
import { SeatLegend } from '@/features/tickets/components/SeatLegend'
import { describe, it, expect } from 'vitest'

describe('SeatLegend Component', () => {
  it('renders all legend items', () => {
    render(<SeatLegend />)
    expect(screen.getByText('Mevcut')).toBeInTheDocument()
    expect(screen.getByText('Seçili')).toBeInTheDocument()
    expect(screen.getByText('Dolu')).toBeInTheDocument()
    expect(screen.getByText('Özel')).toBeInTheDocument()
  })

  it('displays correct color indicators', () => {
    render(<SeatLegend />)
    const availableIndicator = screen.getByTestId('available-indicator')
    const selectedIndicator = screen.getByTestId('selected-indicator')
    const unavailableIndicator = screen.getByTestId('unavailable-indicator')
    const specialIndicator = screen.getByTestId('special-indicator')

    expect(availableIndicator).toHaveClass('bg-green-500')
    expect(selectedIndicator).toHaveClass('bg-blue-500')
    expect(unavailableIndicator).toHaveClass('bg-gray-500')
    expect(specialIndicator).toHaveClass('bg-purple-500')
  })
})