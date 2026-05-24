import { HeroBanner } from '../components/HeroBanner'
import { NextMatchWidget } from '../components/NextMatchWidget'
import { motion } from 'framer-motion'

interface DashboardPageProps {
  className?: string
}

export function DashboardPage({ className }: DashboardPageProps) {
  const handleViewMatchDetails = () => {
    console.log('Maç detayları gösterilecek')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6 ${className}`}
    >
      {/* Hero Banner - 2x1 grid cell */}
      <div className="md:col-span-2 md:row-span-2">
        <HeroBanner
          title="Fenerbahçe'ye Hoş Geldiniz"
          subtitle="En son haberleri ve maç bilgilerini takip edin"
          ctaText="Haberlere Göz At"
          ctaLink="/news"
        />
      </div>

      {/* Next Match Widget - 1x1 grid cell */}
      <div>
        <NextMatchWidget
          team1="Fenerbahçe"
          team2="Galatasaray"
          date="2023-11-15"
          time="20:45"
          location="Şükrü Saracoğlu Stadyumu"
          onViewDetails={handleViewMatchDetails}
        />
      </div>

      {/* Placeholder for future widgets */}
      <div className="md:col-span-1">
        <div className="h-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 flex items-center justify-center">
          <p className="text-[var(--text-muted)]">Yakında gelecek içerik</p>
        </div>
      </div>
    </motion.div>
  )
}