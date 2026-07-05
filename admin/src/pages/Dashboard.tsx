import { CalendarDays, Stethoscope, Users, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { getDoctorImage } from '../utils/doctorImage'
import type { DashboardStats, LatestAppointment } from '../types'
import { useAppDispatch } from '../store/hooks'
import { cancelAdminAppointment } from '../store/actions/adminActions'

interface DashboardProps {
  stats: DashboardStats
  latestAppointments: LatestAppointment[]
}

const Dashboard = ({ stats, latestAppointments }: DashboardProps) => {
  const dispatch = useAppDispatch()

  const handleCancel = async (id: string) => {
    await dispatch(cancelAdminAppointment(id))
    toast.info('Appointment removed')
  }

  const cards = [
    { label: 'Doctors', value: stats.doctorCount, icon: Stethoscope, color: 'text-blue-500' },
    { label: 'Appointments', value: stats.appointmentCount, icon: CalendarDays, color: 'text-violet-500' },
    { label: 'Patients', value: stats.patientCount, icon: Users, color: 'text-orange-500' },
  ]

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
            <div className={`rounded-full bg-gray-50 p-3 ${color}`}><Icon className="h-6 w-6" /></div>
            <div><p className="text-2xl font-semibold">{value}</p><p className="text-sm text-gray-500">{label}</p></div>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Latest Appointments</h2>
        <div className="mt-4 divide-y">
          {latestAppointments.length === 0 ? (
            <p className="py-8 text-center text-gray-400">No appointments yet.</p>
          ) : (
            latestAppointments.map((a, index) => (
              <div key={a.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <img src={getDoctorImage(a.doctorImage, index)} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{a.doctorName}</p>
                    <p className="text-xs text-gray-500">Booking on {a.bookedOn}</p>
                  </div>
                </div>
                <button type="button" onClick={() => handleCancel(a.id)} className="rounded-full p-2 text-red-500 hover:bg-red-50"><X className="h-4 w-4" /></button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
