import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchMyAppointments, payAppointment, cancelAppointment } from '../store/actions/appointmentsActions'
import { getDoctorImage } from '../utils/doctorImage'

const MyAppoitments = () => {
  const { user, requireAuth } = useAuth()
  const dispatch = useAppDispatch()
  const { list: appointments, loading, error } = useAppSelector((state) => state.appointments)

  useEffect(() => {
    if (!user) {
      requireAuth('/my-appointments')
      return
    }
    dispatch(fetchMyAppointments())
  }, [user, dispatch, requireAuth])

  const handleCancel = async (id: string) => {
    const ok = await dispatch(cancelAppointment(id))
    if (ok) toast.info('Appointment cancelled')
    else toast.error('Failed to cancel')
  }

  const handlePay = async (id: string) => {
    const ok = await dispatch(payAppointment(id))
    if (ok) toast.success('Payment successful')
    else toast.error('Payment failed')
  }

  if (!user) {
    return <div className="py-20 text-center text-gray-500">Please sign in to view your appointments.</div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-8">
      <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
      {loading && appointments.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">Loading appointments...</p>
      ) : error && appointments.length === 0 ? (
        <p className="mt-10 text-center text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
          No appointments booked yet. <Link to="/doctors" className="text-blue-500 hover:underline">Visit All Doctors</Link> to schedule one.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex gap-4">
                <img src={getDoctorImage(appointment.doctorImage)} alt={appointment.doctorName} className="h-24 w-24 shrink-0 rounded-lg object-cover sm:h-28 sm:w-28" />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{appointment.doctorName}</p>
                  <p className="text-sm text-gray-500">{appointment.speciality}</p>
                  <p className="mt-2 text-sm text-gray-500">{appointment.address}</p>
                  <p className="mt-2 text-sm font-medium text-gray-700">{appointment.date} | {appointment.time}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                {appointment.isPaid ? (
                  <button type="button" disabled className="w-full rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white opacity-90 sm:w-40">Paid</button>
                ) : (
                  <button type="button" onClick={() => handlePay(appointment._id)} className="w-full rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 sm:w-40">Pay here</button>
                )}
                <button type="button" onClick={() => handleCancel(appointment._id)} className="w-full rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:w-40">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default MyAppoitments
