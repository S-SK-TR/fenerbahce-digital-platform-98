import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles conditional classes', () => {
    expect(cn('bg-red-500', { 'text-white': true, 'text-black': false })).toBe('bg-red-500 text-white')
  })

  it('handles array of classes', () => {
    expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white')
  })

  it('handles undefined/null values', () => {
    expect(cn('bg-red-500', undefined, null, 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles tailwind-merge functionality', () => {
    // This tests the twMerge functionality which handles conflicting Tailwind classes
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })
})
