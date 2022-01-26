import React, { FC } from 'react';
import s from './modal-overlay.module.css'

interface IModalOverlayProps {
  handleOverlayClick: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children, handleOverlayClick }) => {

  return (
    <div className={s.overlay} onClick={e => (e.currentTarget === e.target) && handleOverlayClick()}>
      {children}
    </div>
  )
}

export default ModalOverlay
