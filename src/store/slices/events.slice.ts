import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { EventErrorMessage } from '@/types/enums/event-error-message'
import { SportEvent } from '@/types/event'

type InitialState = {
  events: SportEvent[] | null
  selectedEvent: SportEvent | null
  isLoading: boolean
  errorMessage: string | null
  searchEvent: string
}

const initialState: InitialState = {
  searchEvent: '',
  events: null,
  selectedEvent: null,
  isLoading: false,
  errorMessage: null,
}

const EVENTS_URL = 'https://66c885168a477f50dc2e6547.mockapi.io/api/events'

const fetchEvents = createAsyncThunk('events/fetchEvents', async (query?: string) => {
  try {
    const { data } = await axios.get(`${EVENTS_URL}?${query}`)

    return data
  } catch (error) {
    throw new Error(EventErrorMessage.FAILED_TO_FETCH)
  }
})

const fetchEventById = createAsyncThunk('events/fetchEventById', async (id: string) => {
  try {
    const { data } = await axios.get(`${EVENTS_URL}/${id}`)

    return data
  } catch (error) {
    throw new Error(EventErrorMessage.EVENT_NOT_FOUND)
  }
})

const createEvent = createAsyncThunk(
  'events/createEvent',
  async (event: Omit<SportEvent, 'id' | 'createdAt'>) => {
    try {
      const { data } = await axios.post(EVENTS_URL, event)

      return data
    } catch (error) {
      throw new Error(EventErrorMessage.FAILED_TO_CREATE)
    }
  },
)

const updateEvent = createAsyncThunk('events/updateEvent', async (event: SportEvent) => {
  try {
    const { data } = await axios.put(`${EVENTS_URL}/${event.id}`, event)

    return data
  } catch (error) {
    throw new Error(EventErrorMessage.FAILED_TO_UPDATE)
  }
})

const handlePending = (state: InitialState) => {
  state.isLoading = true
  state.errorMessage = ''
}

const handleRejected = (errorMessage: EventErrorMessage) => (state: InitialState) => {
  state.isLoading = false
  state.errorMessage = errorMessage
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSearchEvent: (state, { payload }: PayloadAction<string>) => {
      state.searchEvent = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, handlePending)
    builder.addCase(fetchEvents.rejected, handleRejected(EventErrorMessage.FAILED_TO_FETCH))
    builder.addCase(fetchEvents.fulfilled, (state, { payload }: PayloadAction<SportEvent[]>) => {
      state.events = payload
      state.isLoading = false
      state.errorMessage = ''
    })

    builder.addCase(createEvent.pending, handlePending)
    builder.addCase(createEvent.rejected, handleRejected(EventErrorMessage.FAILED_TO_CREATE))
    builder.addCase(createEvent.fulfilled, (state, { payload }: PayloadAction<SportEvent>) => {
      state.events?.push(payload)
      state.isLoading = false
      state.errorMessage = ''
    })

    builder.addCase(updateEvent.pending, handlePending)
    builder.addCase(updateEvent.rejected, handleRejected(EventErrorMessage.FAILED_TO_UPDATE))
    builder.addCase(updateEvent.fulfilled, (state, { payload }: PayloadAction<SportEvent>) => {
      if (!state.events || !state.events.length) {
        state.selectedEvent = payload
        console.log("🚀 ~ builder.addCase ~ payload:", payload)
        state.isLoading = false
        state.errorMessage = ''
        return
      }

      state.events = state.events.map((event: SportEvent) =>
        event.id === payload.id ? payload : event,
      )
      state.isLoading = false
      state.errorMessage = ''
    })

    builder.addCase(fetchEventById.pending, handlePending)
    builder.addCase(fetchEventById.rejected, handleRejected(EventErrorMessage.EVENT_NOT_FOUND))
    builder.addCase(fetchEventById.fulfilled, (state, { payload }: PayloadAction<SportEvent>) => {
      state.selectedEvent = payload
      state.isLoading = false
      state.errorMessage = ''
    })
  },
})

const { setSearchEvent } = eventsSlice.actions

export { eventsSlice, fetchEvents, createEvent, updateEvent, fetchEventById, setSearchEvent }
