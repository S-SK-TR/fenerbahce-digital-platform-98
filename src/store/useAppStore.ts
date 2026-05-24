import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MembershipFormData } from '@/features/membership/types'
import { Product, CartItem } from '@/features/store/types'
import { MatchPrediction } from '@/features/fixtures/types'
import { ContentTypeAnalytics } from '@/features/analytics/types'
import { FeedbackType, FeedbackData } from '@/features/ai-content/types'

interface AIContent {
  news: string[]
  matches: string[]
  highlights: string[]
  fanStories: string[]
}

interface UserPreferences {
  contentTypes: string[]
  feedbackTypes: FeedbackType[]
}

interface AppState {
  theme: 'light' | 'dark'
  pwaUpdateAvailable: boolean
  notificationPermission: 'default' | 'granted' | 'denied'
  selectedSeats: string[]
  membershipFormData?: MembershipFormData
  cartItems: CartItem[]
  aiContent: AIContent
  matchPredictions: Record<string, MatchPrediction>
  analyticsData: ContentTypeAnalytics[]
  userPreferences: UserPreferences
  feedbackHistory: FeedbackData[]
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
  fetchAIContent: () => Promise<void>
  generateContent: (type: keyof AIContent, content: string[]) => void
  clearAIContent: () => void
  addMatchPrediction: (prediction: MatchPrediction) => void
  getMatchPrediction: (matchId: string) => MatchPrediction | undefined
  setAnalyticsData: (data: ContentTypeAnalytics[]) => void
  setUserPreferences: (preferences: UserPreferences) => void
  addFeedback: (feedback: FeedbackData) => void
  getFeedbackHistory: () => FeedbackData[]
}

type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      pwaUpdateAvailable: false,
      notificationPermission: 'default',
      selectedSeats: [],
      membershipFormData: undefined,
      cartItems: [],
      aiContent: {
        news: [],
        matches: [],
        highlights: [],
        fanStories: []
      },
      matchPredictions: {},
      analyticsData: [],
      userPreferences: {
        contentTypes: [],
        feedbackTypes: []
      },
      feedbackHistory: [],
      
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
      })),
      
      fetchAIContent: async () => {
        // API çağrısı simülasyonu
        const mockData = {
          news: ['Haber 1', 'Haber 2'],
          matches: ['Maç 1', 'Maç 2'],
          highlights: ['Öne çıkan 1', 'Öne çıkan 2'],
          fanStories: ['Fan hikayesi 1', 'Fan hikayesi 2']
        }
        set({ aiContent: mockData })
      },
      
      generateContent: (type, content) => set((state) => ({
        aiContent: {
          ...state.aiContent,
          [type]: [...state.aiContent[type], ...content]
        }
      })),
      
      clearAIContent: () => set({
        aiContent: {
          news: [],
          matches: [],
          highlights: [],
          fanStories: []
        }
      }),
      
      addMatchPrediction: (prediction) => set((state) => ({
        matchPredictions: {
          ...state.matchPredictions,
          [prediction.id]: prediction
        }
      })),
      
      getMatchPrediction: (matchId) => get().matchPredictions[matchId],
      setAnalyticsData: (data) => set({ analyticsData: data }),
      setUserPreferences: (preferences) => set({ userPreferences: preferences }),
      addFeedback: (feedback) => set((state) => ({
        feedbackHistory: [...state.feedbackHistory, feedback]
      })),
      getFeedbackHistory: () => get().feedbackHistory
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        notificationPermission: state.notificationPermission,
        selectedSeats: state.selectedSeats,
        membershipFormData: state.membershipFormData,
        cartItems: state.cartItems,
        aiContent: state.aiContent,
        matchPredictions: state.matchPredictions,
        analyticsData: state.analyticsData,
        userPreferences: state.userPreferences,
        feedbackHistory: state.feedbackHistory
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