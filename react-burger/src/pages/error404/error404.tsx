import React, { FC } from 'react'
import s from './error404.module.css'

const Error404: FC = () => {
  return (
    <div className={`${s.wrapper} text text_type_main-medium text_color_inactive`}>
      (ಠ_ಠ) Что-то пошло не так! ¯\_(ツ)_/¯
    </div>
  )
}

export default Error404 
