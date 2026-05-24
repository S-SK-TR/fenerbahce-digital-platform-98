import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Play, Pause, Volume2, VolumeX, Maximize2, HelpCircle, Newspaper, RefreshCw } from 'lucide-react'
import { NewsGrid } from '../components/NewsGrid'
import { ContentFilter } from '@/features/ai-content/components/ContentFilter'
import { useAIContent } from '@/features/ai-content/hooks/useAIContent'
import { useAppStore } from '@/store/useAppStore'

interface NewsItem {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  date: string
  teamLogos?: string[]
}

const liveChannels = [
  { id: '1', name: 'Fenerbahçe TV', logo: 'https://example.com/fb-tv-logo.png' },
  { id: '2', name: 'Fenerbahçe 2', logo: 'https://example.com/fb-tv2-logo.png' },
  { id: '3', name: 'Fenerbahçe 3', logo: 'https://example.com/fb-tv3-logo.png' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const NewsFeedPage = () => {
  const [activeChannel, setActiveChannel] = useState(liveChannels[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [filters, setFilters] = useState({ contentTypes: ['news'], feedbackTypes: [] })

  const { aiContent, fetchContent, isLoading } = useAIContent()
  const { showNotification } = useAppStore()

  const togglePlay = () => setIsPlaying(!isPlaying)
  const toggleMute = () => setIsMuted(!isMuted)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const handleRefreshContent = async () => {
    try {
      await fetchContent('news')
      showNotification({
        title: 'İçerik yenilendi',
        message: 'AI tarafından yeni içerikler yüklendi',
        type: 'success'
      })
    } catch (error) {
      showNotification({
        title: 'Hata',
        message: 'İçerik yenileme sırasında bir hata oluştu',
        type: 'error'
      })
    }
  }

  const filteredNews = aiContent.news.map((title, index) => ({
    id: `news-${index}`,
    title,
    content: 'AI tarafından oluşturulan haber içeriği',
    imageUrl: 'https://example.com/ai-news.jpg',
    category: 'AI',
    date: new Date().toISOString().split('T')[0],
    teamLogos: ['https://example.com/fb-logo.png', 'https://example.com/ai-logo.png']
  }))

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <ContentFilter onFilterChange={setFilters} initialFilters={filters} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FB TV Simülasyonu */}
        <div className="lg:col-span-2">
          <GlassCard className="p-0 overflow-hidden">
            <div className="relative aspect-video bg-fb-navy-800">
              {/* Simüle Edilen Canlı Yayın */}
              <div className="absolute inset-0 flex items-center justify-center bg-fb-navy-900">
                <div className="text-center">
                  <HelpCircle size={48} className="mx-auto text-fb-gold-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{activeChannel.name}</h3>
                  <p className="text-fb-gold-500">Canlı Yayın Simülasyonu</p>
                </div>
              </div>

              {/* Kontrol Paneli */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={activeChannel.id}
                      onChange={(e) => setActiveChannel(liveChannels.find(c => c.id === e.target.value)!)}
                      className="bg-fb-navy-800/50 text-white text-sm rounded px-2 py-1"
                    >
                      {liveChannels.map(channel => (
                        <option key={channel.id} value={channel.id}>{channel.name}</option>
                      ))}
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Tam Ekranı Kapat' : 'Tam Ekrana Geç'}
                    >
                      <Maximize2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Haber Kartları */}
        <div className="space-y-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Newspaper size={20} /> AI Haberleri
              </h2>
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
            <NewsGrid newsItems={filteredNews} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}