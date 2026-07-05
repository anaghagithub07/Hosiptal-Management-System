import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'react-toastify'
import {
  getSession,
  getStoredUsers,
  saveSession,
  saveStoredUsers,
  type AuthUser,
} from './authStorage'

interface AuthContextValue {
  user: AuthUser | null
  isAuthModalOpen: boolean
  authModalTab: 'signin' | 'signup'
  openAuthModal: (tab?: 'signin' | 'signup') => void
  closeAuthModal: () => void
  requireAuth: (action: () => void, tab?: 'signin' | 'signup') => void
  signUp: (name: string, email: string, password: string) => boolean
  signIn: (email: string, password: string) => boolean
  updateProfile: (updates: Partial<AuthUser>) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getSession())
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin')
  const pendingActionRef = useRef<(() => void) | null>(null)

  const runPendingAction = () => {
    const action = pendingActionRef.current
    pendingActionRef.current = null
    action?.()
  }

  const openAuthModal = (tab: 'signin' | 'signup' = 'signin') => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
    pendingActionRef.current = null
  }

  const requireAuth = (action: () => void, tab: 'signin' | 'signup' = 'signin') => {
    if (user) {
      action()
      return
    }
    pendingActionRef.current = action
    openAuthModal(tab)
  }

  const signUp = (name: string, email: string, password: string) => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail || !password) {
      toast.error('Please fill in all fields')
      return false
    }

    const users = getStoredUsers()
    if (users.some((item) => item.email === trimmedEmail)) {
      toast.error('An account with this email already exists')
      return false
    }

    users.push({
      name: trimmedName,
      email: trimmedEmail,
      password,
      phone: '',
      address: '',
      gender: '',
      birthday: '',
      image: '',
    })
    saveStoredUsers(users)

    const newUser: AuthUser = {
      name: trimmedName,
      email: trimmedEmail,
      phone: '',
      address: '',
      gender: '',
      birthday: '',
      image: '',
    }
    setUser(newUser)
    saveSession(newUser)
    setIsAuthModalOpen(false)
    toast.success('Account created successfully')
    runPendingAction()
    return true
  }

  const signIn = (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail || !password) {
      toast.error('Please enter email and password')
      return false
    }

    const matchedUser = getStoredUsers().find(
      (item) => item.email === trimmedEmail && item.password === password
    )

    if (!matchedUser) {
      toast.error('Invalid email or password')
      return false
    }

    const sessionUser: AuthUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      phone: matchedUser.phone ?? '',
      address: matchedUser.address ?? '',
      gender: matchedUser.gender ?? '',
      birthday: matchedUser.birthday ?? '',
      image: matchedUser.image ?? '',
    }
    setUser(sessionUser)
    saveSession(sessionUser)
    setIsAuthModalOpen(false)
    toast.success(`Welcome back, ${matchedUser.name}`)
    runPendingAction()
    return true
  }

  const updateProfile = (updates: Partial<AuthUser>) => {
    if (!user) return false

    const updatedUser: AuthUser = { ...user, ...updates }
    const users = getStoredUsers().map((item) =>
      item.email === user.email ? { ...item, ...updates } : item
    )

    saveStoredUsers(users)
    setUser(updatedUser)
    saveSession(updatedUser)
    toast.success('Profile saved successfully')
    return true
  }

  const logout = () => {
    setUser(null)
    saveSession(null)
    pendingActionRef.current = null
    toast.info('Logged out successfully')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        signUp,
        signIn,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
