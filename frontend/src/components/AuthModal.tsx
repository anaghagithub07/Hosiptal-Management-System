import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalTab,
    closeAuthModal,
    signIn,
    signUp,
    openAuthModal,
  } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = useCallback(() => {
    setName('')
    setEmail('')
    setPassword('')
  }, [])

  const handleClose = useCallback(() => {
    resetForm()
    closeAuthModal()
  }, [closeAuthModal, resetForm])

  const switchTab = useCallback(
    (tab: 'signin' | 'signup') => {
      resetForm()
      openAuthModal(tab)
    },
    [openAuthModal, resetForm]
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      if (authModalTab === 'signup') {
        signUp(name, email, password)
        return
      }

      signIn(email, password)
    },
    [authModalTab, email, name, password, signIn, signUp]
  )

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-center text-2xl font-semibold text-gray-900">
              {authModalTab === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              {authModalTab === 'signin'
                ? 'Sign in to book appointments with trusted doctors'
                : 'Sign up to manage your healthcare appointments'}
            </p>

            <div className="mt-6 flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => switchTab('signin')}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                  authModalTab === 'signin'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchTab('signup')}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
                  authModalTab === 'signup'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {authModalTab === 'signup' && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
              >
                {authModalTab === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
