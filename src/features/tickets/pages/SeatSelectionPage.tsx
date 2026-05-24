import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { SeatMap } from '../components/SeatMap'
import { SeatLegend } from '../components/SeatLegend'
import { SeatSelectionSummary } from '../components/SeatSelectionSummary'
import useAppStore from '@/store/useAppStore'

interface SeatSelectionPageProps {
  eventId: string
}

export function SeatSelectionPage({ eventId }: SeatSelectionPageProps) {
  const { selectedSeats, setSelectedSeats } = useAppStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSeatSelect = (seatId: string, category: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId)
      }
      return [...prev, seatId]
    })
    setSelectedCategory(category)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-4 md:p-6 max-w-7xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold mb-4">Koltuk Seçimi</h2>
            <SeatMap
              eventId={eventId}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard className="p-6">
            <SeatLegend />
          </GlassCard>
          <GlassCard className="p-6">
            <SeatSelectionSummary
              selectedSeats={selectedSeats}
              category={selectedCategory}
            />
            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                size="lg"
                disabled={selectedSeats.length === 0}
                onClick={() => console.log('Ödeme sayfasına yönlendir')}
              >
                Devam Et
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  )
}