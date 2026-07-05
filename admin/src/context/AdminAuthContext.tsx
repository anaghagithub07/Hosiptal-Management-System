import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'react-toastify'
import {
  getAdminCredentials,
  getAdminSession,
  saveAdminSession,
} from './adminAuthStorage'

interface AdminAuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => getAdminSession())

  const login = (email: string, password: string) => {
    const { email: adminEmail, password: adminPassword } = getAdminCredentials()

    if (!adminEmail || !adminPassword) {
      toast.error('Admin credentials are not configured in .env')
      return false
    }

    const trimmedEmail = email.trim().toLowerCase()

    if (trimmedEmail !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
      toast.error('Invalid admin email or password')
      return false
    }

    saveAdminSession(true)
    setIsAuthenticated(true)
    toast.success('Welcome, Admin')
    return true
  }

  const logout = () => {
    saveAdminSession(false)
    setIsAuthenticated(false)
    toast.info('Logged out')
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
