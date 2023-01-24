import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {getIsLoggedIn, logout} from '../../../store/user'

const LogOutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout())
    navigate('/login')
  }, [])

  return <h1>Loading...</h1>
}

export default LogOutPage
