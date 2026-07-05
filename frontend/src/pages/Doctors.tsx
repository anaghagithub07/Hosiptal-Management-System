import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { specialityData } from '../assets/assets'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchDoctors } from '../store/actions/doctorsActions'
import { getDoctorImage } from '../utils/doctorImage'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
}

const Doctors = () => {
  const { speciality } = useParams<{ speciality?: string }>()
  const navigate = useNavigate()
  const { requireAuth } = useAuth()
  const dispatch = useAppDispatch()
  const { list: doctors, loading, error } = useAppSelector((state) => state.doctors)
  const activeSpeciality = speciality ? decodeURIComponent(speciality) : ''

  useEffect(() => {
    dispatch(fetchDoctors(activeSpeciality || undefined))
  }, [dispatch, activeSpeciality])

  return (
    <div className="pb-12 pt-2">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-gray-500">
        Browse through the doctors specialist.
      </motion.p>
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-10">
        <aside className="lg:w-56 lg:shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            <button type="button" onClick={() => navigate('/doctors')} className={`shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm lg:w-full ${!activeSpeciality ? 'border-blue-100 bg-blue-50 font-medium text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}>
              All Doctors
            </button>
            {specialityData.map((item) => (
              <button key={item.speciality} type="button" onClick={() => navigate(`/doctors/${encodeURIComponent(item.speciality)}`)} className={`shrink-0 rounded-lg border px-4 py-2.5 text-left text-sm lg:w-full ${activeSpeciality === item.speciality ? 'border-blue-100 bg-blue-50 font-medium text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}>
                {item.speciality}
              </button>
            ))}
          </div>
        </aside>
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p className="col-span-full py-12 text-center text-gray-500">Loading doctors...</p>
          ) : error ? (
            <p className="col-span-full py-12 text-center text-red-500">{error}</p>
          ) : doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <motion.div key={doctor._id} variants={cardVariants} initial="hidden" animate="visible">
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
            ))
          ) : (
            <p className="col-span-full py-12 text-center text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
