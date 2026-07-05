import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import type { Appointment } from '../data/mockData'

interface AppointmentsProps {
  appointments: Appointment[]
  onCancelAppointment: (id: string) => void
}

const Appointments = ({ appointments, onCancelAppointment }: AppointmentsProps) => {
  const handleCancel = (id: string) => {
    onCancelAppointment(id)
    toast.info('Appointment cancelled')
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="text-lg font-semibold text-gray-900">All Appointments</h1>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="px-3 py-3 font-medium">#</th>
              <th className="px-3 py-3 font-medium">Patient</th>
              <th className="px-3 py-3 font-medium">Department</th>
              <th className="px-3 py-3 font-medium">Age</th>
              <th className="px-3 py-3 font-medium">Date &amp; Time</th>
              <th className="px-3 py-3 font-medium">Doctor</th>
              <th className="px-3 py-3 font-medium">Fees</th>
              <th className="px-3 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-10 text-center text-gray-400">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment, index) => (
                <tr key={appointment.id} className="border-b border-gray-100">
                  <td className="px-3 py-4 text-gray-600">{index + 1}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={appointment.patientImage}
                        alt={appointment.patientName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {appointment.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-gray-600">{appointment.department}</td>
                  <td className="px-3 py-4 text-gray-600">{appointment.age}</td>
                  <td className="px-3 py-4 text-gray-600">{appointment.dateTime}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={appointment.doctorImage}
                        alt={appointment.doctorName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="text-gray-800">{appointment.doctorName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 font-medium text-gray-800">
                    ${appointment.fees}
                  </td>
                  <td className="px-3 py-4">
                    <button
                      type="button"
                      onClick={() => handleCancel(appointment.id)}
                      className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50"
                      aria-label="Cancel appointment"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appointments
