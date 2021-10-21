import React from 'react'
import s from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = ({ children, headerTitle, handleCloseButtonClick, handleKeyPress }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  })

  return ReactDOM.createPortal(
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
    document.getElementById('modal')
  )
}

export default Modal
