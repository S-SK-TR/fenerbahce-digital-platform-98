import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles conditional classes', () => {
    expect(cn('bg-red-500', false && 'text-white')).toBe('bg-red-500')
    expect(cn('bg-red-500', true && 'text-white')).toBe('bg-red-500 text-white')
  })

  it('handles tailwind merge conflicts', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('handles array inputs', () => {
    expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white')
  })

  it('handles object inputs', () => {
    expect(cn({ 'bg-red-500': true, 'text-white': false })).toBe('bg-red-500')
  })
})
