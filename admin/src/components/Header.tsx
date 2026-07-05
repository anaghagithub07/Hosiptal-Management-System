import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../assets/logo.svg'
import { useAppDispatch } from '../store/hooks'
import { logoutAdmin } from '../store/actions/adminActions'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutAdmin())
    toast.info('Logged out')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Hospital logo" className="h-8 w-8" />
        <span className="text-lg font-semibold text-gray-900">HOSPITAL</span>
        <span className="hidden text-sm text-gray-400 sm:inline">Admin Panel</span>
      </div>
      <button type="button" onClick={handleLogout} className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600">
        Logout
      </button>
    </header>
  )
}

export default Header
