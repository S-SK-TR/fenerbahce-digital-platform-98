import { cn } from '@/lib/utils'

const legendItems = [
  { color: 'bg-green-500/20', text: 'Mevcut', border: 'border-green-500/30' },
  { color: 'bg-blue-500/20', text: 'Seçili', border: 'border-blue-500/30' },
  { color: 'bg-gray-500/20', text: 'Dolu', border: 'border-gray-500/30' },
]

export function SeatLegend() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Koltuk Renk Kodlaması</h3>
      <div className="space-y-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={cn(
              "w-6 h-6 rounded-md border-2 flex items-center justify-center text-xs font-medium",
              item.color,
              item.border
            )}>
              {index + 1}
            </div>
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}