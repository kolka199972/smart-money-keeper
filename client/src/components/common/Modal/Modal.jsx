import React from 'react'
import s from './Modal.module.css'

const Modal = ({title, children, activeModal, onToggleModal}) => {
  return (
    <div className={`${s.modal} ${activeModal ? s.active : ''}`}>
      <div className={s.modalDialog}>
        <div className={s.modalContent}>
          <div className={s.modalHeader}>
            <h3 className={s.modalTitle}>{title}</h3>
            <button className={s.close} onClick={onToggleModal}>
              ×
            </button>
          </div>
          <div className={s.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
