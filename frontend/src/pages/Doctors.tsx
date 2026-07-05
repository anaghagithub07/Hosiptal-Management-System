import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { doctors, specialityData } from '../assets/assets'
import { useAuth } from '../context/AuthContext'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}

const Doctors = () => {
  const { speciality } = useParams<{ speciality?: string }>()
  const navigate = useNavigate()
  const { requireAuth } = useAuth()

  const activeSpeciality = speciality ? decodeURIComponent(speciality) : ''

  const filteredDoctors = activeSpeciality
    ? doctors.filter((doctor) => doctor.speciality === activeSpeciality)
    : doctors
  const showAllDoctors = useCallback(() => {
    navigate('/doctors')
  }, [navigate])

  const showSpeciality = useCallback(
    (specialityName: string) => {
      navigate(`/doctors/${encodeURIComponent(specialityName)}`)
    },
    [navigate]
  )

  const handleDoctorClick = useCallback(
    (docId: string) => {
      requireAuth(() => navigate(`/appointment/${docId}`))
    },
    [navigate, requireAuth]
  )

  return (
    <div className="pb-12 pt-2">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-500"
      >
        Browse through the doctors specialist.
      </motion.p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-10">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-56 lg:shrink-0"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            <button
              type="button"
              onClick={showAllDoctors}
              className={`shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors lg:w-full ${
                !activeSpeciality
                  ? 'border-blue-100 bg-blue-50 font-medium text-blue-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Doctors
            </button>
            {specialityData.map((item) => {
              const isActive = activeSpeciality === item.speciality

              return (
                <button
                  key={item.speciality}
                  type="button"
                  onClick={() => showSpeciality(item.speciality)}
                  className={`shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors lg:w-full ${
                    isActive
                      ? 'border-blue-100 bg-blue-50 font-medium text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.speciality}
                </button>
              )
            })}
          </div>
        </motion.aside>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="visible"
          className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
        >
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <motion.div key={doctor._id} variants={cardVariants}>
                <button
                  type="button"
                  onClick={() => handleDoctorClick(doctor._id)}
                  className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition-shadow hover:shadow-lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden bg-[#eaf3fa]"
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-36 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 sm:h-40"
                    />
                  </motion.div>
                  <div className="space-y-1 px-3 py-3 sm:px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-green-600 sm:text-sm">
                        Available
                      </span>
                    </div>
                    <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {doctor.name}
                    </p>
                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                      {doctor.speciality}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full py-12 text-center text-gray-500">
              No doctors found for this speciality.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Doctors
