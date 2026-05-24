import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { MembershipFormData } from '../types'
import { motion } from 'framer-motion'

interface MembershipFormProps {
  onSubmit: (data: MembershipFormData) => void
}

export function MembershipForm({ onSubmit }: MembershipFormProps) {
  const [formData, setFormData] = useState<MembershipFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membershipType: 'standard',
    acceptTerms: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-6"
      >
        Üyelik Başvuru Formu
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">Ad</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">Soyad</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-posta</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="membershipType" className="block text-sm font-medium mb-1">Üyelik Tipi</label>
          <select
            id="membershipType"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="standard">Standart</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
            className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-white/80">
            Üyelik şartlarını ve koşullarını kabul ediyorum
          </label>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full">Başvuruyu Gönder</Button>
        </div>
      </form>
    </GlassCard>
  )
}