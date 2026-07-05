import api from '../../api/client'
import type { AppDispatch, RootState } from '../index'
import type { Appointment } from '../../types'

export const fetchMyAppointments = () => async (dispatch: AppDispatch) => {
  dispatch({ type: 'appointments/setLoading', payload: true })
  try {
    const { data } = await api.get<Appointment[]>('/appointments/my')
    dispatch({ type: 'appointments/setList', payload: data })
  } catch {
    dispatch({ type: 'appointments/setError', payload: 'Failed to load appointments' })
  }
}

export const bookAppointment =
  (payload: { docId: string; date: string; time: string }) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<Appointment | null> => {
    try {
      const { data } = await api.post<Appointment>('/appointments', payload)
      const list = [data, ...getState().appointments.list]
      dispatch({ type: 'appointments/setList', payload: list })
      return data
    } catch {
      return null
    }
  }

export const payAppointment =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { data } = await api.patch<Appointment>(`/appointments/${id}/pay`)
      const list = getState().appointments.list.map((item) =>
        item._id === id ? data : item
      )
      dispatch({ type: 'appointments/setList', payload: list })
      return true
    } catch {
      return false
    }
  }

export const cancelAppointment =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await api.delete(`/appointments/${id}`)
      const list = getState().appointments.list.filter((item) => item._id !== id)
      dispatch({ type: 'appointments/setList', payload: list })
      return true
    } catch {
      return false
    }
  }