import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'

const UserContext = React.createContext()

export const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      if (localStorageService.getAccessToken()) {
        const data = await userService.get(localStorageService.getUserId())
        setCurrentUser(data)
      }
    } catch (error) {
      const {message} = error.response.data
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const deleteUser = async (id) => {
    try {
      const data = userService.delete(id)
      setCurrentUser((pS) => pS.filter((c) => c._id !== id))
      return data
    } catch (error) {
      const {message} = error.response.data
      setError(message)
    }
  }

  const signUp = async (content) => {
    try {
      const data = await authService.signUp(content)
      localStorageService.setTokens(data)
      getUser()
    } catch (error) {
      const {message, code} = error.response.data.error
      setError(message)
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {email: 'Email already exists'}
          throw errorObject
        }
      }
      throw new Error(error)
    }
  }

  const logIn = async (content) => {
    try {
      const data = await authService.logIn(content)
      localStorageService.setTokens(data)
      getUser()
    } catch (error) {
      const {message, code} = error.response.data.error
      if (code === 400) {
        if (message === 'INVALID_PASSWORD' || message === 'EMAIL_NOT_FOUND') {
          const errorObject = {email: 'Email or password is invalid'}
          throw errorObject
        }
      }
      throw new Error(error)
    }
  }

  const logOut = () => {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    navigate('/login')
  }

  return (
    <UserContext.Provider value={{currentUser, signUp, logIn, logOut}}>
      {!isLoading ? children : <h1>Loading...</h1>}
    </UserContext.Provider>
  )
}

export default UserProvider
