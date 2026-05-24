import { cn } from '@/lib/utils'

interface SeatSelectionSummaryProps {
  selectedSeats: string[]
  category: string | null
}

export function SeatSelectionSummary({ selectedSeats, category }: SeatSelectionSummaryProps) {
  const price = category === 'VIP' ? 500 : category === 'Premium' ? 350 : 200

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Seçiminiz</h3>
      {selectedSeats.length > 0 ? (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Seçilen Koltuklar:</span>
            <span className="font-medium">{selectedSeats.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Kategori:</span>
            <span className={cn(
              "font-medium",
              category === 'VIP' && 'text-yellow-400',
              category === 'Premium' && 'text-purple-400',
              category === 'Standard' && 'text-blue-400',
              category === 'Ekonomi' && 'text-green-400'
            )}>{category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Fiyat:</span>
            <span className="font-medium">{price} TL</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-800">
            <span className="text-sm font-medium">Toplam:</span>
            <span className="font-bold text-lg">{price * selectedSeats.length} TL</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">Koltuk seçimi yapın</p>
        </div>
      )}
    </div>
  )
}