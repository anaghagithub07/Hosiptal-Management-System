import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'All Doctors', path: '/doctors' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const useDarkText = !isHome || scrolledPastHero

  useEffect(() => {
    setMenuOpen(false)

    if (!isHome) {
      setScrolledPastHero(false)
      return
    }

    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.75)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-300 ${
      useDarkText
        ? isActive
          ? 'text-black'
          : 'text-gray-800 hover:text-black'
        : isActive
          ? 'text-white'
          : 'text-white/80 hover:text-white'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkText ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <span
            className={`text-lg font-bold tracking-wide transition-colors duration-300 sm:text-xl ${
              useDarkText ? 'text-black' : 'text-white'
            }`}
          >
            HOSPITAL
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/doctors"
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
              useDarkText
                ? 'border-black text-black hover:bg-black hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-gray-900'
            }`}
          >
            Make an Appointment
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <img
            src={menuOpen ? assets.cross_icon : assets.menu_icon}
            alt=""
            className={`h-6 w-6 transition-all duration-300 ${
              !useDarkText && !menuOpen ? 'invert' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className={`border-t px-4 py-4 transition-colors duration-300 md:hidden ${
            useDarkText
              ? 'border-gray-100 bg-white'
              : 'border-white/20 bg-black/80'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/doctors"
              className={`rounded-full border px-5 py-2 text-center text-sm font-medium transition-colors duration-300 ${
                useDarkText
                  ? 'border-black text-black'
                  : 'border-white text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Make an Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
