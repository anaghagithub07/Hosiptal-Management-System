import { CalendarDays, Stethoscope, Users, X } from 'lucide-react'
import { toast } from 'react-toastify'
import type { Appointment } from '../data/mockData'

interface DashboardProps {
  doctorCount: number
  appointmentCount: number
  patientCount: number
  latestAppointments: Appointment[]
  onCancelAppointment: (id: string) => void
}

const statCards = [
  { key: 'doctors', label: 'Doctors', icon: Stethoscope, color: 'text-blue-500' },
  { key: 'appointments', label: 'Appointments', icon: CalendarDays, color: 'text-violet-500' },
  { key: 'patients', label: 'Patients', icon: Users, color: 'text-orange-500' },
] as const

const Dashboard = ({
  doctorCount,
  appointmentCount,
  patientCount,
  latestAppointments,
  onCancelAppointment,
}: DashboardProps) => {
  const counts = {
    doctors: doctorCount,
    appointments: appointmentCount,
    patients: patientCount,
  }

  const handleCancel = (id: string) => {
    onCancelAppointment(id)
    toast.info('Appointment removed')
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className={`rounded-full bg-gray-50 p-3 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{counts[key]}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="text-base font-semibold text-gray-900">Latest Appointments</h2>
        <div className="mt-4 divide-y divide-gray-100">
          {latestAppointments.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No appointments yet.</p>
          ) : (
            latestAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={appointment.doctorImage}
                    alt={appointment.doctorName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.doctorName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Booking on {appointment.bookedOn}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCancel(appointment.id)}
                  className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50"
                  aria-label="Cancel appointment"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
