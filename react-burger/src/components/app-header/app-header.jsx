import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import s from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <div className={`${s.container} m-5`}>
            <div className="mr-2">
              <BurgerIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
              Конструктор
          </p>
          </div>

          <div className={`${s.container} m-5`}>
            <div className="mr-2">
              <ListIcon type="secondary" />
            </div>
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
          </p>
          </div>
        </nav>

        <div className={s.logoWrapper}>
          <Logo />
        </div>

        <menu>
          <div className={`${s.container} m-5`}>
            <div className="mr-2">
              <ProfileIcon type="secondary" />
            </div>
            <p className="text text_type_main-default text_color_inactive">
              Личный кабинет
          </p>
          </div>
        </menu>
      </div>
    </header>
  )
}

export default AppHeader
