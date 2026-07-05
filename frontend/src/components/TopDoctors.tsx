import { useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchDoctors } from '../store/actions/doctorsActions'
import { getDoctorImage } from '../utils/doctorImage'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
}

const TopDoctors = () => {
  const { requireAuth } = useAuth()
  const dispatch = useAppDispatch()
  const { list: doctors, loading } = useAppSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [dispatch])

  return (
    <section className="scroll-mt-24 bg-white px-4 pb-10 pt-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">Top Doctors to Book</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>
        {loading ? (
          <p className="mt-12 text-center text-gray-500">Loading doctors...</p>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {doctors.slice(0, 10).map((doctor, index) => (
              <motion.div key={doctor._id} variants={cardVariants}>
                <button type="button" onClick={() => requireAuth(`/appointment/${doctor._id}`)} className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left hover:shadow-lg">
                  <div className="overflow-hidden bg-[#eaf3fa]">
                    <img src={getDoctorImage(doctor.image, index)} alt={doctor.name} className="h-36 w-full object-cover object-top sm:h-40" />
                  </div>
                  <div className="space-y-1 px-3 py-3 sm:px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-green-600 sm:text-sm">Available</span>
                    </div>
                    <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">{doctor.name}</p>
                    <p className="truncate text-xs text-gray-500 sm:text-sm">{doctor.speciality}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default TopDoctors
