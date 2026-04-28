export interface SignupData {
  name: string
  email: string
  password: string
  role: 'USER' | 'SELLER' | 'DELIVERY'
  userImage?: File | null

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

export interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER' | 'SELLER' | 'DELIVERY'
  status: 'ACTIVE' | 'INACTIVE'

  phone?: string
  city?: string
  location?: string
  address?: string
  lat?: number
  lang?: number
  userImage?: any
}