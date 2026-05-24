import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Seat {
  id: string
  row: string
  number: number
  category: string
  status: 'available' | 'unavailable' | 'selected'
}

interface SeatMapProps {
  eventId: string
  selectedSeats: string[]
  onSeatSelect: (seatId: string, category: string) => void
}

export function SeatMap({ eventId, selectedSeats, onSeatSelect }: SeatMapProps) {
  const [seats, setSeats] = useState<Seat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      const mockSeats: Seat[] = []
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      const categories = ['VIP', 'Premium', 'Standard', 'Ekonomi']

      rows.forEach(row => {
        for (let i = 1; i <= 12; i++) {
          const category = categories[Math.floor(Math.random() * categories.length)]
          mockSeats.push({
            id: `${row}-${i}`,
            row,
            number: i,
            category,
            status: Math.random() > 0.3 ? 'available' : 'unavailable'
          })
        }
      })

      setSeats(mockSeats)
      setLoading(false)
    }, 800)
  }, [eventId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-500/20 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-500/20 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-500/20 rounded"></div>
              <div className="h-4 bg-blue-500/20 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-blue-500/10 rounded-lg px-4 py-2 text-sm font-medium">Sahne</div>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat.id)
          const isAvailable = seat.status === 'available'
          const isUnavailable = seat.status === 'unavailable'

          return (
            <button
              key={seat.id}
              disabled={isUnavailable}
              onClick={() => onSeatSelect(seat.id, seat.category)}
              className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-all",
                {
                  "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30": isSelected,
                  "bg-green-500/20 text-green-500 hover:bg-green-500/30": isAvailable && !isSelected,
                  "bg-gray-500/20 text-gray-500 cursor-not-allowed": isUnavailable,
                  "cursor-pointer": isAvailable
                }
              )}
            >
              {seat.number}
            </button>
          )
        })}
      </div>
    </div>
  )
}