import React from 'react'
import {useNavigate} from 'react-router-dom'
import s from './CountCard.module.css'

const CountCard = ({_id, name, value}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`edit/${_id}`)
  }
  return (
    <div className={s.card}>
      <div className={s.title}>{name}</div>
      <div className={`${s.cardBody} ${value > 0 ? '' : s.negative}`}>
        BYN {value.toFixed(2)}
      </div>
      <button onClick={handleClick} className={s.buttonEdit}>
        <span className='material-symbols-outlined'>edit</span>
      </button>
    </div>
  )
}

export default CountCard
