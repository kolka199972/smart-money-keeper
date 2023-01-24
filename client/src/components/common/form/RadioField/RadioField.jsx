import React from 'react'
import s from './RadioField.module.css'

const RadioField = ({options, label, name, value, error, onChange}) => {
  return (
    <div className={s.textField}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      {options.map((opt) => (
        <div key={opt.name + '_' + opt.value}>
          <input
            className={s.input}
            type='radio'
            id={opt.name + '_' + opt.value}
            name={name}
            value={opt.value}
            onChange={onChange}
            checked={opt.value === value}
          />
          <label className={s.radioLabel} htmlFor={opt.name + '_' + opt.value}>
            {opt.name}
          </label>
        </div>
      ))}
      <span className={s.spanError}>{error}</span>
    </div>
  )
}

export default RadioField
