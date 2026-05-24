import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, MapPin, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NextMatchProps {
  team1: string
  team2: string
  date: string
  time: string
  location: string
  onViewDetails: () => void
}

export function NextMatchWidget({
  team1,
  team2,
  date,
  time,
  location,
  onViewDetails
}: NextMatchProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const matchDate = new Date(`${date}T${time}`)
    const now = new Date()

    if (now >= matchDate) {
      setIsLive(true)
      return
    }

    const interval = setInterval(() => {
      const now = new Date()
      const diff = matchDate.getTime() - now.getTime()

      if (diff <= 0) {
        setIsLive(true)
        clearInterval(interval)
        return
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [date, time])

  const flipAnimation = {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 }
  }

  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={flipAnimation}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative w-16 h-20 bg-[var(--bg-surface)] rounded-xl shadow-lg overflow-hidden"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-[var(--text-primary)]">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs text-[var(--text-muted)] uppercase">{label}</span>
      </div>
    </motion.div>
  )

  return (
    <GlassCard className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-500 font-bold">Fb</span>
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">
              {team1} vs {team2}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--text-muted)]">Yaklaşan Maç</div>
            <div className="text-xl font-bold text-[var(--text-primary)]">1</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-blue-500" />
            <span className="text-[var(--text-primary)]">{date}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-blue-500" />
            <span className="text-[var(--text-primary)]">{time}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-blue-500" />
            <span className="text-[var(--text-primary)]">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <AnimatePresence mode="wait">
            {isLive ? (
              <motion.div
                key="live"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="flex items-center gap-2 p-2 px-4 bg-amber-500/10 rounded-full"
              >
                <Zap size={16} className="text-amber-500 animate-pulse" />
                <span className="text-amber-500 font-bold">CANLI</span>
              </motion.div>
            ) : (
              <div className="flex items-center gap-4">
                <TimeCard value={countdown.days} label="Gün" />
                <TimeCard value={countdown.hours} label="Saat" />
                <TimeCard value={countdown.minutes} label="Dakika" />
                <TimeCard value={countdown.seconds} label="Saniye" />
              </div>
            )}
          </AnimatePresence>
        </div>

        <Button
          variant="secondary"
          size="md"
          className="w-full"
          onClick={onViewDetails}
        >
          Maç Detayları
        </Button>
      </motion.div>

      {/* Altın sarısı nabız indikatörü */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 rounded-full bg-amber-500/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
    </GlassCard>
  )
}