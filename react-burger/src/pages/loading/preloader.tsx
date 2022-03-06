import React from 'react'
import s from './preloader.module.css'

const Preloader = () => {
  return (
    <div className={`text text_type_main-large ${s.main}`}>
      ... Загрузка ...
    </div>
  )
}

export default Preloader
