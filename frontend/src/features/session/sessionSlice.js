import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export const createSession = createAsyncThunk('session/create', async (_, thunkAPI) => {
const res = await axios.post(`${BACKEND}/api/sessions/create`)
return res.data.session
})

export const fetchSession = createAsyncThunk('session/fetch', async (uniqueId, thunkAPI) => {
const res = await axios.get(`${BACKEND}/api/sessions/${uniqueId}`)
return res.data.session
})

const sessionSlice = createSlice({
name: 'session',
initialState: { current: null, status: 'idle', error: null },
reducers: {},
extraReducers: (builder) => {
builder
.addCase(createSession.pending, (state) => { state.status = 'loading' })
.addCase(createSession.fulfilled, (state, action) => { state.status = 'succeeded'; state.current = action.payload })
.addCase(createSession.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
.addCase(fetchSession.pending, (state) => { state.status = 'loading' })
.addCase(fetchSession.fulfilled, (state, action) => { state.status = 'succeeded'; state.current = action.payload })
.addCase(fetchSession.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
}
})

export default sessionSlice.reducer