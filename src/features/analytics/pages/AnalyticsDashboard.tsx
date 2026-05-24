import { useEffect, useState } from 'react'
import { ContentAnalyticsChart } from '../components/ContentAnalyticsChart'
import { ContentAnalyticsCard } from '../components/ContentAnalyticsCard'
import { ContentTypeAnalytics } from '../types'
import useAppStore from '@/store/useAppStore'
import { motion } from 'framer-motion'

const mockAnalyticsData: ContentTypeAnalytics[] = [
  { type: 'news', data: { views: 1245, likes: 342, shares: 187 } },
  { type: 'matches', data: { views: 876, likes: 567, shares: 234 } },
  { type: 'highlights', data: { views: 456, likes: 234, shares: 123 } },
  { type: 'fanStories', data: { views: 321, likes: 123, shares: 89 } }
]

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<ContentTypeAnalytics[]>([])
  const { fetchAIContent } = useAppStore()
  const [dashboardMetrics, setDashboardMetrics] = useState({
    loadCount: 0,
    lastLoadTime: Date.now()
  })

  useEffect(() => {
    // Gerçek uygulamada API çağrısı yapılacak
    fetchAIContent()
    setAnalyticsData(mockAnalyticsData)
    setDashboardMetrics(prev => ({
      loadCount: prev.loadCount + 1,
      lastLoadTime: Date.now()
    }))
  }, [fetchAIContent])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6 max-w-7xl mx-auto w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI İçerik Analizi</h1>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500">
            <p>Yükleme Sayısı: {dashboardMetrics.loadCount}</p>
            <p>Son Yükleme: {new Date(dashboardMetrics.lastLoadTime).toLocaleTimeString()}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analyticsData.map((item) => (
          <ContentAnalyticsCard key={item.type} analytics={item} />
        ))}
      </div>
      <ContentAnalyticsChart data={analyticsData} />
    </motion.div>
  )
}