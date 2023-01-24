import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate, useLocation} from 'react-router-dom'
import localStorageService from '../../../services/localStorage.service'
import {
  getCategoryLoadingStatus,
  loadCategoryList
} from '../../../store/category'
import {getCountLoadingStatus, loadCounts} from '../../../store/count'
import {
  getOperationLoadingStatus,
  loadOperations
} from '../../../store/operation'
import {
  getAuthError,
  getIsLoggedIn,
  getUserLoadingStatus,
  loadUser
} from '../../../store/user'

const DataLoader = ({children}) => {
  const userLoadingStatus = useSelector(getUserLoadingStatus())
  const categoryLoadingStatus = useSelector(getCategoryLoadingStatus())
  const countLoadingStatus = useSelector(getCountLoadingStatus())
  const operationLoadingStatus = useSelector(getOperationLoadingStatus())
  const isLoggedIn = useSelector(getIsLoggedIn())
  const userError = useSelector(getAuthError())
  const dispatch = useDispatch()
  const {pathname} = useLocation()

  useEffect(() => {
    if (userLoadingStatus && localStorageService.getAccessToken()) {
      dispatch(loadUser())
      dispatch(loadCategoryList())
      dispatch(loadOperations())
      dispatch(loadCounts())
    }
  }, [isLoggedIn])

  if (!userLoadingStatus && userError && localStorageService.getAccessToken()) {
    return <Navigate to='/logout' />
  }

  if (pathname === '/login') return children

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  if (
    userLoadingStatus ||
    categoryLoadingStatus ||
    countLoadingStatus ||
    operationLoadingStatus
  ) {
    return <h1>Loading...</h1>
  }

  return children
}

export default DataLoader
