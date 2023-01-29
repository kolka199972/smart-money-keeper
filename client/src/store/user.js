import {createAction, createSlice} from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import {generateAuthError} from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
      entity: null,
      isLoading: true,
      error: null,
      auth: {userId: localStorageService.getUserId()},
      isLoggedIn: true
    }
  : {
      entity: null,
      isLoading: true,
      error: null,
      auth: null,
      isLoggedIn: false
    }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true
    },
    userReceived: (state, action) => {
      state.entity = action.payload
      state.isLoading = false
    },
    userRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    userUpdated: (state, action) => {
      state.entity = action.payload
    },
    authRequested: (state) => {
      state.error = null
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.entity = null
      state.isLoggedIn = false
      state.auth = null
    }
  }
})

const {reducer: userReducer, actions} = userSlice
const {
  userRequested,
  userReceived,
  userRequestFailed,
  authRequestSuccess,
  userUpdated,
  userLoggedOut
} = actions
const authRequested = createAction('user/authRequested')

export const loadUser = () => async (dispatch) => {
  dispatch(userRequested())
  try {
    if (localStorageService.getAccessToken()) {
      const data = await userService.get(localStorageService.getUserId())

      dispatch(userReceived(data))
    }
  } catch (error) {
    const {code, message} = error.response
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(userRequestFailed(errorMessage))
    } else {
      dispatch(userRequestFailed(error.message))
    }
  }
}

export const signUp = (payload, navigate) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.signUp(payload)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({userId: data.userId}))
    dispatch(loadUser())
    return navigate('/')
  } catch (error) {
    const {code, message} = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(userRequestFailed(errorMessage))
    } else {
      dispatch(userRequestFailed(error.message))
    }
  }
}

export const logIn = (payload, navigate) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.logIn(payload)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({userId: data.userId}))
    dispatch(loadUser())
    return navigate('/')
  } catch (error) {
    const {code, message} = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(userRequestFailed(errorMessage))
    } else {
      dispatch(userRequestFailed(error.message))
    }
  }
}

export const logout = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const updateUser = (payload) => async (dispatch) => {
  try {
    const data = await userService.update(payload)
    dispatch(userUpdated(data))
  } catch (error) {
    dispatch(userRequestFailed(error.message))
  }
}

export const removeUser = () => async (dispatch) => {
  try {
    await userService.delete(localStorageService.getUserId())
    dispatch(logout())
  } catch (error) {
    dispatch(userRequestFailed(error.message))
  }
}

export const getUser = () => (state) => state.user.entity
export const getUserLoadingStatus = () => (state) => state.user.isLoading
export const getAuthError = () => (state) => state.user.error
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn

export default userReducer
