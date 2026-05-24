import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Play, Pause, Volume2, VolumeX, Maximize2, HelpCircle, Newspaper } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  date: string
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Fenerbahçe, Şampiyonlar Ligi gruplarını açtı',
    content: 'Fenerbahçe, Şampiyonlar Ligi gruplarını açtı ve ilk maçında Barcelona ile karşılaştı.',
    imageUrl: 'https://example.com/fb-vs-barcelona.jpg',
    category: 'Futbol',
    date: '2023-09-20'
  },
  {
    id: '2',
    title: 'Yeni transfer haberleri',
    content: 'Fenerbahçe, yeni transferler hakkında bilgiler verdi.',
    imageUrl: 'https://example.com/transfer-haberleri.jpg',
    category: 'Transfer',
    date: '2023-09-19'
  },
  {
    id: '3',
    title: 'Kulüp tarihi',
    content: 'Fenerbahçe, 100. yılını kutladı.',
    imageUrl: 'https://example.com/kulup-tarihi.jpg',
    category: 'Kulüp',
    date: '2023-09-18'
  }
]

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const NewsFeedPage = () => {
  const [activeChannel, setActiveChannel] = useState(liveChannels[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const togglePlay = () => setIsPlaying(!isPlaying)
  const toggleMute = () => setIsMuted(!isMuted)
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
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
            {mockNews.map((news, index) => (
              <motion.div key={news.id} variants={itemVariants}>
                <GlassCard className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-fb-gold-500/10 text-fb-gold-500 text-xs font-medium px-2 py-1 rounded-full">
                          {news.category}
                        </span>
                        <span className="text-xs text-white/50">{news.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{news.title}</h3>
                      <p className="text-sm text-white/80 mb-3">{news.content}</p>
                      <Button variant="secondary" size="sm">Devamını Oku</Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NewsFeedPage