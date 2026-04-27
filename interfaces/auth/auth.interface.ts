export interface SignupData {
  name: string
  email: string
  password: string
  role: 'USER' | 'SELLER' | 'DELIVERY'

  city?: string
  location?: string
  phone?: string
  address?: string
  lat?: number
  lang?: number

  // seller
  kitchenName?: string
  description?: string

  // delivery
  vehicleType?: string
  vehicleNumber?: string
  licenseNumber?: string
}