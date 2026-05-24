import { Link } from 'react-router-dom'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface NotFoundPageProps {
  className?: string
}

export function NotFoundPage({ className }: NotFoundPageProps) {
  return (
    <div className={cn("min-h-[calc(100dvh-64px)] flex items-center justify-center p-4", className)}>
      <GlassCard className="max-w-md w-full p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Sayfa Bulunamadı</h2>
          <p className="text-gray-400 mb-8">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Ana Sayfaya Dön
            </Button>
          </Link>
        </motion.div>
      </GlassCard>
    </div>
  )
}