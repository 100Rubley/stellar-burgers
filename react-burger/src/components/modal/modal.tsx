import React, { FC, useEffect } from 'react'
import s from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { hideIngredientsModal, removeCurrentIngredient } from '../../services/actions/ingredients-actions';
import { hideOrderModal } from '../../services/actions/constructor-actions';
import { useHistory } from 'react-router-dom';

interface IModalProps {
  headerTitle?: string | null
}

const Modal: FC<IModalProps> = ({ children, headerTitle }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    document.addEventListener('keydown', closeOnESC)
    return () => document.removeEventListener('keydown', closeOnESC)
  })

  const closeOnESC: (e: KeyboardEvent) => void = e => {
    if (e.key === 'Escape') {
      onModalClose()
    }
  }

  const onModalClose = () => {
    dispatch(hideOrderModal())
    dispatch(hideIngredientsModal())
    dispatch(removeCurrentIngredient())

    history.replace({ pathname: '/' })
  }

  return createPortal(
    <ModalOverlay handleOverlayClick={onModalClose}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <p className="text text_type_main-large">
            {headerTitle ? headerTitle : null}
          </p>
          <button className={s.button} onClick={onModalClose}>
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
