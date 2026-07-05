import type { Appointment } from '../../types'

export interface AppointmentsState {
  list: Appointment[]
  loading: boolean
  error: string | null
}

const initialState: AppointmentsState = {
  list: [],
  loading: false,
  error: null,
}

type AppointmentsAction =
  | { type: 'appointments/setLoading'; payload: boolean }
  | { type: 'appointments/setList'; payload: Appointment[] }
  | { type: 'appointments/setError'; payload: string | null }

export const appointmentsReducer = (
  state = initialState,
  action: AppointmentsAction
): AppointmentsState => {
  switch (action.type) {
    case 'appointments/setLoading':
      return { ...state, loading: action.payload }
    case 'appointments/setList':
      return { ...state, list: action.payload, loading: false, error: null }
    case 'appointments/setError':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
