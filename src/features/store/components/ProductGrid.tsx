import { Product } from '../types'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import useAppStore from '@/store/useAppStore'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const addToCart = useAppStore(state => state.addToCart)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <GlassCard className="h-full flex flex-col">
            <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {product.isFeatured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-xs font-bold px-2 py-1 rounded-full">Öne Çıkan</div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-lg font-bold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-400 mb-2 flex-1">{product.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold">₺{product.price.toFixed(2)}</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => addToCart(product)}
                  icon={ShoppingCart}
                >
                  Sepete Ekle
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}