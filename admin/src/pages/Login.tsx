import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import loginHero from '../assets/login-hero.jpg'
import logo from '../assets/logo.svg'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginAdmin } from '../store/actions/adminActions'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.admin.isAuthenticated)
  const error = useAppSelector((state) => state.admin.error)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const ok = await dispatch(loginAdmin(email, password))
    if (ok) {
      toast.success('Welcome, Admin')
      navigate('/')
    } else if (error) {
      toast.error(error)
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={loginHero} alt="Hospital" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-slate-900/80" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4" /> Secure Admin Access
          </div>
          <h2 className="max-w-md text-4xl font-bold leading-tight">Manage your hospital with confidence</h2>
        </div>
      </div>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <img src={logo} alt="logo" className="mx-auto h-12 w-12" />
            <h1 className="mt-4 text-2xl font-semibold">Admin Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@hospital.com" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500" required />
            <button type="submit" className="w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
