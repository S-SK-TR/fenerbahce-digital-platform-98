import { useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { MembershipCardData } from '../types'
import { useTilt } from '@/hooks/useTilt'
import { cn } from '@/lib/utils'

interface MembershipCard3DProps {
  cardData: MembershipCardData
}

export function MembershipCard3D({ cardData }: MembershipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const controls = useAnimation()
  const { ref, style } = useTilt({ maxTilt: 15, scale: 1.05 })

  const handleClick = () => {
    setIsFlipped(!isFlipped)
    controls.start({ rotateY: isFlipped ? 0 : 180 })
  }

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        style={style}
        className="relative w-80 h-52 cursor-pointer"
        onClick={handleClick}
        animate={controls}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-2xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="text-2xl font-bold">Fenerbahçe</div>
            <div className="text-sm font-medium">Dijital Üyelik</div>
          </div>

          <div className="mt-8">
            <div className="text-sm mb-1">Üye No</div>
            <div className="text-xl font-mono tracking-wider">{cardData.cardNumber}</div>
          </div>

          <div className="mt-6 flex justify-between items-end">
            <div>
              <div className="text-xs uppercase">Üye Adı</div>
              <div className="text-sm font-medium">{cardData.memberName}</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase">Geçerlilik</div>
              <div className="text-sm font-medium">{cardData.expirationDate}</div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-2xl p-6 text-white"
          style={{ rotateY: 180 }}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <div className="text-2xl font-bold mb-4">QR Kod</div>
            <div className="w-32 h-32 bg-white p-2 rounded-lg">
              <img
                src={cardData.qrCode}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-sm text-center">
              Bu kartı herhangi bir QR tarayıcı ile okutabilirsiniz
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}