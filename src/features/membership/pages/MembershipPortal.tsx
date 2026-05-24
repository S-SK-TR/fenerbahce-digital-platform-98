import { useState } from 'react'
import { MembershipForm } from '../components/MembershipForm'
import { MembershipCard3D } from '../components/MembershipCard3D'
import { MembershipFormData, MembershipCardData } from '../types'
import { generateId } from '@/shared/utils'
import { motion } from 'framer-motion'

const mockCardData: MembershipCardData = {
  cardNumber: 'FEN-2024-0001',
  memberName: 'John Doe',
  membershipType: 'Premium',
  expirationDate: '12/2025',
  qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FEN-2024-0001'
}

export function MembershipPortal() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cardData, setCardData] = useState<MembershipCardData>(mockCardData)

  const handleFormSubmit = (formData: MembershipFormData) => {
    const newCardData: MembershipCardData = {
      cardNumber: `FEN-${new Date().getFullYear()}-${generateId(4)}`,
      memberName: `${formData.firstName} ${formData.lastName}`,
      membershipType: formData.membershipType,
      expirationDate: `${new Date().getMonth() + 1}/${new Date().getFullYear() + 1}`,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${formData.email}`
    }

    setCardData(newCardData)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      {!isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MembershipForm onSubmit={handleFormSubmit} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6">Başvurunuz Alındı!</h2>
          <p className="mb-8 text-lg">Üyelik kartınızı aşağıda görüntüleyebilirsiniz.</p>
          <MembershipCard3D cardData={cardData} />
        </motion.div>
      )}
    </div>
  )
}