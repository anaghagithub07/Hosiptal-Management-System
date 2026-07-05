import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { assets } from '../assets/assets'

const slides = [
  {
    image: assets.HomePage1,
    description:
      'Connect with experienced, verified doctors and schedule your visit in minutes — quality care you can trust.',
  },
  {
    image: assets.HomePage2,
    description:
      'From routine check-ups to specialist consultations, book appointments easily with our trusted medical team.',
  },
]

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <motion.img
          key={slide.image}
          src={slide.image}
          alt=""
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-screen items-center px-4 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Book Appointment With Trusted Doctors
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {slides[currentIndex].description}
            </p>
            <Link
              to="/doctors"
              className="mt-8 inline-block rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600 sm:text-base"
            >
              Book Appointment
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full border-2 border-white transition-all ${
              index === currentIndex ? 'scale-110 bg-white' : 'bg-transparent opacity-70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Home
