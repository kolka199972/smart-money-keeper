import operationService from '../services/operation.service'

const {createSlice} = require('@reduxjs/toolkit')

const operationSlice = createSlice({
  name: 'operation',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    operationsRequested: (state) => {
      state.isLoading = true
    },
    operationsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    operationsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    operationCreated: (state, action) => {
      state.entities = [...state.entities, action.payload]
    },
    operationUpdated: (state, action) => {
      state.entities = state.entities.map((op) =>
        op._id === action.payload._id ? action.payload : op
      )
    },
    operationRemoved: (state, action) => {
      state.entities = state.entities.filter((op) => op._id !== action.payload)
    }
  }
})

const {reducer: operationReducer, actions} = operationSlice
const {
  operationsRequested,
  operationsReceived,
  operationsRequestFailed,
  operationCreated,
  operationUpdated,
  operationRemoved
} = actions

export const loadOperations = () => async (dispatch) => {
  dispatch(operationsRequested())
  try {
    const data = await operationService.fetchAll()
    dispatch(operationsReceived(data))
  } catch (error) {
    dispatch(operationsRequestFailed(error.message))
  }
}

export const createOperation = (payload) => async (dispatch) => {
  try {
    const data = await operationService.create(payload)
    dispatch(operationCreated(data))
  } catch (error) {
    operationsRequestFailed(error.message)
  }
}

export const updateOperation = (payload) => async (dispatch) => {
  try {
    const data = await operationService.update(payload)
    dispatch(operationUpdated(data))
  } catch (error) {
    dispatch(operationsRequestFailed(error.message))
  }
}

export const removeOperation = (id) => async (dispatch) => {
  try {
    await operationService.remove(id)
    dispatch(operationRemoved(id))
  } catch (error) {
    operationsRequestFailed(error.message)
  }
}

export const clearOperations = () => async (dispatch, state) => {
  try {
    state().operation.entities.forEach((c) => dispatch(removeOperation(c._id)))
  } catch (error) {
    dispatch(operationsRequestFailed(error.message))
  }
}

export const getOperations = () => (state) => state.operation.entities
export const getExpenses = () => (state) =>
  state.operation.entities.filter((op) => op.type === 'expense')
export const getIncomes = () => (state) =>
  state.operation.entities.filter((op) => op.type === 'income')
export const getOperationById = (id) => (state) =>
  state.operation.entities.find((op) => op._id === id)
export const getOperationLoadingStatus = () => (state) =>
  state.operation.isLoading

export default operationReducer
