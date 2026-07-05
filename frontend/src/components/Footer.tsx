import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { assets } from '../assets/assets'

const companyLinks = [
  { label: 'Home', path: '/' },
  { label: 'About us', path: '/about' },
  { label: 'Contact us', path: '/contact' },
  { label: 'Privacy policy', path: '/contact' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
}

const Footer = () => {
  return (
    <footer className="mt-0 bg-white px-4 pb-8 pt-8 sm:px-8 lg:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <motion.div variants={columnVariants} className="space-y-4">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <motion.img
                whileHover={{ scale: 1.08, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                src={assets.logo}
                alt="logo"
                className="h-9 w-9"
              />
              <span className="text-xl font-bold text-blue-700 transition-colors group-hover:text-blue-800">
                Prescripto
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
              Book trusted doctors online, manage appointments, and access quality healthcare
              from one place. Simple scheduling, secure records, and care you can count on.
            </p>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-800">
              COMPANY
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h3 className="mb-4 text-sm font-bold tracking-wide text-gray-800">
              GET IN TOUCH
            </h3>
            <ul className="space-y-2.5">
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <a
                  href="tel:+919148174362"
                  className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                >
                  +91 9148174362
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <a
                  href="mailto:bhatanagha832@gmail.com"
                  className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                >
                  bhatanagha832@gmail.com
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="my-8 h-px origin-center bg-gray-200"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-sm text-gray-500"
        >
          Copyright © {new Date().getFullYear()} GreatStack — All Rights Reserved.
        </motion.p>
      </motion.div>
    </footer>
  )
}

export default Footer
