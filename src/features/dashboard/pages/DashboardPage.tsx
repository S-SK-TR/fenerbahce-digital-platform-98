import { HeroBanner } from '../components/HeroBanner'
import { NextMatchWidget } from '../components/NextMatchWidget'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import { RefreshCw, Newspaper, Video, Users } from 'lucide-react'
import { useAIContent } from '@/features/ai-content/hooks/useAIContent'

interface DashboardPageProps {
  className?: string
}

export function DashboardPage({ className }: DashboardPageProps) {
  const { fetchAIContent, isLoading, showNotification } = useAppStore()
  const { aiContent, fetchContent } = useAIContent()

  const handleViewMatchDetails = () => {
    console.log('Maç detayları gösterilecek')
  }

  const handleRefreshContent = async (type: 'news' | 'matches' | 'highlights' | 'fanStories') => {
    try {
      await fetchContent(type)
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6 ${className}`}
    >
      {/* Hero Banner - 2x1 grid cell */}
      <div className="md:col-span-2 md:row-span-2">
        <HeroBanner
          title="Fenerbahçe'ye Hoş Geldiniz"
          subtitle="En son haberleri ve maç bilgilerini takip edin"
          ctaText="Haberlere Göz At"
          ctaLink="/news"
        />
      </div>

      {/* Next Match Widget - 1x1 grid cell */}
      <div>
        <NextMatchWidget
          team1="Fenerbahçe"
          team2="Galatasaray"
          date="2023-11-15"
          time="20:45"
          location="Şükrü Saracoğlu Stadyumu"
          onViewDetails={handleViewMatchDetails}
        />
      </div>

      {/* AI Content Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* News Widget */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Newspaper size={20} className="text-blue-500" />
              <h3 className="font-semibold">AI Haberleri</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRefreshContent('news')}
              loading={isLoading}
              icon={RefreshCw}
            />
          </div>
          <ul className="space-y-3">
            {aiContent.news.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm">
                <span className="text-blue-500 mr-2">•</span>{item}
              </li>
            ))}
          </ul>
        </div>

        {/* Matches Widget */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-green-500" />
              <h3 className="font-semibold">AI Maç Tahminleri</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRefreshContent('matches')}
              loading={isLoading}
              icon={RefreshCw}
            />
          </div>
          <ul className="space-y-3">
            {aiContent.matches.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm">
                <span className="text-green-500 mr-2">•</span>{item}
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights Widget */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Video size={20} className="text-purple-500" />
              <h3 className="font-semibold">AI Öne Çıkanlar</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRefreshContent('highlights')}
              loading={isLoading}
              icon={RefreshCw}
            />
          </div>
          <ul className="space-y-3">
            {aiContent.highlights.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm">
                <span className="text-purple-500 mr-2">•</span>{item}
              </li>
            ))}
          </ul>
        </div>

        {/* Fan Stories Widget */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-yellow-500" />
              <h3 className="font-semibold">AI Fan Hikayeleri</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRefreshContent('fanStories')}
              loading={isLoading}
              icon={RefreshCw}
            />
          </div>
          <ul className="space-y-3">
            {aiContent.fanStories.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm">
                <span className="text-yellow-500 mr-2">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}