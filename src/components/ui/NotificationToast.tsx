import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, Newspaper, Trophy, Music, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface NotificationToastProps {
  id: string
  type: 'news' | 'fixture' | 'fanzone' | 'membership'
  title: string
  message: string
  link?: string
  onClose: () => void
}

export function NotificationToast({ id, type, title, message, link, onClose }: NotificationToastProps) {
  const navigate = useNavigate()

  const getIcon = () => {
    switch (type) {
      case 'news': return <Newspaper size={20} />
      case 'fixture': return <Trophy size={20} />
      case 'fanzone': return <Music size={20} />
      case 'membership': return <Shield size={20} />
      default: return <Bell size={20} />
    }
  }

  const handleClick = () => {
    if (link) {
      navigate(link)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', damping: 25, stiffness: 500 }}
        className={cn(
          "fixed bottom-4 right-4 z-50 w-80 glass-card",
          "flex items-start gap-3 p-4 rounded-xl shadow-lg cursor-pointer",
          link ? 'hover:shadow-xl' : '',
          type === 'news' && 'border-l-4 border-fb-gold-500',
          type === 'fixture' && 'border-l-4 border-fb-red-500',
          type === 'fanzone' && 'border-l-4 border-fb-blue-500',
          type === 'membership' && 'border-l-4 border-fb-yellow-500'
        )}
        onClick={handleClick}
      >
        <div className={cn(
          "p-2 rounded-lg flex-shrink-0",
          type === 'news' && 'bg-fb-gold-500/10 text-fb-gold-500',
          type === 'fixture' && 'bg-fb-red-500/10 text-fb-red-500',
          type === 'fanzone' && 'bg-fb-blue-500/10 text-fb-blue-500',
          type === 'membership' && 'bg-fb-yellow-500/10 text-fb-yellow-500'
        )}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-0.5 truncate">{title}</h3>
          <p className="text-xs text-[var(--text-muted)] line-clamp-2">{message}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="p-1 rounded-full hover:bg-[var(--bg-elevated)] transition-colors"
          aria-label="Bildirimi kapat"
        >
          <X size={16} className="text-[var(--text-muted)]" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}