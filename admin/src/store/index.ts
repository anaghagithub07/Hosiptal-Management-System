import { applyMiddleware, combineReducers, createStore, type UnknownAction } from 'redux'
import { thunk } from 'redux-thunk'
import type { ThunkDispatch } from 'redux-thunk'
import { adminReducer } from './reducers/adminReducer'

const rootReducer = combineReducers({ admin: adminReducer })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

export default store
