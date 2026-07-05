import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { BadgeCheck, Clock, Info } from 'lucide-react'
import { toast } from 'react-toastify'
import { doctors, type Doctor } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
import {
  addAppointment,
  formatAppointmentDate,
  formatDoctorAddress,
} from '../context/appointmentStorage'

const timeSlots = [
  '08:00 am',
  '08:30 am',
  '09:00 am',
  '09:30 am',
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
  '12:00 pm',
  '12:30 pm',
  '02:00 pm',
  '02:30 pm',
  '03:00 pm',
  '03:30 pm',
]

const getNextDays = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date
  })

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()

const formatDateLabel = (date: Date) => date.getDate()

const formatFullDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 26 },
  },
}

const relatedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const relatedCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}

const Appoitment = () => {
  const { docId } = useParams<{ docId: string }>()
  const navigate = useNavigate()
  const { user, requireAuth } = useAuth()
  const [days] = useState(() => getNextDays(14))
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const doctor = doctors.find((item) => item._id === docId)

  const relatedDoctors = doctor
    ? doctors.filter(
        (item) =>
          item.speciality === doctor.speciality && item._id !== doctor._id
      )
    : []
  const handleDaySelect = useCallback((index: number) => {
    setSelectedDay(index)
    setSelectedTime(null)
  }, [])

  const handleTimeSelect = useCallback((slot: string) => {
    setSelectedTime(slot)
  }, [])

  const handleBook = () => {
    if (!doctor || selectedTime === null || !user) return

    addAppointment({
      userEmail: user.email,
      docId: doctor._id,
      doctorName: doctor.name,
      doctorImage: doctor.image,
      speciality: doctor.speciality,
      address: formatDoctorAddress(doctor.address.line1, doctor.address.line2),
      date: formatAppointmentDate(days[selectedDay]),
      time: selectedTime,
      fees: doctor.fees,
    })

    toast.success(
      `Appointment booked with ${doctor.name} on ${formatFullDate(days[selectedDay])} at ${selectedTime}`
    )
    setSelectedTime(null)
  }

  useEffect(() => {
    if (!user && docId) {
      requireAuth(() => navigate(`/appointment/${docId}`))
    }
  }, [user, docId, requireAuth, navigate])

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Please sign in to book an appointment.</p>
        <button
          type="button"
          onClick={() => requireAuth(() => navigate(`/appointment/${docId}`))}
          className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    )
  }

  if (!doctor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <p className="text-lg text-gray-600">Doctor not found.</p>
        <Link
          to="/doctors"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Browse all doctors
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="pb-16 pt-4">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 lg:flex-row"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="mx-auto w-full max-w-xs shrink-0 overflow-hidden rounded-2xl bg-[#eaf3fa] lg:mx-0"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="h-72 w-full object-cover object-top sm:h-80"
          />
        </motion.div>

        <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {doctor.name}
            </h1>
            <BadgeCheck className="h-6 w-6 text-blue-500" strokeWidth={2} />
          </div>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            {doctor.degree} — {doctor.speciality}
          </p>

          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
          >
            <Clock className="h-3.5 w-3.5" />
            {doctor.experience} experience
          </motion.span>

          <div className="mt-6 flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <p className="text-sm leading-relaxed text-gray-500">{doctor.about}</p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-base font-semibold text-gray-800"
          >
            Appointment fee:{' '}
            <span className="text-blue-600">${doctor.fees}</span>
          </motion.p>
        </div>
      </motion.div>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
        className="mt-12"
      >
        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Booking slots
        </h2>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {days.map((day, index) => {
            const isSelected = selectedDay === index

            return (
              <motion.button
                key={day.toISOString()}
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDaySelect(index)}
                className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border text-center transition-colors duration-300 sm:h-[4.5rem] sm:w-[4.5rem] ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-200'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                <span className="text-[10px] font-medium sm:text-xs">
                  {formatDayLabel(day)}
                </span>
                <span className="text-base font-semibold sm:text-lg">
                  {formatDateLabel(day)}
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot

              return (
                <motion.button
                  key={slot}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleTimeSelect(slot)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-200'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {slot}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          disabled={!selectedTime}
          whileHover={selectedTime ? { scale: 1.02, y: -2 } : {}}
          whileTap={selectedTime ? { scale: 0.98 } : {}}
          onClick={handleBook}
          className={`mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 sm:w-auto sm:px-10 sm:text-base ${
            selectedTime
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-200 hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-200 text-gray-400'
          }`}
        >
          Book an appointment
        </motion.button>
      </motion.section>

      {relatedDoctors.length > 0 && (
        <motion.section
          variants={relatedVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Related Doctors
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Simply browse through our extensive list of trusted doctors.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {relatedDoctors.slice(0, 5).map((item) => (
              <RelatedDoctorCard key={item._id} doctor={item} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}

const RelatedDoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const navigate = useNavigate()
  const { requireAuth } = useAuth()

  const handleClick = useCallback(() => {
    requireAuth(() => navigate(`/appointment/${doctor._id}`))
  }, [doctor._id, navigate, requireAuth])

  return (
  <motion.div variants={relatedCardVariants}>
    <button
      type="button"
      onClick={handleClick}
      className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition-shadow hover:shadow-lg"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="overflow-hidden bg-[#eaf3fa]"
      >
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-32 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 sm:h-36"
        />
      </motion.div>
      <div className="space-y-1 px-3 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-green-600">Available</span>
        </div>
        <p className="truncate text-sm font-semibold text-gray-900">
          {doctor.name}
        </p>
        <p className="truncate text-xs text-gray-500">{doctor.speciality}</p>
      </div>
    </button>
  </motion.div>
  )
}

export default Appoitment
