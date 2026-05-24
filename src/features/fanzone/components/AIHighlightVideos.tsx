import { motion } from 'framer-motion'
import { Play, Clock } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { FeedbackButtons } from '@/features/ai-content/components/FeedbackButtons'

interface HighlightVideo {
  id: string
  title: string
  thumbnailUrl: string
  duration: string
  selectedDate: string
  videoUrl: string
}

interface AIHighlightVideosProps {
  videos: HighlightVideo[]
}

export function AIHighlightVideos({ videos }: AIHighlightVideosProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full p-2"
                  onClick={() => window.open(video.videoUrl, '_blank')}
                >
                  <Play size={16} />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{video.title}</h3>
                <FeedbackButtons contentId={video.id} contentType="highlight" />
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock size={12} />
                <span>{video.duration}</span>
                <span>•</span>
                <span>{video.selectedDate}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}