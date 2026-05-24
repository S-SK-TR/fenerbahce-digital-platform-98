import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'navy' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ElementType
}

export function Button({
  variant = 'gold',
  size = 'md',
  loading,
  icon: Icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        {
          'bg-[#D4AF37] hover:bg-[#B8860B] text-[#002F6C] shadow-md shadow-[#D4AF37]/20': variant === 'gold',
          'bg-[#002F6C] hover:bg-[#00234B] text-white shadow-md shadow-[#002F6C]/20': variant === 'navy',
          'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200': variant === 'ghost',
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
          'opacity-50 cursor-not-allowed': disabled || loading
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </motion.button>
  )
}