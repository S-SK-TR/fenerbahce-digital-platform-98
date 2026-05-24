import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, BarChart2, Settings, Bell, Home, Users, Calendar, Shield, HelpCircle, Newspaper, Trophy, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useNotification } from '@/hooks/useNotification'
import useAppStore from '@/store/useAppStore'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navItems = [
  { to: '/', icon: Home, label: 'Ana Sayfa', ariaLabel: 'Ana sayfa' },
  { to: '/news', icon: Newspaper, label: 'Haberler', ariaLabel: 'Fenerbahçe haberleri' },
  { to: '/fixtures', icon: Trophy, label: 'Fikstür', ariaLabel: 'Maç fikstürleri ve puan durumu' },
  { to: '/membership', icon: Shield, label: 'Üyelik', ariaLabel: 'Üyelik bilgileri' },
  { to: '/store/fenerium', icon: Music, label: 'Fenerium', ariaLabel: 'Fenerbahçe mağazası' },
  { to: '/fanzone', icon: Music, label: 'Fan Zone', ariaLabel: 'Taraftar aktiviteleri' },
  { to: '/settings', icon: Settings, label: 'Ayarlar', ariaLabel: 'Uygulama ayarları' }
]

export { navItems }

export function AppShell() {
  const { requestPermission, showNotification } = useNotification();
  const { notificationPermission, setNotificationPermission, theme } = useAppStore();

  const handleNotificationClick = async () => {
    if (notificationPermission === 'granted') {
      await showNotification({
        title: 'Test Bildirimi',
        body: 'Bildirim sistemi çalışıyor',
        tag: 'test-notification'
      });
    } else {
      const granted = await requestPermission();
      if (granted) {
        setNotificationPermission('granted');
        await showNotification({
          title: 'Bildirimler Etkin',
          body: 'Artık maç haberlerini alacaksınız',
          tag: 'permission-granted'
        });
      } else {
        setNotificationPermission('denied');
      }
    }
  };

  return (
    <div className={`flex h-dvh ${theme === 'dark' ? 'bg-fb-navy-900 text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden`}>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border)] glass-navbar shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)]">
          <span className="font-bold text-xl tracking-tight text-fb-gold-500">Fenerbahçe</span>
          <ThemeToggle className="text-[var(--text-primary)]" />
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
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bildirim Ayarı */}
        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={handleNotificationClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
            aria-label={notificationPermission === 'granted' ? 'Bildirimleri test et' : 'Bildirim izni iste'}
          >
            <Bell size={18} />
            <span className="text-sm">
              {notificationPermission === 'granted' ? 'Bildirimleri Test Et' : 'Bildirimleri Etkinleştir'}
            </span>
          </button>
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-[var(--border)]">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-surface)] transition-colors">
            <img src="/avatar.png" className="w-8 h-8 rounded-full object-cover" alt="avatar" />
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold">Fenerbahçe Fan</p>
              <p className="text-xs text-[var(--text-muted)]">fan@fenerbahce.com</p>
            </div>
            <Shield size={14} className="text-[var(--text-muted)]" />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6 glass-navbar">
          <h1 className="font-semibold text-[var(--text-primary)]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
              aria-label={notificationPermission === 'granted' ? 'Bildirimleri test et' : 'Bildirim izni iste'}
            >
              <Bell size={20} />
              {notificationPermission !== 'granted' && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fb-gold-500 rounded-full" />
              )}
            </button>
            <ThemeToggle className="text-[var(--text-primary)]" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
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
                isActive ? "text-fb-gold-500" : "text-[var(--text-muted)]"
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