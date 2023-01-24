import React, {useState} from 'react'
import s from './TextField.module.css'

const TextField = ({label, type, name, value, error, onChange, ...rest}) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((pS) => !pS)
  }
  return (
    <div className={s.textField}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <input
        className={`${s.input} ${error ? s.error : ''}`}
        type={showPassword ? 'text' : type}
        min='0'
        step='0.01'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {type === 'password' && (
        <span
          onClick={toggleShowPassword}
          className={'material-symbols-outlined' + ' ' + s.materialIcon}
        >
          {`visibility${showPassword ? '_off' : ''}`}
        </span>
      )}
      <span className={s.spanError}>{error}</span>
    </div>
  )
}

export default TextField
