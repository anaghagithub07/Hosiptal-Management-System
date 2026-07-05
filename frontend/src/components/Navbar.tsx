import { useCallback, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'
import { useScrollPast } from '../hooks/useScrollPast'
import ProfileMenu from './ProfileMenu'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'All Doctors', path: '/doctors' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, requireAuth } = useAuth()
  const isHome = pathname === '/'
  const scrolledPastHero = useScrollPast(0.75, isHome)
  const useDarkText = !isHome || scrolledPastHero

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open)
  }, [])

  const handleMakeAppointment = useCallback(() => {
    closeMenu()
    requireAuth(() => navigate('/doctors'))
  }, [closeMenu, navigate, requireAuth])

  const linkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      `text-sm font-medium transition-colors duration-300 ${
        useDarkText
          ? isActive
            ? 'text-black'
            : 'text-gray-800 hover:text-black'
          : isActive
            ? 'text-white'
            : 'text-white/80 hover:text-white'
      }`,
    [useDarkText]
  )

  const appointmentButtonClass = `rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
    useDarkText
      ? 'border-black text-black hover:bg-black hover:text-white'
      : 'border-white text-white hover:bg-white hover:text-gray-900'
  }`
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkText ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <span
            className={`text-lg font-bold tracking-wide transition-colors duration-300 sm:text-xl ${
              useDarkText ? 'text-black' : 'text-white'
            }`}
          >
            HOSPITAL
          </span>
        </NavLink>

        <div className="hidden items-center gap-4 md:flex lg:gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleMakeAppointment}
            className={appointmentButtonClass}
          >
            Make an Appointment
          </button>
          {user && <ProfileMenu useDarkText={useDarkText} />}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {user && <ProfileMenu useDarkText={useDarkText} onNavigate={closeMenu} />}
          <button
            type="button"
            onClick={toggleMenu}
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
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleMakeAppointment}
              className={`${appointmentButtonClass} text-center`}
            >
              Make an Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
