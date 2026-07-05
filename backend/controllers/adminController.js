import generateToken from '../utils/generateToken.js'
import Doctor from '../models/Doctor.js'
import Appointment from '../models/Appointment.js'
import User from '../models/User.js'

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ message: 'Admin credentials not configured' })
  }
  if (
    email?.trim().toLowerCase() !== adminEmail.trim().toLowerCase() ||
    password !== adminPassword
  ) {
    return res.status(401).json({ message: 'Invalid admin email or password' })
  }

  const token = generateToken({ role: 'admin', email: adminEmail })
  res.json({ token, admin: { email: adminEmail } })
}

export const getDashboardStats = async (_req, res) => {
  const [doctorCount, appointmentCount, patientCount] = await Promise.all([
    Doctor.countDocuments(),
    Appointment.countDocuments({ cancelled: false }),
    User.countDocuments(),
  ])
  res.json({ doctorCount, appointmentCount, patientCount })
}
