export interface AdminDoctor {
  _id: string
  name: string
  image: string
  speciality: string
  degree: string
  experience: string
  about?: string
  fees: number
  address?: { line1: string; line2: string }
}

export interface AdminAppointment {
  id: string
  patientName: string
  patientImage: string
  department: string
  dateTime: string
  doctorName: string
  doctorImage: string
  fees: number
  bookedOn: string
}

export interface LatestAppointment {
  id: string
  doctorName: string
  doctorImage: string
  bookedOn: string
}

export interface DashboardStats {
  doctorCount: number
  appointmentCount: number
  patientCount: number
}
