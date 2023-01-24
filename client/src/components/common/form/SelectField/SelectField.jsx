import React from 'react'
import s from './SelectField.module.css'

const SelectField = ({
  label,
  name,
  options,
  defaultOption,
  value,
  error,
  onChange,
  onHandleCreateCategoryClick
}) => {
  return (
    <div className={s.textField}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        className={`${s.input} ${error ? s.error : ''}`}
        onChange={onChange}
      >
        <option disabled value=''>
          {defaultOption}
        </option>
        {options &&
          options.map((opt) => (
            <option key={opt._id} value={opt._id}>
              {opt.name}
            </option>
          ))}
      </select>
      <div className={s.spanWrap}>
        <span className={s.spanError}>{error}</span>
        {onHandleCreateCategoryClick && (
          <span className={s.spanCreate} onClick={onHandleCreateCategoryClick}>
            Create your own category
          </span>
        )}
      </div>
    </div>
  )
}

export default SelectField
