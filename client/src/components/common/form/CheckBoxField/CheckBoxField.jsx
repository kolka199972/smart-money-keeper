import React from 'react'
import s from './CheckBoxField.module.css'

const CheckBoxField = ({name, value, error, label, onChange}) => {
  const handleChange = () => {
    onChange({target: {value: !value, name}})
  }
  return (
    <div className={s.textField}>
      <input
        className={s.input}
        type='checkbox'
        id={name}
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <label className={s.radioLabel} htmlFor={name}>
        {label}
      </label>

      <span className={s.spanError}>{error}</span>
    </div>
  )
}

export default CheckBoxField
