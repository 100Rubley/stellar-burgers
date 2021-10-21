import React from 'react';
import s from './modal-overlay.module.css'

const ModalOverlay = ({ children, handleOverlayClick }) => {

  return (
    <div className={s.overlay} onClick={e => (e.currentTarget === e.target) && handleOverlayClick()}>>
      {children}
    </div>
  )
}

export default ModalOverlay
