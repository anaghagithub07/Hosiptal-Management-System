import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import loginHero from '../assets/login-hero.jpg'
import logo from '../assets/logo.svg'
import { useAdminAuth } from '../context/AdminAuthContext'

const Login = () => {
  const { isAuthenticated, login } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (login(email, password)) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={loginHero}
          alt="Hospital administration"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-slate-900/80" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4" />
            Secure Admin Access
          </div>
          <h2 className="max-w-md text-4xl font-bold leading-tight">
            Manage your hospital with confidence
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85">
            Track appointments, doctors, and patients from one powerful dashboard
            built for healthcare teams.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-blue-100/40">
            <div className="relative h-36 sm:h-40 lg:hidden">
              <img
                src={loginHero}
                alt="Hospital administration"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-blue-900/40" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <img src={logo} alt="Hospital logo" className="h-8 w-8" />
                <span className="text-sm font-semibold tracking-wide">HOSPITAL</span>
              </div>
            </div>

            <div className="p-8">
              <div className="hidden lg:flex lg:flex-col lg:items-center lg:text-center">
                <img src={logo} alt="Hospital logo" className="h-12 w-12" />
                <h1 className="mt-4 text-2xl font-semibold text-gray-900">Admin Login</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Sign in with your admin credentials
                </p>
              </div>

              <div className="lg:hidden">
                <h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
                <p className="mt-2 text-sm text-gray-500">
                  Sign in with your admin credentials
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@hospital.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
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
                    placeholder="Enter admin password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
