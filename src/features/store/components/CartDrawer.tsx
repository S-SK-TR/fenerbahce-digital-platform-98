import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import useAppStore from '@/store/useAppStore'
import { cn } from '@/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cartItems = useAppStore(state => state.cartItems)
  const removeFromCart = useAppStore(state => state.removeFromCart)
  const updateQuantity = useAppStore(state => state.updateQuantity)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md h-full bg-[var(--bg-surface)]/90 backdrop-blur-xl border-l border-[var(--border)] shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart size={20} />
                Sepetim
                <span className="text-sm font-normal text-[var(--text-muted)]">({cartItems.length} ürün)</span>
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose} icon={X} />
            </div>

            {/* Cart Items */}
            <div className="p-6 overflow-y-auto h-[calc(100%-200px)]">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={48} className="text-[var(--text-muted)] mb-4" />
                  <p className="text-lg font-medium mb-2">Sepetiniz Boş</p>
                  <p className="text-[var(--text-muted)]">Hemen alışverişe başlayın</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <GlassCard key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-[var(--text-muted)] mt-1">₺{item.price.toFixed(2)}</p>

                          <div className="flex items-center gap-2 mt-3">
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={Minus}
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            />
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={Plus}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            onClick={() => removeFromCart(item.id)}
                          />
                          <p className="font-medium">₺{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-6 border-t border-[var(--border)] bg-[var(--bg-surface)]/90 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Toplam:</span>
                <span className="text-xl font-bold">₺{total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={cartItems.length === 0}
              >
                Ödeme Yap
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}