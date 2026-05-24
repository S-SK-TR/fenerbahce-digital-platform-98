import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/store/useAppStore'
import { useNavigate } from 'react-router-dom'

interface HeroBannerProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

export function HeroBanner({ title, subtitle, ctaText, ctaLink }: HeroBannerProps) {
  const navigate = useNavigate()
  const { theme } = useStore()

  return (
    <GlassCard className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 p-6 md:p-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">{title}</h1>
        <p className="text-lg text-[var(--text-muted)] mb-6">{subtitle}</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate(ctaLink)}
        >
          {ctaText}
        </Button>
      </motion.div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
    </GlassCard>
  )
}