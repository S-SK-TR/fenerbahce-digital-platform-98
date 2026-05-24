import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Calendar, Bot, Percent } from 'lucide-react'
import useAppStore from '@/store/useAppStore'
import { FeedbackButtons } from '@/features/ai-content/components/FeedbackButtons'

interface MatchPrediction {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  modelName: string
  predictionDate: string
  winProbability: number
  drawProbability: number
  lossProbability: number
}

interface AIMatchPredictionsProps {
  matchId: string
}

export function AIMatchPredictions({ matchId }: AIMatchPredictionsProps) {
  const { aiContent } = useAppStore()

  // Mock prediction data
  const prediction: MatchPrediction = {
    id: matchId,
    homeTeam: 'Fenerbahçe',
    awayTeam: 'Galatasaray',
    date: '2023-11-15',
    modelName: 'Fenerbahçe AI Tahmin Modeli v2.1',
    predictionDate: new Date().toISOString(),
    winProbability: 42,
    drawProbability: 25,
    lossProbability: 33
  }

  return (
    <GlassCard className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-fb-gold-500" />
          <h3 className="text-lg font-semibold">AI Maç Tahmini</h3>
        </div>
        <FeedbackButtons contentId={matchId} contentType="match" />
      </div>

      <div className="space-y-4">
        {/* Model Info */}
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="font-medium">{prediction.modelName}</span>
          <span>•</span>
          <span>Tahmin Tarihi: {new Date(prediction.predictionDate).toLocaleDateString()}</span>
        </div>

        {/* Probability Bars */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-16 text-sm text-white/70">Galibiyet</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${prediction.winProbability}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-fb-gold-500 rounded-full"
              />
            </div>
            <span className="w-8 text-right text-sm font-medium">{prediction.winProbability}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 text-sm text-white/70">Beraberlik</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${prediction.drawProbability}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="h-full bg-fb-blue-500 rounded-full"
              />
            </div>
            <span className="w-8 text-right text-sm font-medium">{prediction.drawProbability}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 text-sm text-white/70">Mağlubiyet</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${prediction.lossProbability}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                className="h-full bg-fb-red-500 rounded-full"
              />
            </div>
            <span className="w-8 text-right text-sm font-medium">{prediction.lossProbability}%</span>
          </div>
        </div>

        {/* Prediction Summary */}
        <div className="flex items-center justify-between mt-4 p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2">
            <img src={`/teams/${prediction.homeTeam.toLowerCase()}.png`} alt={prediction.homeTeam} className="w-6 h-6" />
            <span className="font-medium">{prediction.homeTeam}</span>
          </div>
          <div className="text-2xl font-bold text-fb-gold-500">
            {prediction.winProbability}% - {prediction.lossProbability}%
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{prediction.awayTeam}</span>
            <img src={`/teams/${prediction.awayTeam.toLowerCase()}.png`} alt={prediction.awayTeam} className="w-6 h-6" />
          </div>
        </div>

        <Button variant="secondary" className="w-full mt-2">
          <Percent size={16} />
          Tahmin Detayları
        </Button>
      </div>
    </GlassCard>
  )
}