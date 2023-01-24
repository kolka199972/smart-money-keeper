const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-key'
const EXPIRES_KEY = 'jwt-expires'
const USER_ID_KEY = 'user-id-key'

const setTokens = ({accessToken, refreshToken, expiresIn, userId}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000

  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
  localStorage.setItem(USER_ID_KEY, userId)
}

const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}

const getExpiresDate = () => {
  return localStorage.getItem(EXPIRES_KEY)
}

const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY)
}

const removeAuthData = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USER_ID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserId,
  removeAuthData
}

export default localStorageService
