import { applyMiddleware, combineReducers, createStore, type UnknownAction } from 'redux'
import { thunk } from 'redux-thunk'
import type { ThunkDispatch } from 'redux-thunk'
import { authReducer } from './reducers/authReducer'
import { doctorsReducer } from './reducers/doctorsReducer'
import { appointmentsReducer } from './reducers/appointmentsReducer'
import { loadUser } from './actions/authActions'

const rootReducer = combineReducers({
  auth: authReducer,
  doctors: doctorsReducer,
  appointments: appointmentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

store.dispatch(loadUser())

export default store
