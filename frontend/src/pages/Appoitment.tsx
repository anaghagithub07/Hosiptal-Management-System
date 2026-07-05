import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BadgeCheck, Clock, Info } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchDoctorById, fetchDoctors } from '../store/actions/doctorsActions'
import { bookAppointment } from '../store/actions/appointmentsActions'
import { formatAppointmentDate, getDoctorImage } from '../utils/doctorImage'
import type { Doctor } from '../types'

const timeSlots = ['08:00 am', '08:30 am', '09:00 am', '09:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '02:00 pm', '02:30 pm', '03:00 pm', '03:30 pm']

const getNextDays = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })

const formatDayLabel = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
const formatDateLabel = (date: Date) => date.getDate()

const Appoitment = () => {
  const { docId } = useParams<{ docId: string }>()
  const navigate = useNavigate()
  const { user, requireAuth } = useAuth()
  const dispatch = useAppDispatch()
  const { current: doctor, list: allDoctors, loading } = useAppSelector((state) => state.doctors)
  const [days] = useState(() => getNextDays(14))
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  useEffect(() => {
    if (docId) dispatch(fetchDoctorById(docId))
    dispatch(fetchDoctors())
  }, [dispatch, docId])

  useEffect(() => {
    if (!user && docId) requireAuth(`/appointment/${docId}`)
  }, [user, docId, requireAuth])

  const relatedDoctors = doctor
    ? allDoctors.filter((d) => d.speciality === doctor.speciality && d._id !== doctor._id)
    : []
  const doctorIndex = Math.max(0, allDoctors.findIndex((d) => d._id === doctor?._id))

  const handleBook = async () => {
    if (!doctor || !selectedTime) return
    const result = await dispatch(
      bookAppointment({
        docId: doctor._id,
        date: formatAppointmentDate(days[selectedDay]),
        time: selectedTime,
      })
    )
    if (result) {
      toast.success(`Appointment booked with ${doctor.name}`)
      navigate('/my-appointments')
    } else {
      toast.error('Failed to book appointment')
    }
  }

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Please sign in to book an appointment.</p>
        <button type="button" onClick={() => requireAuth(`/appointment/${docId}`)} className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600">Sign In</button>
      </div>
    )
  }

  if (loading) return <p className="py-20 text-center text-gray-500">Loading doctor...</p>

  if (!doctor) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-600">Doctor not found.</p>
        <Link to="/doctors" className="mt-4 inline-block text-blue-600 hover:underline">Browse all doctors</Link>
      </div>
    )
  }

  return (
    <div className="pb-16 pt-4">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-2xl bg-[#eaf3fa] lg:mx-0">
          <img src={getDoctorImage(doctor.image, doctorIndex)} alt={doctor.name} className="h-72 w-full object-cover object-top sm:h-80" />
        </div>
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{doctor.name}</h1>
            <BadgeCheck className="h-6 w-6 text-blue-500" />
          </div>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">{doctor.degree} — {doctor.speciality}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            <Clock className="h-3.5 w-3.5" />{doctor.experience} experience
          </span>
          <div className="mt-6 flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <p className="text-sm leading-relaxed text-gray-500">{doctor.about}</p>
          </div>
          <p className="mt-6 text-base font-semibold text-gray-800">Appointment fee: <span className="text-blue-600">${doctor.fees}</span></p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">Booking slots</h2>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <button key={day.toISOString()} type="button" onClick={() => { setSelectedDay(index); setSelectedTime(null) }}
              className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border sm:h-[4.5rem] sm:w-[4.5rem] ${selectedDay === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200 bg-white text-gray-700'}`}>
              <span className="text-[10px] font-medium sm:text-xs">{formatDayLabel(day)}</span>
              <span className="text-base font-semibold sm:text-lg">{formatDateLabel(day)}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {timeSlots.map((slot) => (
            <button key={slot} type="button" onClick={() => setSelectedTime(slot)}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${selectedTime === slot ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200 bg-white text-gray-700'}`}>
              {slot}
            </button>
          ))}
        </div>
        <button type="button" disabled={!selectedTime} onClick={handleBook}
          className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold sm:w-auto sm:px-10 ${selectedTime ? 'bg-blue-500 text-white hover:bg-blue-600' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}>
          Book an appointment
        </button>
      </section>

      {relatedDoctors.length > 0 && (
        <section className="mt-20">
          <h2 className="text-center text-2xl font-semibold text-gray-800">Related Doctors</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {relatedDoctors.slice(0, 5).map((item) => (
              <RelatedDoctorCard
                key={item._id}
                doctor={item}
                imageIndex={Math.max(0, allDoctors.findIndex((d) => d._id === item._id))}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

const RelatedDoctorCard = ({ doctor, imageIndex }: { doctor: Doctor; imageIndex: number }) => {
  const { requireAuth } = useAuth()
  return (
    <button type="button" onClick={() => requireAuth(`/appointment/${doctor._id}`)} className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left hover:shadow-lg">
      <img src={getDoctorImage(doctor.image, imageIndex)} alt={doctor.name} className="h-32 w-full object-cover object-top sm:h-36" />
      <div className="px-3 py-3">
        <p className="truncate text-sm font-semibold text-gray-900">{doctor.name}</p>
        <p className="truncate text-xs text-gray-500">{doctor.speciality}</p>
      </div>
    </button>
  )
}

export default Appoitment
