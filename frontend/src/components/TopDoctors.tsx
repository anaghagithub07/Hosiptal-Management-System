import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { doctors } from '../assets/assets'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
}

const TopDoctors = () => {
  return (
    <section className="bg-white px-4 pb-24 pt-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
            Top Doctors to Book
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Simply browse through our extensive list of trusted doctors.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5"
        >
          {doctors.map((doctor) => (
            <motion.div key={doctor._id} variants={cardVariants}>
              <Link
                to={`/appointment/${doctor._id}`}
                className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="overflow-hidden bg-[#eaf3fa]"
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-36 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 sm:h-40"
                  />
                </motion.div>

                <div className="space-y-1 px-3 py-3 sm:px-4 sm:py-4">
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TopDoctors
