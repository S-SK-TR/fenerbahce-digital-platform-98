import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Wallpaper } from '../types'

interface WallpaperGalleryProps {
  wallpapers: Wallpaper[]
}

export function WallpaperGallery({ wallpapers }: WallpaperGalleryProps) {
  const [downloadedIds, setDownloadedIds] = useState<string[]>([])

  const handleDownload = (wallpaper: Wallpaper) => {
    const link = document.createElement('a')
    link.href = wallpaper.downloadUrl
    link.download = `${wallpaper.name}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloadedIds([...downloadedIds, wallpaper.id])
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wallpapers.map((wallpaper) => (
        <motion.div
          key={wallpaper.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="relative aspect-video bg-fb-navy-800">
            <img
              src={wallpaper.imageUrl}
              alt={wallpaper.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fb-navy-900/70 to-transparent"></div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{wallpaper.name}</h3>
            <motion.button
              onClick={() => handleDownload(wallpaper)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors",
                downloadedIds.includes(wallpaper.id)
                  ? "bg-green-500/20 text-green-400 cursor-default"
                  : "bg-fb-gold-500 text-fb-navy-900 hover:bg-fb-gold-400"
              )}
            >
              {downloadedIds.includes(wallpaper.id) ? (
                <>
                  <Check size={16} />
                  İndirildi
                </>
              ) : (
                <>
                  <Download size={16} />
                  İndir (1920x1080)
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}