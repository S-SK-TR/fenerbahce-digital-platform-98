export interface MembershipFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipType: 'standard' | 'premium' | 'vip'
  acceptTerms: boolean
}

export interface MembershipCardData {
  cardNumber: string
  memberName: string
  membershipType: string
  expirationDate: string
  qrCode: string
}