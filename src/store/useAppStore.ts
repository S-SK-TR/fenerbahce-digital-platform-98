import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MembershipFormData } from '@/features/membership/types'
import { Product, CartItem } from '@/features/store/types'

interface AppState {
  theme: 'light' | 'dark'
  pwaUpdateAvailable: boolean
  notificationPermission: 'default' | 'granted' | 'denied'
  selectedSeats: string[]
  membershipFormData?: MembershipFormData
  cartItems: CartItem[]
}

interface AppActions {
  setTheme: (theme: 'light' | 'dark') => void
  setPwaUpdateAvailable: (available: boolean) => void
  setNotificationPermission: (status: 'default' | 'granted' | 'denied') => void
  setSelectedSeats: (seats: string[]) => void
  setMembershipFormData: (data: MembershipFormData) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

type AppStore = AppState & AppActions

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      pwaUpdateAvailable: false,
      notificationPermission: 'default',
      selectedSeats: [],
      membershipFormData: undefined,
      cartItems: [],
      
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
      setPwaUpdateAvailable: (available) => set({ pwaUpdateAvailable: available }),
      setNotificationPermission: (status) => set({ notificationPermission: status }),
      setSelectedSeats: (seats) => set({ selectedSeats: seats }),
      setMembershipFormData: (data) => set({ membershipFormData: data }),
      
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id)
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          }
        }
        return {
          cartItems: [...state.cartItems, { ...product, quantity: 1 }]
        }
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      }))
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        notificationPermission: state.notificationPermission,
        selectedSeats: state.selectedSeats,
        membershipFormData: state.membershipFormData,
        cartItems: state.cartItems
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark')
        }
      }
    }
  )
)

export default useAppStore