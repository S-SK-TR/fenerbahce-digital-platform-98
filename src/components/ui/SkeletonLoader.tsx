import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  className?: string
  lines?: number
  width?: string
  height?: string
}

export function SkeletonLoader({
  className = '',
  lines = 3,
  width = '100%',
  height = '16px'
}: SkeletonLoaderProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="bg-[var(--bg-surface)]/30 rounded-lg"
          style={{ width, height }}
        />
      ))}
    </div>
  )
}