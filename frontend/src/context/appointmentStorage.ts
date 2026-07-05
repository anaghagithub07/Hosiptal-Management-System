export interface Appointment {
  id: string
  userEmail: string
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

const APPOINTMENTS_KEY = 'hms_appointments'

export const getAppointments = (): Appointment[] => {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) ?? '[]') as Appointment[]
  } catch {
    return []
  }
}

export const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments))
}

export const getUserAppointments = (userEmail: string) =>
  getAppointments().filter((item) => item.userEmail === userEmail)

export const addAppointment = (appointment: Omit<Appointment, 'id' | 'isPaid'>) => {
  const appointments = getAppointments()
  const newAppointment: Appointment = {
    ...appointment,
    id: crypto.randomUUID(),
    isPaid: false,
  }
  appointments.unshift(newAppointment)
  saveAppointments(appointments)
  return newAppointment
}

export const cancelAppointment = (id: string) => {
  saveAppointments(getAppointments().filter((item) => item.id !== id))
}

export const markAppointmentPaid = (id: string) => {
  saveAppointments(
    getAppointments().map((item) =>
      item.id === id ? { ...item, isPaid: true } : item
    )
  )
}

export const formatDoctorAddress = (line1: string, line2: string) =>
  `${line1}, ${line2}`

export const formatAppointmentDate = (date: Date) => {
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day}, ${month}, ${year}`
}
