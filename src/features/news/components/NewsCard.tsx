import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { FeedbackButtons } from '@/features/ai-content/components/FeedbackButtons'

interface NewsCardProps {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  date: string
  teamLogos?: string[]
}

export function NewsCard({ id, title, content, imageUrl, category, date, teamLogos }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-fb-gold-500/10 text-fb-gold-500 text-xs font-medium px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="text-xs text-white/50">{date}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-white/80 mb-3">{content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm">Devamını Oku</Button>
                {teamLogos && (
                  <div className="flex -space-x-2">
                    {teamLogos.map((logo, index) => (
                      <img
                        key={index}
                        src={logo}
                        alt={`Takım ${index + 1}`}
                        className="w-8 h-8 rounded-full border-2 border-fb-navy-800"
                      />
                    ))}
                  </div>
                )}
              </div>
              <FeedbackButtons contentId={id} contentType="news" />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}