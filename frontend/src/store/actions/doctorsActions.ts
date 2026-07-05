import api from '../../api/client'
import type { AppDispatch } from '../index'
import type { Doctor } from '../../types'

export const fetchDoctors = (speciality?: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: 'doctors/setLoading', payload: true })
  try {
    const { data } = await api.get<Doctor[]>('/doctors', {
      params: speciality ? { speciality } : undefined,
    })
    dispatch({ type: 'doctors/setList', payload: data })
  } catch {
    dispatch({ type: 'doctors/setError', payload: 'Failed to load doctors' })
  }
}

export const fetchDoctorById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: 'doctors/setLoading', payload: true })
  try {
    const { data } = await api.get<Doctor>(`/doctors/${id}`)
    dispatch({ type: 'doctors/setCurrent', payload: data })
  } catch {
    dispatch({ type: 'doctors/setError', payload: 'Doctor not found' })
    dispatch({ type: 'doctors/setCurrent', payload: null })
  }
}
