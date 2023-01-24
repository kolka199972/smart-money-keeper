import React from 'react'
import s from './MyButton.module.css'

const MyButton = ({children, ...rest}) => {
  return (
    <div className={s.wrap}>
      <button {...rest} className={s.button}>
        {children}
      </button>
    </div>
  )
}

export default MyButton
