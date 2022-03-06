import React, { FC } from 'react'
import s from './error404.module.css'
import { NavLink } from 'react-router-dom'

const Error404: FC = () => {
  return (
    <div className={`${s.wrapper} text text_type_main-medium text_color_inactive`}>
      <span>
        (ಠ_ಠ) Что-то пошло не так! ¯\_(ツ)_/¯
      </span>

      <NavLink to='/' className={s.inactive}>
        На главную
      </NavLink>
    </div>
  )
}

export default Error404 
