import type { AdminAppointment, AdminDoctor, DashboardStats, LatestAppointment } from '../../types'

export interface AdminState {
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  stats: DashboardStats
  doctors: AdminDoctor[]
  appointments: AdminAppointment[]
  latestAppointments: LatestAppointment[]
}

const initialState: AdminState = {
  isAuthenticated: Boolean(localStorage.getItem('hms_admin_token')),
  loading: false,
  error: null,
  stats: { doctorCount: 0, appointmentCount: 0, patientCount: 0 },
  doctors: [],
  appointments: [],
  latestAppointments: [],
}

type AdminAction =
  | { type: 'admin/setAuth'; payload: boolean }
  | { type: 'admin/setLoading'; payload: boolean }
  | { type: 'admin/setError'; payload: string | null }
  | { type: 'admin/setStats'; payload: DashboardStats }
  | { type: 'admin/setDoctors'; payload: AdminDoctor[] }
  | { type: 'admin/setAppointments'; payload: AdminAppointment[] }
  | { type: 'admin/setLatest'; payload: LatestAppointment[] }
  | { type: 'admin/logout' }

export const adminReducer = (state = initialState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'admin/setAuth':
      return { ...state, isAuthenticated: action.payload }
    case 'admin/setLoading':
      return { ...state, loading: action.payload }
    case 'admin/setError':
      return { ...state, error: action.payload, loading: false }
    case 'admin/setStats':
      return { ...state, stats: action.payload }
    case 'admin/setDoctors':
      return { ...state, doctors: action.payload, loading: false }
    case 'admin/setAppointments':
      return { ...state, appointments: action.payload, loading: false }
    case 'admin/setLatest':
      return { ...state, latestAppointments: action.payload }
    case 'admin/logout':
      return { ...initialState, isAuthenticated: false }
    default:
      return state
  }
}
