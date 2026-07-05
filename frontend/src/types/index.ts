export interface AuthUser {
  _id?: string
  name: string
  email: string
  phone?: string
  address?: string
  gender?: string
  birthday?: string
  image?: string
}

export interface Doctor {
  _id: string
  name: string
  image: string
  speciality: string
  degree: string
  experience: string
  about: string
  fees: number
  address: { line1: string; line2: string }
}

export interface Appointment {
  _id: string
  docId: string
  doctorName: string
  doctorImage: string
  speciality: string
  address: string
  date: string
  time: string
  fees: number
  isPaid: boolean
}
