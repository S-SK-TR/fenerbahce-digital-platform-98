import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTilt } from '@/hooks/useTilt'
import { SkeletonLoader } from './SkeletonLoader'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  tilt?: boolean
  isLoading?: boolean
}

export function GlassCard({
  children,
  className,
  tilt = true,
  isLoading = false,
  ...props
}: GlassCardProps) {
  const { ref, style } = useTilt({ maxTilt: 10, scale: 1.02 })

  return (
    <motion.div
      ref={tilt ? ref : undefined}
      style={tilt ? style : undefined}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: tilt ? undefined : 1.01, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card bg-[var(--bg-surface)]/50 border border-[var(--border)]/30 rounded-2xl p-6",
        "backdrop-blur-xl shadow-lg shadow-[var(--border)]/10",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <SkeletonLoader className="w-full" lines={4} />
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-8 bg-[var(--bg-surface)]/30 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </motion.div>
  )
}