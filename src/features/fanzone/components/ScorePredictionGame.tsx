import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PredictionGame } from '../types'

interface ScorePredictionGameProps {
  game: PredictionGame
  onSubmit: (prediction: { homeScore: number; awayScore: number }) => void
}

export function ScorePredictionGame({ game, onSubmit }: ScorePredictionGameProps) {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    onSubmit({ homeScore, awayScore })
    setSubmitted(true)
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src="/teams/fenerbahce.png" alt="Fenerbahçe" className="w-10 h-10" />
          <span className="font-bold text-lg">Fenerbahçe</span>
        </div>
        <div className="text-2xl font-bold text-fb-gold-500">vs</div>
        <div className="flex items-center gap-3">
          <img src={`/teams/${game.awayTeam.toLowerCase()}.png`} alt={game.awayTeam} className="w-10 h-10" />
          <span className="font-bold text-lg">{game.awayTeam}</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-white/70 mb-1">Maç Tarihi</p>
        <p className="font-medium">{new Date(game.matchDate).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="99"
            value={homeScore}
            onChange={(e) => setHomeScore(Number(e.target.value))}
            className="w-16 h-16 text-center text-2xl font-bold bg-fb-navy-800 rounded-lg border border-fb-navy-700 focus:border-fb-gold-500 focus:ring-2 focus:ring-fb-gold-500/20 outline-none"
            disabled={submitted}
          />
          <span className="mt-2 text-sm text-white/70">Fenerbahçe</span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="99"
            value={awayScore}
            onChange={(e) => setAwayScore(Number(e.target.value))}
            className="w-16 h-16 text-center text-2xl font-bold bg-fb-navy-800 rounded-lg border border-fb-navy-700 focus:border-fb-gold-500 focus:ring-2 focus:ring-fb-gold-500/20 outline-none"
            disabled={submitted}
          />
          <span className="mt-2 text-sm text-white/70">{game.awayTeam}</span>
        </div>
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={submitted}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",
          submitted ? "bg-green-500/20 text-green-400 cursor-default" : "bg-fb-gold-500 text-fb-navy-900 hover:bg-fb-gold-400"
        )}
      >
        {submitted ? (
          <>
            <Check size={16} />
            Tahmininiz kaydedildi
          </>
        ) : (
          <>
            <Trophy size={16} />
            Tahmini Gönder
          </>
        )}
      </motion.button>

      {submitted && (
        <div className="mt-4 p-3 bg-fb-navy-800 rounded-lg text-center text-sm">
          <p className="text-white/70">Tahmininiz kaydedildi! Maç sonrası puanınızı göreceksiniz.</p>
        </div>
      )}
    </div>
  )
}