import { useState, useEffect, useRef } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'

interface UseTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  gyroscope?: boolean
}

export function useTilt(options: UseTiltOptions = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    gyroscope = true
  } = options

  const elementRef = useRef<HTMLDivElement>(null)
  const [isTiltActive, setIsTiltActive] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-1, 1], [`${maxTilt}deg`, `-${maxTilt}deg`])
  const rotateY = useTransform(x, [-1, 1], [`-${maxTilt}deg`, `${maxTilt}deg`])

  useEffect(() => {
    if (!elementRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const xPct = mouseX / (rect.width / 2)
      const yPct = mouseY / (rect.height / 2)

      x.set(xPct)
      y.set(yPct)
    }

    const handleMouseEnter = () => setIsTiltActive(true)
    const handleMouseLeave = () => {
      setIsTiltActive(false)
      x.set(0)
      y.set(0)
    }

    elementRef.current.addEventListener('mousemove', handleMouseMove)
    elementRef.current.addEventListener('mouseenter', handleMouseEnter)
    elementRef.current.addEventListener('mouseleave', handleMouseLeave)

    if (gyroscope) {
      const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
        if (!isTiltActive) return

        const { beta, gamma } = e
        if (beta === null || gamma === null) return

        const xPct = (gamma / 90) * 0.5
        const yPct = (beta / 90) * 0.5

        x.set(xPct)
        y.set(yPct)
      }

      window.addEventListener('deviceorientation', handleDeviceOrientation)
      return () => window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('mousemove', handleMouseMove)
        elementRef.current.removeEventListener('mouseenter', handleMouseEnter)
        elementRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [maxTilt, gyroscope, isTiltActive, x, y])

  return {
    ref: elementRef,
    style: {
      perspective,
      transformStyle: 'preserve-3d' as const,
      transform: isTiltActive ? `rotateX(${rotateX.get()}) rotateY(${rotateY.get()}) scale3d(${scale}, ${scale}, ${scale})` : undefined,
      transition: isTiltActive ? 'none' : 'transform 0.3s ease-out'
    }
  }
}