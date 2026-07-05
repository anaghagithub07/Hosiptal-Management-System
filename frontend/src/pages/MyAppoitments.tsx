import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import {
  cancelAppointment,
  getUserAppointments,
  markAppointmentPaid,
  type Appointment,
} from '../context/appointmentStorage'

const MyAppoitments = () => {
  const { user, requireAuth } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    if (!user) {
      requireAuth(() => navigate('/my-appointments'))
      return
    }
    setAppointments(getUserAppointments(user.email))
  }, [user, requireAuth, navigate])

  const handleCancel = (id: string) => {
    cancelAppointment(id)
    setAppointments((prev) => prev.filter((item) => item.id !== id))
    toast.info('Appointment cancelled')
  }

  const handlePay = (id: string) => {
    markAppointmentPaid(id)
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPaid: true } : item))
    )
    toast.success('Payment successful')
  }

  if (!user) {
    return (
      <div className="py-20 text-center text-gray-500">
        Please sign in to view your appointments.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8"
    >
      <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
          No appointments booked yet.{' '}
          <Link to="/doctors" className="text-blue-500 hover:underline">
            Visit All Doctors
          </Link>{' '}
          to schedule one.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex gap-4">
                <img
                  src={appointment.doctorImage}
                  alt={appointment.doctorName}
                  className="h-24 w-24 shrink-0 rounded-lg object-cover object-top sm:h-28 sm:w-28"
                />
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-gray-900">
                    {appointment.doctorName}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {appointment.speciality}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">{appointment.address}</p>
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    {appointment.date} | {appointment.time}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                {appointment.isPaid ? (
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white opacity-90 sm:w-40"
                  >
                    Paid
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePay(appointment.id)}
                    className="w-full rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 sm:w-40"
                  >
                    Pay here
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleCancel(appointment.id)}
                  className="w-full rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 sm:w-40"
                >
                  Cancel appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default MyAppoitments
