import { motion, type Variants } from 'framer-motion'
import { assets } from '../assets/assets'

const whyChooseUs = [
  {
    title: 'EFFICIENCY',
    text: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
  },
  {
    title: 'CONVENIENCE',
    text: 'Access to a network of trusted healthcare professionals in your area.',
  },
  {
    title: 'PERSONALIZATION',
    text: 'Tailored recommendations and reminders to help you stay on top of your health.',
  },
]

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
}

const About = () => {
  return (
    <div className="pb-12 pt-4">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-2xl font-medium tracking-wide text-gray-800 sm:text-3xl"
      >
        ABOUT US
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12"
      >
        <div className="mx-auto w-full max-w-sm shrink-0 overflow-hidden rounded-lg bg-[#eaf3fa] lg:mx-0">
          <img
            src={assets.about_image}
            alt="About Prescripto"
            className="w-full object-contain"
          />
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-gray-600 sm:text-base">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare
            needs conveniently and efficiently. At Prescripto, we understand the
            challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior service.
            Whether you&apos;re booking your first appointment or managing ongoing
            care, Prescripto is here to support you every step of the way.
          </p>
          <div>
            <p className="font-semibold text-gray-800">Our Vision</p>
            <p className="mt-2">
              Our vision at Prescripto is to create a seamless healthcare experience
              for every user. We aim to bridge the gap between patients and
              healthcare providers, making it easier for you to access the care you
              need, when you need it.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16"
      >
        <h2 className="text-lg font-semibold tracking-wide text-gray-800 sm:text-xl">
          WHY CHOOSE US
        </h2>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-6 md:grid-cols-3"
        >
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="rounded-lg border border-gray-200 px-6 py-8"
            >
              <h3 className="font-semibold tracking-wide text-gray-800">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About
