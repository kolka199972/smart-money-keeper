import {createSlice} from '@reduxjs/toolkit'
import categoryService from '../services/category.service'
import localStorageService from '../services/localStorage.service'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    categoryRequested: (state) => {
      state.isLoading = true
    },
    categoryReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    categoryRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    categoryCreated: (state, action) => {
      state.entities = [...state.entities, action.payload]
    },
    categoryRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    }
  }
})

const {reducer: categoryReducer, actions} = categorySlice
const {
  categoryRequested,
  categoryReceived,
  categoryRequestFailed,
  categoryCreated,
  categoryRemoved
} = actions

export const loadCategoryList = () => async (dispatch) => {
  dispatch(categoryRequested())
  try {
    const data = await categoryService.fetchAll()
    dispatch(categoryReceived(data))
  } catch (error) {
    dispatch(categoryRequestFailed(error.message))
  }
}

export const createCategory = (payload) => async (dispatch) => {
  try {
    const data = await categoryService.create(payload)
    dispatch(categoryCreated(data))
  } catch (error) {
    dispatch(categoryRequestFailed(error.message))
  }
}

export const removeCategory = (id) => async (dispatch) => {
  try {
    await categoryService.delete(id)
    dispatch(categoryRemoved(id))
  } catch (error) {
    dispatch(categoryRequestFailed(error.message))
  }
}

export const clearCategories = () => async (dispatch, state) => {
  try {
    state()
      .category.entities.filter(
        (c) => c.userId === localStorageService.getUserId()
      )
      .forEach((c) => dispatch(removeCategory(c._id)))
  } catch (error) {
    dispatch(categoryRequestFailed(error.message))
  }
}

export const getCategories = () => (state) => state.category.entities
export const getCategoryExpenses = () => (state) =>
  state.category.entities.filter((c) => c.type === 'expense')
export const getCategoryIncomes = () => (state) =>
  state.category.entities.filter((c) => c.type === 'income')
export const getCategoryLoadingStatus = () => (state) =>
  state.category.isLoading

export default categoryReducer
