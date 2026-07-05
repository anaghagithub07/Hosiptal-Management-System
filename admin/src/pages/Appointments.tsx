import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import { getDoctorImage } from '../utils/doctorImage'
import profilePic from '../assets/profile_pic.png'
import type { AdminAppointment } from '../types'
import { useAppDispatch } from '../store/hooks'
import { cancelAdminAppointment } from '../store/actions/adminActions'

const Appointments = ({ appointments }: { appointments: AdminAppointment[] }) => {
  const dispatch = useAppDispatch()

  const handleCancel = async (id: string) => {
    await dispatch(cancelAdminAppointment(id))
    toast.info('Appointment cancelled')
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-lg font-semibold">All Appointments</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500">
              <th className="px-3 py-3">#</th>
              <th className="px-3 py-3">Patient</th>
              <th className="px-3 py-3">Department</th>
              <th className="px-3 py-3">Date & Time</th>
              <th className="px-3 py-3">Doctor</th>
              <th className="px-3 py-3">Fees</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={a.id} className="border-b border-gray-100">
                <td className="px-3 py-4">{i + 1}</td>
                <td className="px-3 py-4"><div className="flex items-center gap-2"><img src={a.patientImage || profilePic} alt="" className="h-8 w-8 rounded-full" /><span>{a.patientName}</span></div></td>
                <td className="px-3 py-4">{a.department}</td>
                <td className="px-3 py-4">{a.dateTime}</td>
                <td className="px-3 py-4"><div className="flex items-center gap-2"><img src={a.doctorImage ? getDoctorImage(a.doctorImage) : getDoctorImage('', i)} alt="" className="h-8 w-8 rounded-full object-cover" /><span>{a.doctorName}</span></div></td>
                <td className="px-3 py-4">${a.fees}</td>
                <td className="px-3 py-4"><button type="button" onClick={() => handleCancel(a.id)} className="rounded-full p-2 text-red-500 hover:bg-red-50"><X className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appointments
