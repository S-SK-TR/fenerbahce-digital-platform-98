import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import useAppStore from '@/store/useAppStore'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useAppStore()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition-colors ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </motion.button>
  )
}