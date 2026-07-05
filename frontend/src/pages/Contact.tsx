import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="pb-12 pt-4">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-2xl font-medium tracking-wide text-gray-800 sm:text-3xl"
      >
        CONTACT US
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12"
      >
        <div className="mx-auto w-full max-w-sm shrink-0 overflow-hidden rounded-lg lg:mx-0">
          <img
            src={assets.contact_image}
            alt="Contact Prescripto"
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-10 text-sm text-gray-600 sm:text-base">
          <div>
            <h2 className="font-semibold tracking-wide text-gray-800">
              OUR OFFICE
            </h2>
            <p className="mt-4 leading-relaxed">
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>
            <p className="mt-4">
              Tel: (415) 555‑0132
              <br />
              Email: greatstackdev@gmail.com
            </p>
          </div>

          <div>
            <h2 className="font-semibold tracking-wide text-gray-800">
              CAREERS AT PRESCRIPTO
            </h2>
            <p className="mt-4 leading-relaxed">
              Learn more about our teams and job openings.
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 rounded border border-gray-800 px-6 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-800 hover:text-white"
            >
              Explore Jobs
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
