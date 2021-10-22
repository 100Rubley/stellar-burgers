import React from 'react';
import s from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, handleOverlayClick }) => {

  return (
    <div className={s.overlay} onClick={e => (e.currentTarget === e.target) && handleOverlayClick()}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleOverlayClick: PropTypes.func
}

export default ModalOverlay
