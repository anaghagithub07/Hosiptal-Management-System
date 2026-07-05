import api from '../../api/client'
import type { AppDispatch } from '../index'
import type { AuthUser } from '../../types'

export const loadUser = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('hms_token')
  if (!token) return

  try {
    const { data } = await api.get<AuthUser>('/auth/me')
    dispatch({ type: 'auth/setUser', payload: data })
    localStorage.setItem('hms_session', JSON.stringify(data))
  } catch {
    localStorage.removeItem('hms_token')
    localStorage.removeItem('hms_session')
    dispatch({ type: 'auth/logout' })
  }
}

export const signUp =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const { data } = await api.post<{ token: string; user: AuthUser }>('/auth/register', {
        name,
        email,
        password,
      })
      localStorage.setItem('hms_token', data.token)
      localStorage.setItem('hms_session', JSON.stringify(data.user))
      dispatch({ type: 'auth/setUser', payload: data.user })
      dispatch({ type: 'auth/closeModal' })
      return true
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Signup failed'
      dispatch({ type: 'auth/setError', payload: message })
      return false
    }
  }

export const signIn =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const { data } = await api.post<{ token: string; user: AuthUser }>('/auth/login', {
        email,
        password,
      })
      localStorage.setItem('hms_token', data.token)
      localStorage.setItem('hms_session', JSON.stringify(data.user))
      dispatch({ type: 'auth/setUser', payload: data.user })
      dispatch({ type: 'auth/closeModal' })
      return true
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Login failed'
      dispatch({ type: 'auth/setError', payload: message })
      return false
    }
  }

export const updateProfile =
  (updates: Partial<AuthUser>) =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const { data } = await api.put<AuthUser>('/auth/profile', updates)
      dispatch({ type: 'auth/setUser', payload: data })
      localStorage.setItem('hms_session', JSON.stringify(data))
      return true
    } catch {
      return false
    }
  }

export const uploadProfileImage =
  (file: File) =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await api.put<AuthUser>('/auth/profile/image', formData)
      dispatch({ type: 'auth/setUser', payload: data })
      localStorage.setItem('hms_session', JSON.stringify(data))
      return true
    } catch {
      return false
    }
  }

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('hms_token')
  localStorage.removeItem('hms_session')
  dispatch({ type: 'auth/logout' })
}

export const openAuthModal = (tab: 'signin' | 'signup' = 'signin') => ({
  type: 'auth/openModal' as const,
  payload: tab,
})

export const closeAuthModal = () => ({ type: 'auth/closeModal' as const })

export const setPendingPath = (path: string | null) => ({
  type: 'auth/setPendingPath' as const,
  payload: path,
})
