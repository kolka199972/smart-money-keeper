import React from 'react'
import s from './AddOperationButton.module.css'

const AddOperationButton = ({onToggleModal, type}) => {
  return (
    <div
      onClick={onToggleModal}
      className={`${s.wrap} ${type === 'expense' ? '' : s.income}`}
    >
      <div>+</div>
    </div>
  )
}

export default AddOperationButton
