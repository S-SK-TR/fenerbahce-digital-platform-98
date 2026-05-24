import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Trophy, Image, Video, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Soundboard } from '../components/Soundboard'
import { ScorePredictionGame } from '../components/ScorePredictionGame'
import { WallpaperGallery } from '../components/WallpaperGallery'
import { AIHighlightVideos } from '../components/AIHighlightVideos'
import { ContentFilter } from '@/features/ai-content/components/ContentFilter'
import { useAIContent } from '@/features/ai-content/hooks/useAIContent'
import { SoundboardItem, Wallpaper, PredictionGame, HighlightVideo } from '../types'

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
  const [activeTab, setActiveTab] = useState<'soundboard' | 'prediction' | 'wallpapers' | 'highlights'>('soundboard')
  const [filters, setFilters] = useState({ contentTypes: ['highlights'], feedbackTypes: [] })

  const { aiContent, fetchContent, isLoading } = useAIContent()

  const handlePredictionSubmit = (prediction: { homeScore: number; awayScore: number }) => {
    console.log('Tahmin gönderildi:', prediction)
  }

  const handleRefreshContent = async () => {
    try {
      await fetchContent('highlights')
      // Bildirim gösterme işlemi
    } catch (error) {
      console.error('İçerik yenileme hatası:', error)
    }
  }

  const highlightVideos: HighlightVideo[] = aiContent.highlights.map((title, index) => ({
    id: `highlight-${index}`,
    title,
    thumbnailUrl: '/thumbnails/ai-highlight.jpg',
    duration: '2:45',
    selectedDate: new Date().toISOString().split('T')[0],
    videoUrl: 'https://www.youtube.com/watch?v=ai-highlight'
  }))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <ContentFilter onFilterChange={setFilters} initialFilters={filters} />

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
              <button
                onClick={() => setActiveTab('highlights')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === 'highlights'
                    ? "bg-fb-gold-500/10 text-fb-gold-500 border-l-2 border-fb-gold-500"
                    : "text-white/70 hover:bg-fb-navy-800 hover:text-white"
                )}
              >
                <Video size={16} />
                AI Seçilen Maç Özetleri
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

            {activeTab === 'highlights' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">AI Seçilen Maç Özetleri</h2>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleRefreshContent}
                    loading={isLoading}
                    icon={RefreshCw}
                  >
                    Yenile
                  </Button>
                </div>
                <AIHighlightVideos videos={highlightVideos} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}