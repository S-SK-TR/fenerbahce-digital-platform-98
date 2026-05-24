import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FileText, Image, Video, Music } from 'lucide-react'

interface EmptyStateProps {
  type: 'news' | 'fixtures' | 'content' | 'products' | 'fanzone'
  className?: string
}

export function EmptyState({ type, className }: EmptyStateProps) {
  const content = {
    news: {
      icon: FileText,
      title: 'Henüz haber yok',
      description: 'Yeni haberler için bekleyin veya manuel olarak yenileyin.',
      action: 'Haberleri yenile'
    },
    fixtures: {
      icon: Calendar,
      title: 'Fikstür bulunamadı',
      description: 'Yeni maçlar için bekleyin veya takvimleri kontrol edin.',
      action: 'Fikstürleri yenile'
    },
    content: {
      icon: Image,
      title: 'İçerik yok',
      description: 'AI tarafından üretilen içerikler burada görüntülenecek.',
      action: 'İçerik yenile'
    },
    products: {
      icon: ShoppingBag,
      title: 'Ürün bulunamadı',
      description: 'Mağazamızda henüz ürün yok.',
      action: 'Mağazayı yenile'
    },
    fanzone: {
      icon: Music,
      title: 'İçerik yok',
      description: 'Fan Zone için özel içerikler burada görüntülenecek.',
      action: 'İçerikleri yenile'
    }
  }[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center",
        "min-h-[300px] max-w-md mx-auto",
        className
      )}
    >
      <div className="p-4 rounded-full bg-fb-gold-500/10 text-fb-gold-500 mb-6">
        <content.icon size={32} />
      </div>
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{content.title}</h3>
      <p className="text-[var(--text-muted)] mb-6">{content.description}</p>
      <button
        onClick={() => window.location.reload()}
        className="btn-premium bg-fb-gold-500 hover:bg-fb-gold-600 text-fb-navy-900 px-6 py-2.5 rounded-lg font-medium"
      >
        {content.action}
      </button>
    </motion.div>
  )
}