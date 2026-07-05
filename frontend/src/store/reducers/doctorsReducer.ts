import type { Doctor } from '../../types'

export interface DoctorsState {
  list: Doctor[]
  current: Doctor | null
  loading: boolean
  error: string | null
}

const initialState: DoctorsState = {
  list: [],
  current: null,
  loading: false,
  error: null,
}

type DoctorsAction =
  | { type: 'doctors/setLoading'; payload: boolean }
  | { type: 'doctors/setList'; payload: Doctor[] }
  | { type: 'doctors/setCurrent'; payload: Doctor | null }
  | { type: 'doctors/setError'; payload: string | null }

export const doctorsReducer = (state = initialState, action: DoctorsAction): DoctorsState => {
  switch (action.type) {
    case 'doctors/setLoading':
      return { ...state, loading: action.payload }
    case 'doctors/setList':
      return { ...state, list: action.payload, loading: false, error: null }
    case 'doctors/setCurrent':
      return { ...state, current: action.payload, loading: false, error: null }
    case 'doctors/setError':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
