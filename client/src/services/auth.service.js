import axios from 'axios'
import httpService from './http.service'

const authEndPoint = 'auth/'

const authService = {
  signUp: async (content) => {
    const {data} = await httpService.post(authEndPoint + 'signUp', content)
    return data
  },
  logIn: async (content) => {
    const {data} = await httpService.post(
      authEndPoint + 'signInWithPassword',
      content
    )
    return data
  },
  token: async (refreshToken) => {
    const {data} = await axios.post('http://localhost:8080/api/auth/token', {
      refreshToken
    })
    return data
  }
}

export default authService
