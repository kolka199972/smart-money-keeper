import {createSlice} from '@reduxjs/toolkit'
import countService from '../services/count.service'

const countSlice = createSlice({
  name: 'count',
  initialState: {
    entities: null,
    error: null,
    isLoading: true
  },
  reducers: {
    countsRequested: (state) => {
      state.isLoading = true
    },
    countsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    countsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    countCreated: (state, action) => {
      state.entities = [...state.entities, action.payload]
    },
    countUpdated: (state, action) => {
      state.entities = state.entities.map((c) =>
        c._id === action.payload._id ? action.payload : c
      )
    },
    countRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    }
  }
})

const {reducer: countReducer, actions} = countSlice
const {
  countsRequested,
  countsReceived,
  countsRequestFailed,
  countCreated,
  countUpdated,
  countRemoved
} = actions

export const loadCounts = () => async (dispatch) => {
  dispatch(countsRequested())
  try {
    const data = await countService.fetchAll()
    dispatch(countsReceived(data))
  } catch (error) {
    dispatch(countsRequestFailed(error.message))
  }
}

export const createCount = (payload) => async (dispatch) => {
  try {
    const data = await countService.create(payload)
    dispatch(countCreated(data))
  } catch (error) {
    dispatch(countsRequestFailed(error.message))
  }
}

export const updateCount = (payload) => async (dispatch) => {
  try {
    const data = await countService.update(payload)
    dispatch(countUpdated(data))
  } catch (error) {
    dispatch(countsRequestFailed(error.message))
  }
}

export const removeCount = (id) => async (dispatch) => {
  try {
    await countService.remove(id)
    dispatch(countRemoved(id))
  } catch (error) {
    dispatch(countsRequestFailed(error.message))
  }
}

export const clearCounts = () => async (dispatch, state) => {
  try {
    state().count.entities.forEach((c) => dispatch(removeCount(c._id)))
  } catch (error) {
    dispatch(countsRequestFailed(error.message))
  }
}

export const getCounts = () => (state) => state.count.entities
export const getAccountCounts = () => (state) =>
  state.count.entities.filter((c) => c.type === 'accounts')
export const getDebtCounts = () => (state) =>
  state.count.entities.filter((c) => c.type === 'debts')
export const getSavingCounts = () => (state) =>
  state.count.entities.filter((c) => c.type === 'savings')
export const getCountById = (id) => (state) =>
  state.count.entities.find((c) => c._id === id)
export const getCountLoadingStatus = () => (state) => state.count.isLoading

export default countReducer
