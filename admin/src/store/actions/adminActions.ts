import api from '../../api/client'
import type { AppDispatch } from '../index'
import type { AdminDoctor, DashboardStats } from '../../types'

export const loginAdmin =
  (email: string, password: string) => async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const { data } = await api.post<{ token: string }>('/admin/login', { email, password })
      localStorage.setItem('hms_admin_token', data.token)
      dispatch({ type: 'admin/setAuth', payload: true })
      return true
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Login failed'
      dispatch({ type: 'admin/setError', payload: message })
      return false
    }
  }

export const logoutAdmin = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('hms_admin_token')
  dispatch({ type: 'admin/logout' })
}

export const fetchAdminData = () => async (dispatch: AppDispatch) => {
  dispatch({ type: 'admin/setLoading', payload: true })
  try {
    const [stats, doctors, appointments, latest] = await Promise.all([
      api.get<DashboardStats>('/admin/dashboard'),
      api.get<AdminDoctor[]>('/admin/doctors'),
      api.get('/admin/appointments'),
      api.get('/admin/appointments/latest'),
    ])
    dispatch({ type: 'admin/setStats', payload: stats.data })
    dispatch({ type: 'admin/setDoctors', payload: doctors.data })
    dispatch({ type: 'admin/setAppointments', payload: appointments.data })
    dispatch({ type: 'admin/setLatest', payload: latest.data })
    dispatch({ type: 'admin/setLoading', payload: false })
  } catch {
    dispatch({ type: 'admin/setError', payload: 'Failed to load admin data' })
  }
}

export const cancelAdminAppointment = (id: string) => async (dispatch: AppDispatch) => {
  await api.delete(`/admin/appointments/${id}`)
  dispatch(fetchAdminData())
}

export const addAdminDoctor = (formData: FormData) => async (dispatch: AppDispatch) => {
  await api.post('/admin/doctors', formData)
  dispatch(fetchAdminData())
}
