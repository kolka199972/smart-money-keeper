import axios from 'axios'
import {toast} from 'react-toastify'
import configFile from '../config.json'
import authService from './auth.service'
import localStorageService from './localStorage.service'

const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  async (config) => {
    const expiresDate = localStorageService.getExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()
    if (isExpired) {
      const data = await authService.token(refreshToken)
      localStorageService.setTokens(data)
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedError) {
      toast.error('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  delete: http.delete,
  patch: http.patch
}

export default httpService
