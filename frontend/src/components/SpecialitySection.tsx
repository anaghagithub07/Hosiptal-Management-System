import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  Stethoscope,
  HeartPulse,
  ScanFace,
  Baby,
  Brain,
  Pill,
  type LucideIcon,
} from 'lucide-react'
import { specialityData } from '../assets/assets'

const iconMap: Record<string, LucideIcon> = {
  'General physician': Stethoscope,
  Gynecologist: HeartPulse,
  Dermatologist: ScanFace,
  Pediatricians: Baby,
  Neurologist: Brain,
  Gastroenterologist: Pill,
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
}

const SpecialitySection = () => {
  return (
    <section className="bg-white px-4 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
            Find by Speciality
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Simply browse through our extensive list of trusted doctors, schedule
            your appointment hassle-free.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-3 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-6"
        >
          {specialityData.map((item) => {
            const Icon = iconMap[item.speciality] ?? Stethoscope

            return (
              <motion.div key={item.speciality} variants={itemVariants}>
                <Link
                  to={`/doctors/${encodeURIComponent(item.speciality)}`}
                  className="group flex flex-col items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf3fa] shadow-sm transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-blue-100 sm:h-24 sm:w-24"
                  >
                    <Icon
                      className="h-9 w-9 text-[#5b8def] transition-colors duration-300 group-hover:text-blue-600 sm:h-10 sm:w-10"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <span className="text-center text-xs font-medium text-gray-600 transition-colors duration-300 group-hover:text-blue-600 sm:text-sm">
                    {item.speciality}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default SpecialitySection
