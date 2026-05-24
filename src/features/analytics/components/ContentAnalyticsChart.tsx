import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { GlassCard } from '@/components/ui/GlassCard'
import { ContentTypeAnalytics } from '../types'
import { useState, useEffect } from 'react'

interface ContentAnalyticsChartProps {
  data: ContentTypeAnalytics[]
}

export function ContentAnalyticsChart({ data }: ContentAnalyticsChartProps) {
  const [chartMetrics, setChartMetrics] = useState({
    renderCount: 0,
    lastRenderTime: Date.now()
  })

  const chartData = data.map(item => ({
    name: item.type,
    views: item.data.views,
    likes: item.data.likes,
    shares: item.data.shares
  }))

  useEffect(() => {
    setChartMetrics(prev => ({
      renderCount: prev.renderCount + 1,
      lastRenderTime: Date.now()
    }))
  }, [data])

  return (
    <GlassCard className="h-[400px] p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">İçerik Performansı</h3>
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500">
            <p>Render Sayısı: {chartMetrics.renderCount}</p>
            <p>Son Render: {new Date(chartMetrics.lastRenderTime).toLocaleTimeString()}</p>
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="views" fill="#3b82f6" name="Görüntülenme" />
          <Bar dataKey="likes" fill="#10b981" name="Beğeni" />
          <Bar dataKey="shares" fill="#f59e0b" name="Paylaşım" />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  )
}