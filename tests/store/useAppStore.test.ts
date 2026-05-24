import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAppStore from '@/store/useAppStore'
import { MembershipFormData } from '@/features/membership/types'
import { Product } from '@/features/store/types'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 100,
  image: 'test.jpg'
}

const mockMembershipFormData: MembershipFormData = {
  name: 'Test User',
  email: 'test@example.com',
  membershipType: 'standard'
}

describe('useAppStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useAppStore.setState(useAppStore.getState())
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAppStore())
    expect(result.current.theme).toBe('dark')
    expect(result.current.pwaUpdateAvailable).toBe(false)
    expect(result.current.notificationPermission).toBe('default')
    expect(result.current.selectedSeats).toEqual([])
    expect(result.current.membershipFormData).toBeUndefined()
    expect(result.current.cartItems).toEqual([])
  })

  it('should update theme', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setTheme('light')
    })
    expect(result.current.theme).toBe('light')
  })

  it('should update notification permission', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setNotificationPermission('granted')
    })
    expect(result.current.notificationPermission).toBe('granted')
  })

  it('should add product to cart', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.addToCart(mockProduct)
    })
    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0].quantity).toBe(1)
  })

  it('should update product quantity in cart', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.updateQuantity(mockProduct.id, 3)
    })
    expect(result.current.cartItems[0].quantity).toBe(3)
  })

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.removeFromCart(mockProduct.id)
    })
    expect(result.current.cartItems).toHaveLength(0)
  })

  it('should update membership form data', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setMembershipFormData(mockMembershipFormData)
    })
    expect(result.current.membershipFormData).toEqual(mockMembershipFormData)
  })

  it('should update selected seats', () => {
    const { result } = renderHook(() => useAppStore())
    act(() => {
      result.current.setSelectedSeats(['A1', 'A2'])
    })
    expect(result.current.selectedSeats).toEqual(['A1', 'A2'])
  })
})
