import { renderHook, act } from '@testing-library/react'
import { useTilt } from '@/hooks/useTilt'

describe('useTilt', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTilt())
    expect(result.current.ref).toBeDefined()
    expect(result.current.style.perspective).toBe(1000)
  })

  it('should update tilt values on mouse move', () => {
    const { result } = renderHook(() => useTilt())
    const mockElement = document.createElement('div')
    mockElement.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100
    }))

    act(() => {
      result.current.ref.current = mockElement
    })

    // Simulate mouse move
    act(() => {
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 50,
        clientY: 50
      })
      mockElement.dispatchEvent(mouseMoveEvent)
    })

    // Verify tilt values are updated
    expect(result.current.style.transform).toContain('rotateX')
    expect(result.current.style.transform).toContain('rotateY')
  })

  it('should reset tilt on mouse leave', () => {
    const { result } = renderHook(() => useTilt())
    const mockElement = document.createElement('div')

    act(() => {
      result.current.ref.current = mockElement
    })

    // Simulate mouse enter
    act(() => {
      const mouseEnterEvent = new MouseEvent('mouseenter')
      mockElement.dispatchEvent(mouseEnterEvent)
    })

    // Simulate mouse leave
    act(() => {
      const mouseLeaveEvent = new MouseEvent('mouseleave')
      mockElement.dispatchEvent(mouseLeaveEvent)
    })

    expect(result.current.style.transform).toBeUndefined()
  })
})