import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { Action, Dispatch, ThunkDispatch, combineSlices, configureStore } from '@reduxjs/toolkit'

import { eventsSlice } from './slices/events.slice'

const rootReducer = combineSlices(eventsSlice)

const store = configureStore({
  reducer: rootReducer,
})

type TRootState = ReturnType<typeof store.getState>

type AppDispatch = ThunkDispatch<any, undefined, Action> & Dispatch<any>

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export type { TRootState }

export { store, useAppDispatch, useAppSelector }
