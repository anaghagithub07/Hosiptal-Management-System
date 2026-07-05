import type { AuthUser } from '../../types'

const getStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('hms_session')
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export interface AuthState {
  user: AuthUser | null
  isAuthModalOpen: boolean
  authModalTab: 'signin' | 'signup'
  pendingPath: string | null
  error: string | null
}

const initialState: AuthState = {
  user: getStoredUser(),
  isAuthModalOpen: false,
  authModalTab: 'signin',
  pendingPath: null,
  error: null,
}

type AuthAction =
  | { type: 'auth/setUser'; payload: AuthUser | null }
  | { type: 'auth/openModal'; payload?: 'signin' | 'signup' }
  | { type: 'auth/closeModal' }
  | { type: 'auth/setPendingPath'; payload: string | null }
  | { type: 'auth/setError'; payload: string | null }
  | { type: 'auth/logout' }

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'auth/setUser':
      return { ...state, user: action.payload, error: null }
    case 'auth/openModal':
      return {
        ...state,
        isAuthModalOpen: true,
        authModalTab: action.payload || 'signin',
        error: null,
      }
    case 'auth/closeModal':
      return { ...state, isAuthModalOpen: false, error: null }
    case 'auth/setPendingPath':
      return { ...state, pendingPath: action.payload }
    case 'auth/setError':
      return { ...state, error: action.payload }
    case 'auth/logout':
      return { ...state, user: null, pendingPath: null }
    default:
      return state
  }
}
