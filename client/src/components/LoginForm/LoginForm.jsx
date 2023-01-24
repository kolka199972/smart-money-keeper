import React, {useEffect, useState} from 'react'
import MyButton from '../MyButton/MyButton'
import TextField from '../common/form/TextField/TextField'
import {validator} from '../../utils/validator'
import {useDispatch, useSelector} from 'react-redux'
import {getAuthError, logIn} from '../../store/user'
import {useNavigate} from 'react-router-dom'
import s from './LoginForm.module.css'

const LoginForm = () => {
  const [data, setData] = useState({email: '', password: ''})
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authError = useSelector(getAuthError())

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email shouldn't be empty"
      },
      isEmail: {
        message: 'Email is incorrect'
      }
    },
    password: {
      isRequired: {
        message: "Password shouldn't be empty"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleChange = ({target}) => {
    setData((pS) => ({
      ...pS,
      [target.name]: target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validate()
    const isValid = validate()
    if (!isValid) return ''

    dispatch(logIn(data, navigate))
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='E-mail'
        type='email'
        name='email'
        value={data.email}
        error={errors.email}
        onChange={handleChange}
      />
      <TextField
        label='Password'
        type='password'
        name='password'
        value={data.password}
        error={errors.password}
        onChange={handleChange}
      />
      {authError && <span className={s.spanError}>{authError}</span>}
      <MyButton type='submit' disabled={!isValid}>
        LOG IN
      </MyButton>
    </form>
  )
}

export default LoginForm
