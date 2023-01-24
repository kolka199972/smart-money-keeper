import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import LoginForm from '../../LoginForm/LoginForm'
import RegisterForm from '../../RegisterForm/RegisterForm'
import s from './LoginPage.module.css'

const LoginPage = () => {
  const {type} = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((pS) => (pS === 'login' ? 'register' : 'login'))
  }
  return (
    <div className={s.card}>
      {formType === 'register' ? (
        <>
          <h1 className={s.title}>Sign Up</h1>
          <RegisterForm />
          <p className={s.toggleTitle}>
            Already have account?{' '}
            <a role='button' className={s.toggleItem} onClick={toggleFormType}>
              Log In
            </a>
          </p>
        </>
      ) : (
        <>
          <h1 className={s.title}>Log In</h1>
          <LoginForm />
          <p className={s.toggleTitle}>
            Don&apos;t have account?{' '}
            <a role='button' className={s.toggleItem} onClick={toggleFormType}>
              Sign Up
            </a>
          </p>
        </>
      )}
    </div>
  )
}

export default LoginPage
