import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { NewsFeedPage } from '@/features/news/pages/NewsFeedPage'
import { FixturesPage } from '@/features/fixtures/pages/FixturesPage'
import { SeatSelectionPage } from '@/features/tickets/pages/SeatSelectionPage'
import { MembershipPortal } from '@/features/membership/pages/MembershipPortal'
import { FeneriumPage } from '@/features/store/pages/FeneriumPage'
import { FanZonePage } from '@/features/fanzone/pages/FanZonePage'
import { AnalyticsDashboard } from '@/features/analytics/pages/AnalyticsDashboard'

interface AppRoutesProps {
  navItems: Array<{
    to: string
    icon: React.ElementType
    label: string
    ariaLabel: string
  }>
}

export function AppRoutes({ navItems }: AppRoutesProps) {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/news" element={<NewsFeedPage />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/tickets/seat-selection" element={<SeatSelectionPage eventId="event-123" />} />
        <Route path="/membership" element={<MembershipPortal />} />
        <Route path="/store/fenerium" element={<FeneriumPage />} />
        <Route path="/fanzone" element={<FanZonePage />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}