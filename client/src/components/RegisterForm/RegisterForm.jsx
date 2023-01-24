import React, {useEffect, useState} from 'react'
import MyButton from '../MyButton/MyButton'
import TextField from '../common/form/TextField/TextField'
import {validator} from '../../utils/validator'
import CheckBoxField from '../common/form/CheckBoxField/CheckBoxField'
import {useDispatch, useSelector} from 'react-redux'
import {getAuthError, signUp} from '../../store/user'
import {useNavigate} from 'react-router-dom'
import s from './RegisterForm.module.css'

const RegisterForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    license: false
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authError = useSelector(getAuthError())

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Name shouldn't be empty"
      }
    },
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
      },
      isCapitalSymbol: {
        message: 'Password should contain capital symbol'
      },
      isContainDigit: {
        message: 'Password should contain number'
      },
      min: {
        message: 'Password length at least 8 characters',
        value: 8
      }
    },
    license: {
      isRequired: {
        message: 'You must agree with Privacy Policies'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return ''
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    dispatch(signUp(newData, navigate))
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Full Name'
        type='text'
        name='name'
        value={data.name}
        error={errors.name}
        onChange={handleChange}
      />
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

      <CheckBoxField
        label='I agree to the Terms of Service and Privacy Policies'
        value={data.license}
        name='license'
        error={errors.license}
        onChange={handleChange}
      />
      {authError && <span className={s.spanError}>{authError}</span>}

      <MyButton type='submit' disabled={!isValid}>
        SIGN UP
      </MyButton>
    </form>
  )
}

export default RegisterForm
