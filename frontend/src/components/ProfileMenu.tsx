import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { getInitialLetter, getUserImage } from '../utils/doctorImage'

interface ProfileMenuProps {
  useDarkText: boolean
  onNavigate?: () => void
}

const ProfileMenu = ({ useDarkText, onNavigate }: ProfileMenuProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigate = useCallback(
    (path: string) => {
      setOpen(false)
      onNavigate?.()
      navigate(path)
    },
    [navigate, onNavigate]
  )

  const handleLogout = useCallback(() => {
    setOpen(false)
    onNavigate?.()
    logout()
    navigate('/')
  }, [logout, navigate, onNavigate])

  if (!user) return null

  const profileImage = getUserImage(user.image)

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-sm font-bold transition-colors ${
          profileImage
            ? ''
            : useDarkText
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-white text-blue-600 hover:bg-blue-50'
        }`}
        aria-label="Profile menu"
      >
        {profileImage ? (
          <img src={profileImage} alt={user.name} className="h-full w-full object-cover" />
        ) : (
          getInitialLetter(user.name)
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
          >
            <p className="border-b border-gray-100 px-4 py-2 text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <button
              type="button"
              onClick={() => handleNavigate('/my-profile')}
              className="block w-full px-4 py-2.5 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('/my-appointments')}
              className="block w-full px-4 py-2.5 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              My Appointments
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileMenu
