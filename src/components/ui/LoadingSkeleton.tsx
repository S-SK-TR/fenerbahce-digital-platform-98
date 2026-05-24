import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'grid' | 'banner'
  className?: string
}

export function LoadingSkeleton({ type, className }: LoadingSkeletonProps) {
  const skeleton = {
    card: (
      <div className={cn("glass-card rounded-2xl p-6 space-y-4", className)}>
        <div className="h-6 w-3/4 bg-fb-navy-800/20 rounded animate-pulse" />
        <div className="h-4 w-full bg-fb-navy-800/10 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-fb-navy-800/10 rounded animate-pulse" />
      </div>
    ),
    list: (
      <div className={cn("space-y-4", className)}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
            <div className="h-12 w-12 bg-fb-navy-800/20 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-fb-navy-800/10 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-fb-navy-800/10 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    ),
    grid: (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 space-y-4">
            <div className="h-48 bg-fb-navy-800/20 rounded-lg animate-pulse" />
            <div className="h-5 w-3/4 bg-fb-navy-800/10 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-fb-navy-800/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    ),
    banner: (
      <div className={cn("glass-card rounded-2xl p-8 space-y-6", className)}>
        <div className="h-64 bg-fb-navy-800/20 rounded-xl animate-pulse" />
        <div className="h-6 w-2/3 bg-fb-navy-800/10 rounded animate-pulse mx-auto" />
        <div className="h-4 w-1/2 bg-fb-navy-800/10 rounded animate-pulse mx-auto" />
      </div>
    )
  }[type]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {skeleton}
    </motion.div>
  )
}