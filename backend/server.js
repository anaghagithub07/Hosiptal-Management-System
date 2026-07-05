import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({ message: err.message || 'Server error' })
})

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  })
