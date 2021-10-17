import React from 'react';
import ReactDOM from 'react-dom';
import s from './modal-overlay.module.css'

const Overlay = ({children, toggleOverlay }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', toggleOverlay)
    return () => document.removeEventListener('keydown', toggleOverlay)
  })

  return ReactDOM.createPortal(
    <div className={s.overlay} onClick={toggleOverlay}>
      {children}
    </div>,
    document.getElementById('root')
  )
}

export default Overlay
