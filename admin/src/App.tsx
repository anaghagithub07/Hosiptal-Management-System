import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AddDoctor from './pages/AddDoctor'
import Appointments from './pages/Appointments'
import Dashboard from './pages/Dashboard'
import DoctorsList from './pages/DoctorsList'
import Login from './pages/Login'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchAdminData } from './store/actions/adminActions'

const AdminRoutes = () => {
  const dispatch = useAppDispatch()
  const { stats, doctors, appointments, latestAppointments, loading } = useAppSelector(
    (state) => state.admin
  )

  useEffect(() => {
    dispatch(fetchAdminData())
  }, [dispatch])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-gray-500">Loading...</div>
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard stats={stats} latestAppointments={latestAppointments} />} />
        <Route path="appointments" element={<Appointments appointments={appointments} />} />
        <Route path="add-doctor" element={<AddDoctor />} />
        <Route path="doctors-list" element={<DoctorsList doctors={doctors} />} />
      </Route>
    </Routes>
  )
}

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/*" element={<AdminRoutes />} />
    </Route>
  </Routes>
)

export default App
