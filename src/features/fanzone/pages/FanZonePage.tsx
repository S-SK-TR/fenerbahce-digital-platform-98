import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Trophy, Image } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ui/GlassCard'
import { Soundboard } from '../components/Soundboard'
import { ScorePredictionGame } from '../components/ScorePredictionGame'
import { WallpaperGallery } from '../components/WallpaperGallery'
import { SoundboardItem, Wallpaper, PredictionGame } from '../types'

const soundboardItems: SoundboardItem[] = [
  { id: '1', name: 'Fenerbahçe Marşı', audioUrl: '/sounds/fenerbahce.mp3', icon: '🎵' },
  { id: '2', name: 'Kartal Marşı', audioUrl: '/sounds/kartal.mp3', icon: '🦅' },
  { id: '3', name: 'Sarı-Lacivert', audioUrl: '/sounds/sari-lacivert.mp3', icon: '🟡🔵' },
]

const wallpapers: Wallpaper[] = [
  {
    id: '1',
    name: 'Stadyum Manzarası',
    imageUrl: '/wallpapers/stadium.jpg',
    downloadUrl: '/downloads/stadium-wallpaper.jpg'
  },
  {
    id: '2',
    name: 'Kartal Manzarası',
    imageUrl: '/wallpapers/kartal.jpg',
    downloadUrl: '/downloads/kartal-wallpaper.jpg'
  },
]

const predictionGame: PredictionGame = {
  id: '1',
  homeTeam: 'Fenerbahçe',
  awayTeam: 'Galatasaray',
  matchDate: '2023-11-15T19:45:00'
}

export function FanZonePage() {
  const [activeTab, setActiveTab] = useState<'soundboard' | 'prediction' | 'wallpapers'>('soundboard')

  const handlePredictionSubmit = (prediction: { homeScore: number; awayScore: number }) => {
    console.log('Tahmin gönderildi:', prediction)
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <GlassCard className="p-4">
            <h2 className="text-xl font-bold mb-4">Fan Zone</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('soundboard')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === 'soundboard'
                    ? "bg-fb-gold-500/10 text-fb-gold-500 border-l-2 border-fb-gold-500"
                    : "text-white/70 hover:bg-fb-navy-800 hover:text-white"
                )}
              >
                <Music size={16} />
                Soundboard
              </button>
              <button
                onClick={() => setActiveTab('prediction')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === 'prediction'
                    ? "bg-fb-gold-500/10 text-fb-gold-500 border-l-2 border-fb-gold-500"
                    : "text-white/70 hover:bg-fb-navy-800 hover:text-white"
                )}
              >
                <Trophy size={16} />
                Skor Tahmini
              </button>
              <button
                onClick={() => setActiveTab('wallpapers')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === 'wallpapers'
                    ? "bg-fb-gold-500/10 text-fb-gold-500 border-l-2 border-fb-gold-500"
                    : "text-white/70 hover:bg-fb-navy-800 hover:text-white"
                )}
              >
                <Image size={16} />
                Mobil Duvar Kağıtları
              </button>
            </nav>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'soundboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Soundboard</h2>
                <Soundboard items={soundboardItems} />
              </div>
            )}

            {activeTab === 'prediction' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Skor Tahmin Oyunu</h2>
                <ScorePredictionGame game={predictionGame} onSubmit={handlePredictionSubmit} />
              </div>
            )}

            {activeTab === 'wallpapers' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Mobil Duvar Kağıtları</h2>
                <WallpaperGallery wallpapers={wallpapers} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}