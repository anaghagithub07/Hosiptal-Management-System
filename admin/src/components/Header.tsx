import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAdminAuth } from '../context/AdminAuthContext'

const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAdminAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Hospital logo" className="h-8 w-8" />
        <span className="text-lg font-semibold text-gray-900">HOSPITAL</span>
        <span className="hidden text-sm text-gray-400 sm:inline">Admin Panel</span>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
      >
        Logout
      </button>
    </header>
  )
}

export default Header
