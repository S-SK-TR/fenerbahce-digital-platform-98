import { useState } from 'react'
import { ProductGrid } from '../components/ProductGrid'
import { CartDrawer } from '../components/CartDrawer'
import { Button } from '@/components/ui/Button'
import { ShoppingCart, Filter, Search } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import useAppStore from '@/store/useAppStore'
import { Product } from '../types'

const mockProducts: Product[] = [
  {
    id: 'fenerium-tshirt',
    name: 'Fenerbahçe T-Shirt',
    description: 'Yüksek kaliteli, konforlu Fenerbahçe forması',
    price: 199.99,
    imageUrl: 'https://example.com/fenerbahce-tshirt.jpg',
    category: 'Giyim',
    stock: 50,
    rating: 4.8,
    isFeatured: true
  },
  {
    id: 'fenerium-cap',
    name: 'Fenerbahçe Şapka',
    description: 'Kumaş şapka, rahat ve dayanıklı',
    price: 99.99,
    imageUrl: 'https://example.com/fenerbahce-cap.jpg',
    category: 'Aksesuar',
    stock: 30,
    rating: 4.5
  },
  {
    id: 'fenerium-mug',
    name: 'Fenerbahçe Termos',
    description: '350ml kapasiteli, çelik termos',
    price: 79.99,
    imageUrl: 'https://example.com/fenerbahce-mug.jpg',
    category: 'Ev & Yaşam',
    stock: 40,
    rating: 4.7
  },
  {
    id: 'fenerium-keychain',
    name: 'Fenerbahçe Anahtarlık',
    description: 'Paslanmaz çelik anahtarlık',
    price: 29.99,
    imageUrl: 'https://example.com/fenerbahce-keychain.jpg',
    category: 'Aksesuar',
    stock: 100,
    rating: 4.3
  },
  {
    id: 'fenerium-poster',
    name: 'Fenerbahçe Poster',
    description: 'A4 boyutlu, mat baskı',
    price: 49.99,
    imageUrl: 'https://example.com/fenerbahce-poster.jpg',
    category: 'Ev & Yaşam',
    stock: 25,
    rating: 4.6
  },
  {
    id: 'fenerium-sticker',
    name: 'Fenerbahçe Çıkartma',
    description: 'Yapışkanlı, 5x5cm boyutunda',
    price: 9.99,
    imageUrl: 'https://example.com/fenerbahce-sticker.jpg',
    category: 'Aksesuar',
    stock: 150,
    rating: 4.2
  }
]

export function FeneriumPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartItems = useAppStore(state => state.cartItems)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Fenerium Mağaza</h1>
          <p className="text-[var(--text-muted)]">Resmi Fenerbahçe lisanslı ürünler</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Filter}>Filtrele</Button>
          <Button variant="secondary" icon={Search}>Ara</Button>
          <Button
            variant="primary"
            icon={ShoppingCart}
            onClick={() => setIsCartOpen(true)}
          >
            Sepet ({cartItems.length})
          </Button>
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Öne Çıkan Ürünler</h2>
        <ProductGrid products={mockProducts.filter(p => p.isFeatured)} />
      </section>

      {/* All Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Tüm Ürünler</h2>
        <ProductGrid products={mockProducts} />
      </section>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}