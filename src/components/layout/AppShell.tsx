import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, BarChart2, Settings, Bell, Home, Users, Calendar, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', ariaLabel: 'Ana panel' },
  { to: '/analytics', icon: BarChart2, label: 'Analitik', ariaLabel: 'Analitik veriler' },
  { to: '/members', icon: Users, label: 'Üyeler', ariaLabel: 'Üye yönetimi' },
  { to: '/events', icon: Calendar, label: 'Etkinlikler', ariaLabel: 'Etkinlik takvimi' },
  { to: '/settings', icon: Settings, label: 'Ayarlar', ariaLabel: 'Uygulama ayarları' },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
}

export function AppShell() {
  return (
    <div className="flex h-dvh bg-fb-navy-900 text-white overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 border-r border-fb-navy-800 glass-navbar shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-fb-navy-800">
          <span className="font-bold text-xl tracking-tight text-fb-gold-500">Fenerbahçe</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, ariaLabel }) => (
            <NavLink
              key={to}
              to={to}
              end
              aria-label={ariaLabel}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-fb-gold-500/10 text-fb-gold-500 border-l-2 border-fb-gold-500"
                  : "text-white/70 hover:bg-fb-navy-800 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-fb-navy-800">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-fb-navy-800 transition-colors">
            <img src="/avatar.png" className="w-8 h-8 rounded-full object-cover" alt="avatar" />
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold">Fenerbahçe Fan</p>
              <p className="text-xs text-white/50">fan@fenerbahce.com</p>
            </div>
            <Shield size={14} className="text-white/50" />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6 glass-navbar">
          <h1 className="font-semibold text-white">Dashboard</h1>
          <button className="relative p-2 rounded-lg hover:bg-fb-navy-800 transition-colors" aria-label="Bildirimler">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fb-gold-500 rounded-full" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* ── Mobile Bottom Navigation (PWA Safe Area) ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-navbar pb-[env(safe-area-inset-bottom)]" aria-label="Mobile navigasyon">
        <div className="flex h-16">
          {navItems.map(({ to, icon: Icon, label, ariaLabel }) => (
            <NavLink
              key={to}
              to={to}
              end
              aria-label={ariaLabel}
              className={({ isActive }) => cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                isActive ? "text-fb-gold-500" : "text-white/70"
              )}
            >
              <Icon size={22} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}