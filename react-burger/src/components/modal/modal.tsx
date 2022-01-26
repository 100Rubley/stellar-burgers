import React, { FC, useEffect } from 'react'
import s from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface IModalProps {
  handleCloseButtonClick: () => void
  handleKeyPress: (e: KeyboardEvent) => void
  headerTitle: string | null
}

const Modal: FC<IModalProps> = ({ children, headerTitle, handleCloseButtonClick, handleKeyPress }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  return createPortal(
    <ModalOverlay handleOverlayClick={handleCloseButtonClick}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <p className="text text_type_main-large">
            {headerTitle ? headerTitle : null}
          </p>
          <button className={s.button} onClick={handleCloseButtonClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal') as HTMLElement
  )
}

export default Modal
